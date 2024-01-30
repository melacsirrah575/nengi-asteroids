import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import clientHookAPI from './clientHookAPI.js'
import createHooks from './hooks/createHooks.js'
import renderer from './graphics/renderer.js'
import { frameState, releaseKeys, currentState } from './input.js'
import PlayerInput from '../common/PlayerInput.js'
import SpeedUpCommand from '../common/SpeedUpCommand.js'

const client = new nengi.Client(nengiConfig, 100)

const state = {
    /* clientside state can go here */
    myId: null,
    myEntity: null,
    leaderboard: []
}

/* create hooks for any entity create, delete, and watch properties */
clientHookAPI(client, createHooks(state))

client.on('connected', res => { console.log('connection?:', res) })
client.on('disconnected', () => { console.log('connection closed') })

/* on('message::AnyMessage', msg => { }) */
client.on('message::NetLog', message => {
    console.log(`NetLog: ${ message.text }`)
})

client.on('message::Identity', message => {
    state.myId = message.entityId
})

client.on('message::LeaderboardUpdate', message => {
    console.log("Received leaderboardMessage!")
    state.leaderboard = message.data;
    updateLeaderboardUI();
});

client.connect('ws://localhost:8079')

const updateLeaderboardUI = () => {
    console.log("state.leaderboard: ", state.leaderboard)
    const leaderboardElement = document.getElementById('leaderboard');

    leaderboardElement.innerHTML = '';

    state.leaderboard.forEach((entry, index) => {
        const playerEntry = document.createElement('div');
        playerEntry.textContent = `#${index + 1}: Player ${entry.clientID} - Score: ${entry.score}`;
        leaderboardElement.appendChild(playerEntry);
    });
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
