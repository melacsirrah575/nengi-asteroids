import nengi from "nengi";

class Projectile {
    constructor(x, y, rotation) {
        this.x = x
        this.y = y
        this.rotation = rotation
        this.speed = 100
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

        this.lifetime = 3
    }
}

Projectile.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    speed: {type: nengi.Number, interp: false },
    width: { type: nengi.Number, interp: false },
    height: { type: nengi.Number, interp: false },
    lifetime: {type: nengi.Number, interp: false}
}

export default Projectile