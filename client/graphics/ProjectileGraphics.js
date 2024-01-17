import { Container, Graphics } from 'pixi.js'

class ProjectileGraphics extends Container {
    constructor() {
        super()

        const circle = new Graphics()
        circle.beginFill(0xffffff)
        circle.drawCircle(0, 0, 25)
        circle.endFill()
        this.addChild(circle)
    }
}

export default ProjectileGraphics