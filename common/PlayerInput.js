import nengi from 'nengi'

class PlayerInput {
    constructor(up, down, left, right, rotation, delta, fire) {
        this.up = up
        this.down = down
        this.left = left
        this.right = right
        this.rotation = rotation
        this.delta = delta,
        this.fire = fire
    }
}

PlayerInput.protocol = {
    up: nengi.Boolean,
    down: nengi.Boolean,
    left: nengi.Boolean,
    right: nengi.Boolean,
    rotation: nengi.Float32,
    delta: nengi.Number,
    fire: nengi.Boolean
}

export default PlayerInput
