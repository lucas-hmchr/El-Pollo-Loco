function changeIcon(element, path) {
    element.src = path;
}

function loudGame() {
    gameIsMute = false;
    localStorage.setItem(MUTE_KEY, JSON.stringify(gameIsMute));
    setMuteIcon()
}

function muteGame() {
    gameIsMute = true;
    localStorage.setItem(MUTE_KEY, JSON.stringify(gameIsMute));
    setMuteIcon()
}

function setMuteIcon() {
    const muteBtnIcon = document.getElementById('muteBtnIcon');
    gameIsMute ? changeIcon(muteBtnIcon, '../assets/icons/mute.svg') :  changeIcon(muteBtnIcon, '../assets/icons/sound.svg');
}

function playSound(sound) {
    if(!gameIsMute)sound.play();
}

function stopSound(sound) {
    sound.pause();
}