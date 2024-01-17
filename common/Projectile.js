import nengi from "nengi";

class Projectile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.rotation = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 10
        this.height = 10
        this.collider = {
            type: 'rectangle',
            width: this.width,
            height: this.height
        };
    }
}

Projectile.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    width: { type: nengi.Number, interp: false },
    height: { type: nengi.Number, interp: false }
}

export default Projectile