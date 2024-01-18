import nengi from "nengi";

class Projectile {
    constructor(x, y, rotation, ownerID) {
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

        this.lifetimeInSeconds = 3
        this.ownerID = ownerID
    }
}

Projectile.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    width: { type: nengi.Number, interp: false },
    height: { type: nengi.Number, interp: false },
    //OwnerID could be used for things like changing color of bullets depending on if the bullet is safe
    //For the specific client or not. Could also be used for a Hellish Rebuke mechanic
    ownerID: {type: nengi.Number, interp: false }
}

export default Projectile