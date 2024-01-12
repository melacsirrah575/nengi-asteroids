import nengi from 'nengi';

class SpeedUpCommand {
    constructor(speedUp) {
        this.speedUp = speedUp
    }
}

SpeedUpCommand.protocol = {
    speedUp: nengi.Boolean,
};

export default SpeedUpCommand;