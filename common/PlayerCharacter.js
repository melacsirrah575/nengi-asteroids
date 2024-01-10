import nengi from 'nengi'

class PlayerCharacter {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.rotation = 0;
        //Height and Width are still acting really weird and idk why...
        //BUT! The numbers I have here in addition to scale adjustment in Player.js
        //(I know, I know, you said to keep that scale 1x1)
        //Seems to be giving me good sized ships with accurate colliders
        this.width = 50;
        this.height = 50;
        this.cwidth = 30;
        this.cheight = 30;
        this.collider = {
            type: 'rectangle',
            width: this.cwidth,
            height: this.cheight
        };
        this.speedMultiplier = 1;
    }
}

PlayerCharacter.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    cwidth: { type: nengi.Number, interp: false },
    cheight: { type: nengi.Number, interp: false },
    speedMultiplier: { type: nengi.Number, interp: false }
};

export default PlayerCharacter;