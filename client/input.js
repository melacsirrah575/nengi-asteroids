// the current state of the keys and mouse
const currentState = {
    up: false,
    down: false,
    left: false,
    right: false,
    mouseX: 0,
    mouseY: 0,
    mouseDown: false,
    speedUp: false
}

// keys that count as pressed for this frame
const frameState = {
    up: false,
    down: false,
    left: false,
    right: false,
    mouseDown: false,
    speedUp: false
}

// call this once per frame so that the above ^ is accurate
const releaseKeys = () => {
    frameState.up = currentState.up
    frameState.left = currentState.left
    frameState.down = currentState.down
    frameState.right = currentState.right
    frameState.mouseDown = currentState.mouseDown
    frameState.speedUp = currentState.speedUp
}

document.addEventListener('contextmenu', event =>
    // prevents right click from showing the context menu
    event.preventDefault()
)

document.addEventListener('keydown', event => {
    //console.log('keydown', event)
    // w or up arrow
    if (event.keyCode === 87 || event.keyCode === 38) {
        currentState.up = true
        frameState.up = true
    }
    // a or left arrow
    if (event.keyCode === 65 || event.keyCode === 37) {
        currentState.left = true
        frameState.left = true
    }
    // s or down arrow
    if (event.keyCode === 83 || event.keyCode === 40) {
        currentState.down = true
        frameState.down = true
    }
    // d or right arrow
    if (event.keyCode === 68 || event.keyCode === 39) {
        currentState.right = true
        frameState.right = true
    }

    // Q key
    if (event.keyCode === 81) {
        // Set a flag in frameState indicating that the 'Q' key is pressed
        currentState.speedUp = true
        frameState.speedUp = true;
        console.log("Q was pressed");
    }
})

document.addEventListener('keyup', event => {
    // console.log('keyup', event)
    if (event.keyCode === 87 || event.keyCode === 38) {
        currentState.up = false
    }
    if (event.keyCode === 65 || event.keyCode === 37) {
        currentState.left = false
    }
    if (event.keyCode === 83 || event.keyCode === 40) {
        currentState.down = false
    }
    if (event.keyCode === 68 || event.keyCode === 39) {
        currentState.right = false
    }

    // Q key
    if (event.keyCode === 81) {
        // Set a flag in frameState indicating that the 'Q' key is pressed
        currentState.speedUp = false
        frameState.speedUp = false;
        console.log("Q was released");
    }
})

document.addEventListener('mousemove', event => {
    currentState.mouseX = event.clientX
    currentState.mouseY = event.clientY
})

document.addEventListener('pointerdown', event => {
    currentState.mouseDown = true
    frameState.mouseDown = true
})

document.addEventListener('mouseup', event => {
    currentState.mouseDown = false
})

export {
    currentState,
    frameState,
    releaseKeys
}
