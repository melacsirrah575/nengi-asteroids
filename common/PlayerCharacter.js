import nengi from 'nengi'

class PlayerCharacter {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.rotation = 0;
        this.width = 100;
        this.height = 100;
        this.collider = {
            type: 'rectangle',
            width: this.width,
            height: this.height
        };
    }
}

PlayerCharacter.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    width: { type: nengi.Number, interp: false },
    height: { type: nengi.Number, interp: false }
};

export default PlayerCharacter;