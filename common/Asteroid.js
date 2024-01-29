import nengi from 'nengi'

class Asteroid {
    constructor(scale = 1) {
        this.x = 150
        this.y = 150
        //this.scale = scale
        this.rotation = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30 * scale
        this.height = 30 * scale
        this.collider = {
            type: 'rectangle',
            width: this.width,
            height: this.height
        };
        this.isSmallAsteroid = false;
    }
}

Asteroid.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    width: { type: nengi.Number, interp: false },
    height: { type: nengi.Number, interp: false },
}

export default Asteroid
