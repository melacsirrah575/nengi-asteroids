import nengi from 'nengi'
import NetLog from './NetLog.js'
import PlayerCharacter from './PlayerCharacter.js'
import Asteroid from './Asteroid.js'
import PlayerInput from './PlayerInput.js'
import Identity from './Identity.js'
import SpeedUpCommand from './SpeedUpCommand.js'
import Projectile from './Projectile.js'
import PlayerDeathMessage from './PlayerDeathMessage.js'
import LeaderboardUpdate from './LeaderboardUpdate.js'

const config = {
    UPDATE_RATE: 20, 

    ID_BINARY_TYPE: nengi.UInt16,
    TYPE_BINARY_TYPE: nengi.UInt8, 

    ID_PROPERTY_NAME: 'nid',
    TYPE_PROPERTY_NAME: 'ntype', 

    USE_HISTORIAN: true,
    HISTORIAN_TICKS: 40,

    protocols: {
        entities: [
            ['PlayerCharacter', PlayerCharacter],
            ['Asteroid', Asteroid],
            ['Projectile', Projectile]
        ],
        localMessages: [],
        messages: [
            ['NetLog', NetLog],
            ['Identity', Identity],
            ['PlayerDeathMessage', PlayerDeathMessage],
            ['LeaderboardUpdate', LeaderboardUpdate]
        ],
        commands: [
            ['PlayerInput', PlayerInput],
            ['SpeedUpCommand', SpeedUpCommand]
        ],
        basics: []
    }
}

export default config
