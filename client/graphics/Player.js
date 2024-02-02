import { Container, Sprite, Text } from 'pixi.js'

class Player extends Container {
    constructor(username = "") {
        super()

        const sprite = Sprite.from('/images/ship.png')
        sprite.scale.set(3, 3)
        sprite.anchor.set(0.5, 0.5)
        sprite.rotation = 0.5 * Math.PI
        this.addChild(sprite)

        const usernameText = new Text(username, { fill: 'white', fontSize: 14 })
        console.log("Username: ", username)
        usernameText.anchor.set(0.5, 2.2)
        this.addChild(usernameText)
    }
}

export default Player
