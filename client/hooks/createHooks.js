import playerHooks from './playerHooks.js'
import asteroidHooks from './asteroidHooks.js'
import projectileHooks from './projectileHooks.js'

export default (state) => {
    return {
        'PlayerCharacter': playerHooks(state),
        'Asteroid': asteroidHooks(state),
        'Projectile': projectileHooks(state)
    }
}
