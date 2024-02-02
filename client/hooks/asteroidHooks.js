// asteroidHooks.js
import AsteroidGraphics from '../graphics/AsteroidGraphics.js'
import renderer from '../graphics/renderer.js'

export default (state) => {
    return {
        create({ data, entity }) {
            const graphics = new AsteroidGraphics(1);
            renderer.middleground.addChild(graphics);
            return graphics;
        },
        delete({ nid, graphics }) {
            renderer.middleground.removeChild(graphics);
        },
        watch: {
            // You can handle scale changes here if needed
        }
    }
}