const body = document.querySelector('body')
const screen = document.getElementById('screen')
const startScreen = document.getElementById('startScreen');
const endScreen = document.getElementById('endScreen');
let controlBtns = document.getElementById('controlButtons');

// const muteBtn = document.getElementById('muteBtn');
// const muteBtnIcon = document.getElementById('muteBtnIcon');
// const instructionsBtn = document.getElementById('instructionsBtn');

/**
 * Initializes the page.
 * - StartScreen template gets added into the startScreen Container.
 */
function init() {
    startScreen.innerHTML = startScreenMenuTemplate();
    setMuteIcon();
};

/**
 * Starts the actual game.
 * - StartScreen gets undisplayed and the init function for the game gets called.
 */
function startGame() {
    startScreen.classList.add('d-none');
    initGame();
};

/**
 * Displays the instructions inside the startScreen container.
 */
function openInstructions() {
    startScreen.innerHTML = instructionsTemplate();
};

/**
 * Displays the policys inside the startScreen container.
 */
function openPolicy() {
    startScreen.innerHTML = policyTemplate();
};


