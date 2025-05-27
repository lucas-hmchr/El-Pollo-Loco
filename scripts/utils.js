/**
 * Change the source of an img element to the given path.
 * @param {Element} element - Element with src attribute.
 * @param {String} path - Path of the new image.
 */
function changeIcon(element, path) {
    element.src = path;
}

/**
 * Turn up the sounds of the game by setting the variables and change the icon of the button element.
 */
function loudGame() {
    gameIsMute = false;
    localStorage.setItem(MUTE_KEY, JSON.stringify(gameIsMute));
    setMuteIcon()
}

/**
 * Mute of the game by setting the variables and change the icon of the button element.
 */
function muteGame() {
    gameIsMute = true;
    localStorage.setItem(MUTE_KEY, JSON.stringify(gameIsMute));
    setMuteIcon()
}

/**
 * Set the icon of the mute button element based on the gameIsMute variable.
 */
function setMuteIcon() {
    const muteBtnIcon = document.getElementById('muteBtnIcon');
    gameIsMute ? changeIcon(muteBtnIcon, '../assets/icons/mute.svg') :  changeIcon(muteBtnIcon, '../assets/icons/sound.svg');
}

/**
 * Play a sound.
 * @param {HTMLAudioElement} sound - Sound thats beeing played.
 */
function playSound(sound) {
    if(!gameIsMute)sound.play();
}

/**
 * 
 * @param {HTMLAudioElement} sound - Sound thats beeing paused. 
 */
function stopSound(sound) {
    sound.pause();
}