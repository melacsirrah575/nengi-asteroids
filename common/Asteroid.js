import nengi from 'nengi'

class Asteroid {
    constructor() {
        this.x = 150
        this.y = 150
        this.rotation = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
        this.collider = {
            type: 'rectangle',
            width: this.width,
            height: this.height
        };
    }
}

Asteroid.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    width: { type: nengi.Number, interp: false },
    height: { type: nengi.Number, interp: false }
}

export default Asteroid
