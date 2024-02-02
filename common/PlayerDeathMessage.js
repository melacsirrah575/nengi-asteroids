import nengi from 'nengi';

class PlayerDeathMessage {
    constructor(playerId) {
        this.playerId = playerId;
        this.text = 'You Died';
    }
}

PlayerDeathMessage.protocol = {
    playerId: { type: nengi.UInt16 },
    text: { type: nengi.String }
};

export default PlayerDeathMessage;