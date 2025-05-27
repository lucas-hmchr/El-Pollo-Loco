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

// function resizeCanvas() {
//     const canvas = document.getElementById('canvas');
//     const ratio = 720 / 480;

//     let width = window.innerWidth;
//     let height = window.innerHeight;

//     if (width / height > ratio) {
//         width = height * ratio;
//     } else {
//         height = width / ratio;
//     }

//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     canvas.width = 720;
//     canvas.height = 480;
// }

// function checkOrientation() {
//     const overlay = document.getElementById('rotationOverlay');
//     if (window.innerWidth < window.innerHeight) {
//         overlay.style.display = 'flex';
//     } else {
//         overlay.style.display = 'none';
//     }
// }

// window.addEventListener('resize', () => {
//     resizeCanvas();
//     checkOrientation();
// });

// window.addEventListener('orientationchange', checkOrientation);

// window.addEventListener('load', () => {
//     resizeCanvas();
//     checkOrientation();
// });


