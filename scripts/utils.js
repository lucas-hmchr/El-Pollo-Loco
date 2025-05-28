/**
 * Change the source of an img element to the given path.
 * @param {Element} element - Element with src attribute.
 * @param {String} path - Path of the new image.
 */
function changeIcon(element, path) {
    element.src = path;
}

/**
 * Turns up the sounds of the game by setting the variables and change the icon of the button element.
 * @param {Boolean} isIngame - True if function gets called from ingame.
 */
function loudGame(isIngame) {
    gameIsMute = false;
    if(isIngame) playSound(world.backgroundMusic)
    localStorage.setItem(MUTE_KEY, JSON.stringify(gameIsMute));
    setMuteIcon()
}

/**
 * Mute of the game by setting the variables and change the icon of the button element.
 * @param {Boolean} isIngame - True if function gets called from ingame.
 */
function muteGame(isIngame) {
    if(isIngame && !gameIsMute) stopAllSounds()
    gameIsMute = true;
    localStorage.setItem(MUTE_KEY, JSON.stringify(gameIsMute));
    setMuteIcon()
}

/**
 * Set the icon of the mute button element based on the gameIsMute variable.
 */
function setMuteIcon() {
    const muteBtnIcon = document.getElementById('muteBtnIcon');
    const muteBtnInGameIcon = document.getElementById('muteBtnInGameIcon');
    gameIsMute ? changeIcon(muteBtnIcon, '../assets/icons/mute.svg') :  changeIcon(muteBtnIcon, '../assets/icons/sound.svg');
    gameIsMute ? changeIcon(muteBtnInGameIcon, '../assets/icons/mute.svg') :  changeIcon(muteBtnInGameIcon, '../assets/icons/sound.svg');
}

/**
 * Plays a sound.
 * @param {HTMLAudioElement} sound - Sound thats beeing played.
 */
function playSound(sound) {
    if(!gameIsMute)sound.play();
}

/**
 * Pauses a sound.
 * @param {HTMLAudioElement} sound - Sound thats beeing paused. 
 */
function stopSound(sound) {
    sound.pause();
}

/**
 * Pushes given audios to a list with all audios.
 * Returns the audio to make it accessiable.
 * @param {Audio} audio - Audio beeing added to the list.
 * @returns {Audio} - Return audio to give access to it.
 */
function addSound(audio) {
    sounds.push(audio)
    return audio;
}

/**
 * Resets and pause all sounds inside the sounds list.
 */
function stopAllSounds(){
    sounds.forEach(sound => {
        sound.currentTime = 0;
        sound.pause()
    })
}