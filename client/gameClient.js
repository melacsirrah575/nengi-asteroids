import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import clientHookAPI from './clientHookAPI.js'
import createHooks from './hooks/createHooks.js'
import renderer from './graphics/renderer.js'
import { frameState, releaseKeys, currentState } from './input.js'
import PlayerInput from '../common/PlayerInput.js'
import SpeedUpCommand from '../common/SpeedUpCommand.js'
import PlayerDeathMessage from '../common/PlayerDeathMessage.js'

const client = new nengi.Client(nengiConfig, 100)

const state = {
    /* clientside state can go here */
    myId: null,
    myEntity: null,
    leaderboard: new Map()
}

/* create hooks for any entity create, delete, and watch properties */
clientHookAPI(client, createHooks(state))

client.on('connected', res => { console.log('connection?:', res) })
client.on('disconnected', () => { console.log('connection closed') })

/* on('message::AnyMessage', msg => { }) */
client.on('message::NetLog', message => {
})

client.on('message::Identity', message => {
    state.myId = message.entityId
})

client.on('message::PlayerDeathMessage', message => {
    console.log("Death Message recieved!")
    const deathMessageElement = document.getElementById('death-message');
    deathMessageElement.innerText = message.text;

    const deathMessageContainer = document.getElementById('death-message-container');
    deathMessageContainer.style.display = 'block';
});

client.on('message::LeaderboardUpdate', message => {
    if (state.leaderboard.has(message.clientID)) {
        state.leaderboard.set(message.clientID, { score: message.score });
    } else {
        state.leaderboard.set(message.clientID, { score: message.score });
    }

    console.log("Leaderboard: ", state.leaderboard);

    updateLeaderboardUI();
});

client.connect('ws://localhost:8079')

const updateLeaderboardUI = () => {
    console.log("state.leaderboard: ", state.leaderboard);
    const leaderboardElement = document.getElementById('leaderboard');

    leaderboardElement.innerHTML = '';

    // Convert Map entries to an array and sort it based on the score in descending order
    const sortedEntries = [...state.leaderboard.entries()].sort((a, b) => b[1].score - a[1].score);

    let index = 1;
    for (const [clientID, entry] of sortedEntries) {
        const playerEntry = document.createElement('div');
        playerEntry.textContent = `#${index}: Player ${clientID} - Score: ${entry.score}`;
        leaderboardElement.appendChild(playerEntry);
        index++;
    }
};


const update = (delta, tick, now) => {
    client.readNetworkAndEmit()

    /* clientside logic can go here */
    if (state.myEntity) {
        const { up, down, left, right, speedUp, fire } = frameState
        const { mouseX, mouseY } = currentState
        const worldCoords = renderer.toWorldCoordinates(mouseX, mouseY)
        const dx = worldCoords.x - state.myEntity.x
        const dy = worldCoords.y - state.myEntity.y
        const rotation = Math.atan2(dy, dx)
        client.addCommand(new PlayerInput(up, down, left, right, rotation, delta, fire))

        if (speedUp) {
            client.addCommand(new SpeedUpCommand())
        }

        renderer.centerCamera(state.myEntity)
    }

    renderer.update(delta)
    client.update()
    releaseKeys()
}

export {
    update,
    state
}
