import nengi from 'nengi';

class LeaderboardUpdate {
    constructor(clientID, score) {
        this.clientID = clientID;
        this.score = score;
    }
}

LeaderboardUpdate.protocol = {
    clientID: nengi.UInt16, 
    score: nengi.UInt16 
};

export default LeaderboardUpdate;