import nengi from 'nengi';

class LeaderboardUpdate {
    constructor(data) {
        this.data = data;
    }
}

LeaderboardUpdate.protocol = {
    data: { 
        playerId: nengi.UInt16, 
        score: nengi.UInt16 
    }
};

export default LeaderboardUpdate;