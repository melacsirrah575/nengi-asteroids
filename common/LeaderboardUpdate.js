import nengi from 'nengi';

class LeaderboardUpdate {
    constructor(clientUsername, score) {
        this.clientUsername = clientUsername;
        this.score = score;
    }
}

LeaderboardUpdate.protocol = {
    clientUsername: nengi.String, 
    score: nengi.UInt16 
};

export default LeaderboardUpdate;