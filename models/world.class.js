class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    endboss;
    gameRunning = true;
    animationFrameId;
    lastThrowTime = 0;
    throwCooldownTime = 800;

    backgroundMusic = addSound(new Audio('../assets/sounds/background-music.mp3'));
    chickenAttackSound = addSound(new Audio('../assets/sounds/chicken/chicken-attack.mp3'));

    /**
     * 
     * @param {HTMLElement} canvas - Canvas thats beeing used to draw the Game.
     * @param {Keyboard} keyboard - Keyboard beeing used by user.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.animationFrameId = null;


        this.setWorld();
        this.draw();
        this.run();
        this.startBackgroundMusic();
    }

    /**
     * Draw the necessary images on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects)
        this.addObjectsToMap(this.level.clouds)

        this.ctx.translate(-this.camera_x, 0)
        this.addObjectsToMap(this.level.statusBars)
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.enemies)
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.bottles)
        this.addObjectsToMap(this.level.coins)
        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0)

        let self = this;
        this.animationFrameId = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Loop trough the given array and draw each objective on the canvas.
     * @param {Array} objects - Array including parts of the level.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Draw the given object onto the canvas and flip the image if necessary.
     * @param {MovableObject} mo - Object that should be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
     * Set world variable in objects to make world accessible and call functions that do so.
     */
    setWorld() {
        this.character.world = this;
        this.setStatusBars();
        this.setEndboss();
    }

    /**
     * Define the endboss in world and set the world variable in endboss.
     * - The endboss gets animated in the end of the function and not inside the object to make sure world has been set and can be accessed.
     */
    setEndboss() {
        this.endboss = this.level.enemies[this.level.enemies.length - 1];
        this.endboss.world = this;
        this.endboss.animate();
    }

    /**
     * Set the world variable in each of the statusbars.
     */
    setStatusBars() {
        this.level.statusBars.forEach((bar) => {
            bar.world = this;
        })
    }

    /**
     * Flip the image of an object on the x-axis.
     * @param {MovableObject} mo - Object that will be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flip a flipped image back to its stored position
     * @param {MovableObject} mo - Object that will be restored. 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Call several functions that check states of the game.
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkState();
        }, 10)
    }

    /**
     * Checks if hte character is able to throw a bottle.
     * - Executes the throwObject function if its the case.
     */
    checkThrowObjects() {
        const now = Date.now();
        if (this.keyboard.D && this.character.availableBottles >= 1 && now - this.lastThrowTime >= this.throwCooldownTime) {
            this.lastThrowTime = now;
            this.throwObject();
        }
    }

    /**
     * Creates a new bottle and adjusts the amount of bottles left.
     * - Statusbar gets adjusted.
     * - Movementstop of the character gets reseted.
     */
    throwObject() {
        this.character.availableBottles -= 1;
        this.level.statusBars[2].setPercentage(this.level.statusBars[2].percentage -= 10);
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character);
        this.throwableObjects.push(bottle);
        this.character.resetMovementStop();
    }

    /**
     * Call functions to check collisions between objects.
     */
    checkCollisions() {
        this.checkCharacterCollision();
        this.checkBottleCollision();
        this.checkCharacterCollection(this.level.bottles);
        this.checkCharacterCollection(this.level.coins);
        this.checkCharacterJumpingCollision();
    }

    /**
     * Check if the character is colliding with an enemy on the ground.
     * - Adjust statusbar.
     * - Play a sound.
     */
    checkCharacterCollision() {
        let now = new Date().getTime()
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !(this.character.inPositionToJumpKill(enemy)) && (this.character.lastHit + 100 <= now)) {
                this.character.hurtCharacter();
                this.level.statusBars[0].setPercentage(this.character.life);
                this.playAttackSound(enemy)
            }
        });
    }

    /**
     * Check if the character collides with one of the enemies from on top (jump) and kill the enemy if thats the case.
     */
    checkCharacterJumpingCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.inPositionToJumpKill(enemy)) {
                enemy.kill()
            }
        });
    }

    /**
     * If a bottle hits an enemy deal damage or kill the enemy.
     */
    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.bottleHitsEnemy(enemy)) {
                if (enemy instanceof Chicken || enemy instanceof Chick) enemy.kill();
                if (enemy instanceof Endboss && !enemy.isHurt()) enemy.applyDamage(20), this.level.statusBars[3].setPercentage(enemy.life);
            }
        });
    }

    /**
     * Check if a throwable Object collides with an enemy.
     * @param {MovableObject} enemy - Object from the enemies array.
     * @returns {Boolean} - Enemy got hit or not.
     */
    bottleHitsEnemy(enemy) {
        return this.throwableObjects.some((bottle) => {
            if (bottle.isColliding(enemy)) {
                bottle.stopThrow();
            }
            return bottle.isColliding(enemy);
        });
    }

    /**
     * If an item gets touched call the collect function.
     * @param {Array} objects - Array of collectables (coins and bottles).
     */
    checkCharacterCollection(objects) {
        objects.forEach((object) => {
            if (this.character.isTouchingCollectable(object)) {
                if (object instanceof Bottle) this.collectBottle(object);
                if (object instanceof Coin) this.collectCoin(object);
            }
        });
    }

    /**
     * Collects a bottle.
     * @param {Bottle} object - Bottle object
     */
    collectBottle(object) {
        this.level.statusBars[2].setPercentage(this.level.statusBars[2].percentage += 10);
        this.character.availableBottles += 1;
        this.removeObject(object, this.level.bottles);
    }

    /**
     * Collects a coin.
     * @param {Coin} object - Coin object.
     */
    collectCoin(object) {
        this.level.statusBars[1].setPercentage(this.level.statusBars[1].percentage += 20);
        this.character.collectedCoins += 1;
        this.removeObject(object, this.level.coins);
    }

    /**
     * Remove an object from the list of the level.
     * @param {DrawableObject} object - Object to be removed from the level.
     * @param {Array} list - List of objects of a level.
     */
    removeObject(object, list) {
        list.splice(list.findIndex((element) => element.id == object.id), 1);
    }

    /**
     * Call functions to check states of the game.
     */
    checkState() {
        this.checkEndbossStart();
        this.checkGameEnd();
    }

    /**
     * Check the position of the character to start the moving of the endboss.
     */
    checkEndbossStart() {
        if (this.character.x >= 1500 && this.endboss.walkNotStarted) this.endboss.startWalking();
    }

    /**
     * Check if either the endboss or the character is dead and end the game.
     */
    checkGameEnd() {
        if (this.character.isDead() && this.gameRunning) this.gameOver(false);
        if (this.endboss.isDead() && this.gameRunning) this.gameOver(true);
    }

    /**
     * Stop the game and display an end screen.
     * @param {Boolean} win - True if character wins. 
     */
    gameOver(win) {
        this.gameRunning = false;
        setTimeout(() => {
            displayWinScreen(win);
        }, 2500);
    }

    /**
     * Start playing the backgroundmusic of the game.
     */
    startBackgroundMusic() {
        playSound(this.backgroundMusic);
    }

    /**
     * Stop playing the backgroundmusic of the game.
     */
    stopBackgroundMusic() {
        stopSound(this.backgroundMusic);
    }

    /**
     * Play an attacking sound of an anamy depending on instance of the enemy, but only when the game is running and isnt muted.
     * @param {Endboss|Chicken|Chick} enemy - Object of enemy thats attacking.
     */
    playAttackSound(enemy) {
        if (!gameIsMute && this.gameRunning) {
            if (enemy instanceof Endboss) {
                playSound(this.endboss.attackSound)
            } else {
                playSound(this.chickenAttackSound);
            }
        }
    }

}