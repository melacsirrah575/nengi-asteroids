import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import instanceHookAPI from './instanceHookAPI.js'
import NetLog from '../common/NetLog.js'
import PlayerCharacter from '../common/PlayerCharacter.js'
import Identity from '../common/Identity.js'
import asteroidSystem from './asteroidSystem.js'
import SpeedUpCommand from '../common/SpeedUpCommand.js'
import Projectile from '../common/Projectile.js'

const checkCollision = (entityA, entityB) => {
    return (
        entityA.x < entityB.x + entityB.width &&
        entityA.x + entityA.width > entityB.x &&
        entityA.y < entityB.y + entityB.height &&
        entityA.y + entityA.height > entityB.y
    );
};

const instance = new nengi.Instance(nengiConfig, { port: 8079 })
instanceHookAPI(instance)

/* serverside state here */
const entities = new Map()
const projectiles = new Map()
asteroidSystem.populate(instance, 10)

instance.on('connect', ({ client, callback }) => {
    /* client init logic & state can go here */
    callback({ accepted: true, text: 'Welcome!' })
    instance.message(new NetLog('hello world'), client)
    const entity = new PlayerCharacter()
    instance.addEntity(entity)
    instance.message(new Identity(entity.nid), client)
    entities.set(entity.nid, entity)
    client.entity = entity
    client.view = {
        x: entity.x,
        y: entity.y,
        halfWidth: 500,
        halfHeight: 500
    }
})

instance.on('disconnect', client => {
    entities.delete(client.entity.nid)
    instance.removeEntity(client.entity)
})

/* on('command::AnyCommand', ({ command, client }) => { }) */
instance.on('command::PlayerInput', ({ command, client }) => {
    const { up, down, left, right, rotation, delta, fire } = command
    const { entity } = client
    const speed = 200 * client.entity.speedMultiplier
    if (up) {
        entity.y -= speed * delta
    }
    if (down) {
        entity.y += speed * delta
    }
    if (left) {
        entity.x -= speed * delta
    }
    if (right) {
        entity.x += speed * delta
    }

    if (fire) {
        const projectile = new Projectile(entity.x, entity.y,);
        instance.addEntity(projectile)
        projectiles.set(projectile.nid, projectile)
    }
    entity.rotation = rotation

     // Check for collisions with other players
    instance.clients.forEach(otherClient => {
        if (otherClient !== client) {
            const otherEntity = otherClient.entity;
            if (checkCollision(entity, otherEntity)) {
                console.log(`Collision between ${client.entity.nid} and ${otherClient.entity.nid}`);
                // Handle collision logic here
            } else {
                console.log("No collision")
            }
        }
    })
})

instance.on('command::SpeedUpCommand', ({ command, client }) => {
    if (client.entity.speedUpCooldownTimer <= 0) {
        const speedMultiplier = 2;
        client.entity.speedMultiplier = speedMultiplier;

        //Set Timers for decrementation
        client.entity.speedUpDurationTimer = client.entity.speedUpDuration;
        client.entity.speedUpCooldownTimer = client.entity.speedUpCooldown;
    }
});

const updateTimers = (delta) => {
    instance.clients.forEach(client => {
        if (client.entity.speedUpDurationTimer > 0) {
            client.entity.speedUpDurationTimer -= delta;
            //console.log("Duration: ", client.entity.speedUpDurationTimer)

            if (client.entity.speedUpDurationTimer <= 0) {
                client.entity.speedMultiplier = 1;
                client.entity.speedUpDurationTimer = 0 // in case we go below
            }
        }

        if (client.entity.speedUpCooldownTimer > 0 && client.entity.speedUpDurationTimer <= 0) {
            client.entity.speedUpCooldownTimer -= delta;
            //console.log("Cooldown: ", client.entity.speedUpCooldownTimer)

            if (client.entity.speedUpCooldownTimer <= 0) {
                client.entity.speedUpCooldownTimer = 0
            }
        }
    })
}

const update = (delta, tick, now) => {
    instance.emitCommands()
    /* serverside logic can go here */
    instance.clients.forEach(client => {
        client.view.x = client.entity.x
        client.view.y = client.entity.y
    })
    asteroidSystem.update(delta)
    updateTimers(delta)
    instance.update()
}

export {
    update
}
