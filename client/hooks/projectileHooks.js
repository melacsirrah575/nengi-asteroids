import ProjectileGraphics from '../graphics/ProjectileGraphics.js'
import renderer from '../graphics/renderer.js'

export default (state) => {
    return {
        create({ data, entity }) {
            const graphics = new ProjectileGraphics()
            renderer.middleground.addChild(graphics)
            return graphics
        },
        delete({ nid, graphics }) {
            renderer.middleground.removeChild(graphics)
        },
        watch: {
        }
    }
}
