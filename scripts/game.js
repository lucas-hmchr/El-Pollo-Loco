let canvas;
let world;
let keyboard = new Keyboard();
let firstRoundOver = false;
const MUTE_KEY = 'gameIsMute';
let gameIsMute = JSON.parse(localStorage.getItem(MUTE_KEY)) || false;
let screenIsFull = false;

/**
 * Initializes the canvas game.
 * - If the canvas element hasn't been set, it gets set. (is the case if the user restarts the game)
 * - Canvas gets displayed.
 * - World gets created to build the game.
 * - Show the buttons that control the player if necessary.
 */
function initGame() {
    if (!canvas) canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
    initControlButtons();
}

/**
 * 
 */
function initControlButtons() {
    showControlButtons();
    bindBtnsPressEvent();
}

/**
 * Add EventListeners for keyboard to start actions/controls.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 39) keyboard.RIGHT = true;
    if (e.keyCode === 37) keyboard.LEFT = true;
    if (e.keyCode === 38) keyboard.UP = true;
    if (e.keyCode === 40) keyboard.DOWN = true;
    if (e.keyCode === 32) keyboard.SPACE = true;
    if (e.keyCode === 68) keyboard.D = true;
});

/**
 * Add EventListeners for keyboard to end actions/controls.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode === 39) keyboard.RIGHT = false;
    if (e.keyCode === 37) keyboard.LEFT = false;
    if (e.keyCode === 38) keyboard.UP = false;
    if (e.keyCode === 40) keyboard.DOWN = false;
    if (e.keyCode === 32) keyboard.SPACE = false;
    if (e.keyCode === 68) keyboard.D = false;
});

/**
 * Bind actions to touch control buttons of the mobile screen.
 */
function bindBtnsPressEvent() {
    document.getElementById('walkLeftBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })
    document.getElementById('walkLeftBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })
    document.getElementById('walkRightBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })
    document.getElementById('walkRightBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })
    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })
    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })
    document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    })
    document.getElementById('throwBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    })
}

/**
 * Toggle the game sound based on a variable.
 */
function changeGameSound() {
    gameIsMute ? loudGame() : muteGame();
};

/**
 * Display the endScreen after finishing the game.
 * - Hide the control buttons and display the endScreen.
 * - Background image and template get set basend on the outcome of the game (param).
 * @param {Boolean} win 
 */
function displayWinScreen(win) {
    hideControlButtons();
    endScreen.classList.remove('d-none');
    endScreen.style.backgroundImage = win ? 'url("./assets/9_intro_outro_screens/game_over/game over.png")' : 'url("./assets/9_intro_outro_screens/game_over/oh no you lost!.png")';
    endScreen.innerHTML = win ? victoryTemplate() : loseTemplate();
}

/**
 * Restart the Game.
 * - Hide the endScreen.
 * - Start the game.
 */
function restartGame() {
    endScreen.classList.add('d-none');
    // if (world) world.stop();
    if (world) world.stopBackgroundMusic();
    startGame();
}

/**
 * Hide the control buttons.
 */
function hideControlButtons() {
    controlBtns.classList.add('d-none');
}

/**
 * Display the control buttons.
 */
function showControlButtons() {
    controlBtns.classList.remove('d-none');
}

/**
 * After a game go back to the main menu.
 * - Set if the first round has been played so the game gets restarted and not started.
 * - Display the startScreen.
 * - Hide the Canvas and the endScreen.
 * - Initialitze the mainMenu.
 */
function goBackToMainMenu() {
    firstRoundOver = true;
    startScreen.classList.remove('d-none');
    canvas.classList.add('d-none');
    endScreen.classList.add('d-none');
    world.stopBackgroundMusic();
    init();
}

/**
 * Decide wether the screen elements gets minimized or set to fullscreen.
 */
function toggleFullScreen() {
    let fullscreen = document.getElementById('screen')
    screenIsFull ? exitFullscreen() : enterFullScreen(fullscreen);
}

/**
 * Set the given element to fullscreen.
 * @param {HTMLElement} element
 */
function enterFullScreen(element) {
    const fullScreenBtnIcon = document.getElementById('fullScreenBtnIcon');
    screenIsFull = true;
    changeIcon(fullScreenBtnIcon, './assets/icons/minimize.svg')
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Minimize from fullscreen.
 */
function exitFullscreen() {
    const fullScreenBtnIcon = document.getElementById('fullScreenBtnIcon');
    screenIsFull = false;
    changeIcon(fullScreenBtnIcon, './assets/icons/fullscreen.svg')
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * React to minimizing fullscreen mode with 'esc' key.
 */
document.addEventListener('fullscreenchange', () => {
    const fullScreenBtnIcon = document.getElementById('fullScreenBtnIcon');
    const isFullscreenNow = !!document.fullscreenElement;

    screenIsFull = isFullscreenNow;

    if (isFullscreenNow) {
        changeIcon(fullScreenBtnIcon, './assets/icons/minimize.svg');
    } else {
        changeIcon(fullScreenBtnIcon, './assets/icons/fullscreen.svg');
    }
});