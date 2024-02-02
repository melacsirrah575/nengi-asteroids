import { Container, Sprite } from 'pixi.js'

class AsteroidGraphics extends Container {
    constructor(scale = 1) {
        super()

        const sprite = Sprite.from('/images/asteroid-small.png')
        sprite.scale.set(1 * scale, 1 * scale)
        sprite.anchor.set(0.5, 0.5)
        sprite.rotation = 0.5 * Math.PI
        this.addChild(sprite)
    }
}

export default AsteroidGraphics
