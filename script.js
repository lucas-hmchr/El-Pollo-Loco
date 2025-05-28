const body = document.querySelector('body')
const screen = document.getElementById('screen')
const startScreen = document.getElementById('startScreen');
const endScreen = document.getElementById('endScreen');
const ingameMuteBtn = document.getElementById('muteBtnInGame');
let controlBtns = document.getElementById('controlButtons');

/**
 * Initializes the page.
 * - StartScreen template gets added into the startScreen Container.
 */
function init() {
    startScreen.innerHTML = startScreenMenuTemplate();
    screenIsFull ? changeIcon(fullScreenBtnIcon, './assets/icons/minimize.svg') : changeIcon(fullScreenBtnIcon, './assets/icons/fullscreen.svg');
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

/**
 * Disables the click event for the button on keydown "space".
 */
ingameMuteBtn.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.key === " " || event.keyCode === 32) {
      event.preventDefault();
    }
  });


