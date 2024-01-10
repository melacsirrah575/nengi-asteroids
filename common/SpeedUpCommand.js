import nengi from 'nengi';

class SpeedUpCommand {
    constructor(speedUp) {
        this.speedUp = speedUp
        this.duration = 3000; //3 Seconds
        this.cooldown = 5000; //5 Seconds
    }
}

SpeedUpCommand.protocol = {
    speedUp: nengi.Boolean,
    duration: nengi.Number,
    cooldown: nengi.Number
};

export default SpeedUpCommand;