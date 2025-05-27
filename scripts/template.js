function startScreenMenuTemplate() {
    return `
        <div class="menu-buttons" id="menuButtons">
            <button id="muteBtn" class="menu-button" onclick="changeGameSound()"><img id="muteBtnIcon" src="./assets/icons/sound.svg" alt=""></button>
            <button id="instructionsBtn" class="menu-button" onclick="openInstructions()"><img src="./assets/icons/controller.svg" alt=""></button>
            <button id="policyBtn" class="menu-button" onclick="openPolicy()"><img src="./assets/icons/policy.svg" alt=""></button>
            <button id="fullscreenBtn" class="menu-button" onclick="toggleFullScreen()"><img id="fullScreenBtnIcon" src="./assets/icons/fullscreen.svg" alt=""></button>
        </div>

        <button id="startButton" class="start-button" onclick="firstRoundOver ? restartGame() : startGame()">Start Game <img src="./assets/icons/sombrero.svg" alt=""></button>
    `
};

function instructionsTemplate() {
    return `
        <div class="instructions-container" id="instructionsContainer">
            <button class="close-btn" onclick="init()"><img src="./assets/icons/close.svg" alt=""></button>
            <p style="font-size: 16px; font-family:Segoe UI;">
                You are playing as the crazy mexican <b style="font-family: Segoe UI;">Pepe Peligroso</b>. On your way to fight the giant endboss you have to collect bottles, coins and kill or dodge all the chickens trying to finish you. Good look!
            </p>
            <p class="instructions">
                <span class="instruction"><img src="./assets/icons/arrow-left.svg" alt="" class="instructions-icon"> = move left</span>
                <span class="instruction"><img src="./assets/icons/arrow-right.svg" alt="" class="instructions-icon"> = move right</span>
                <span class="instruction"><img src="./assets/icons/space-key.svg" alt="" class="instructions-icon"> = jump</span>
                <span class="instruction">__D = throw bottles</span>

            </p>
        </div>
    `
};

function policyTemplate() {
    return `
        <div class="instructions-container" id="instructionsContainer" style="font-size: 16px;">
            <button class="close-btn" onclick="init()"><img src="./assets/icons/close.svg" alt=""></button>
            <div class="policy-text">
                <h2>Impressum</h2>
                <span>Lucas Hamacher</span>
                <span>Kreuzgasse 4</span>
                <span>53894 Mechernich</span>
                <span>lucashamcher01@gmail.com</span>

                <h2>Datenschutz</h2>
                <span>Beim verwnden der Seite werden keine Daten gespeichert.</span>
            </div>
        </div>
    `
};

function victoryTemplate() {
    return `
    <div class="end-screen-buttons">
        <button class="main-menu-btn" onclick="goBackToMainMenu()"><img src="./assets/icons/home.svg"></button>
        <button class="play-again-btn" onclick="restartGame()">PLAY AGAIN</button>
    </div>

    `
};

function loseTemplate() {
    return `
    <div class="end-screen-buttons">
        <button class="main-menu-btn" onclick="goBackToMainMenu()"><img src="./assets/icons/home.svg"></button>
        <button class="play-again-btn" onclick="restartGame()">PLAY AGAIN</button>
    </div>
    `
};


