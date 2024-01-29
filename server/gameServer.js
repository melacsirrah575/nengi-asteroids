import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import instanceHookAPI from './instanceHookAPI.js'
import NetLog from '../common/NetLog.js'
import PlayerCharacter from '../common/PlayerCharacter.js'
import Identity from '../common/Identity.js'
import asteroidSystem from './asteroidSystem.js'
import SpeedUpCommand from '../common/SpeedUpCommand.js'
import Projectile from '../common/Projectile.js'

const usernamePool = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];

function getRandomUsername() {
    const randomIndex = Math.floor(Math.random() * usernamePool.length);
    return usernamePool[randomIndex];
}

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

    entity.username = getRandomUsername()
    console.log("entity.username: ", entity.username)
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

    entity.rotation = rotation

    //console.log("Fire: ", fire, " ProjectileTimer: ", client.entity.projectileTimer)
    if (fire && client.entity.projectileTimer <= 0) {
        client.entity.projectileTimer = 0.5; //TODO: Circle back and make this not a magic number
        const projectile = new Projectile(entity.x, entity.y, entity.rotation, entity.nid, entity.speedMultiplier);
        instance.addEntity(projectile)
        projectiles.set(projectile.nid, projectile)
        client.projectile = projectile
        console.log("Projectile OwnerID: ", projectile.ownerID)
    }

    //Collision Checks
    instance.clients.forEach(otherClient => {
        if (otherClient !== client) {
            //Client - Client collision
            const otherEntity = otherClient.entity;
            if (checkCollision(entity, otherEntity)) {
                console.log(`Collision between ${client.entity.nid} and ${otherClient.entity.nid}`);
                // Handle collision logic here
            }
        }
    })

    projectiles.forEach(projectile => {
        if (projectile.ownerID !== client.entity.nid) {
            if (checkCollision(client.entity, projectile)) {
                console.log(`Collision between ${projectile.nid} and ${entity.nid}`);
                client.entity.health -= 1
                projectiles.delete(projectile.nid)
                instance.removeEntity(projectile)

                console.log(client.entity.nid, " HP = ", client.entity.health)

                if (client.entity.health <= 0) {
                    console.log("Player: ", client.entity.nid, " should be ded")
                    instance.message(new NetLog("You died"), client)
                }
            }
        }

        asteroidSystem.asteroids.forEach(asteroid => {
            if (checkCollision(projectile, asteroid)) {
                console.log(`Collision between ${projectile.nid} and ${asteroid.nid}`);
                //DESTROY ASTEROID AND GIVE PLAYER SCORE
            }
        })
    })

    asteroidSystem.asteroids.forEach(asteroid => {
        if (checkCollision(client.entity, asteroid)) {
            console.log(`Collision between ${client.entity.nid} and ${asteroid.nid}`);
            //DESTROY ASTEROID, REMOVE 1 LIFE FROM PLAYER, AND REDUCE SCORE
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

        if (client.entity.projectileTimer > 0) {
            client.entity.projectileTimer -= delta
        }
        if (client.entity.projectileTimer < 0) {
            client.entity.projectileTimer = 0
        }
    })
    
    //console.log("Projectiles size: ", projectiles.size)
    projectiles.forEach(projectile => {
        if (projectile.lifetimeInSeconds > 0) {
            projectile.lifetimeInSeconds -= delta
            //console.log("Projectile lifetimeInSeconds: ", projectile.lifetimeInSeconds)
        }

        const angle = projectile.rotation
        const deltaX = projectile.speed * Math.cos(angle) * delta
        const deltaY = projectile.speed * Math.sin(angle) * delta

        projectile.x += deltaX
        projectile.y += deltaY

        if (projectile.lifetimeInSeconds <= 0) {
            projectile.lifetimeInSeconds = 0;
            projectiles.delete(projectile.nid)
            instance.removeEntity(projectile)
            //console.log("Projectiles size: ", projectiles.size)
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
