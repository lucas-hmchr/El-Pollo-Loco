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

    backgroundMusic = new Audio('../assets/sounds/background-music.mp3');
    chickenAttackSound = new Audio('../assets/sounds/chicken/chicken-attack.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.animationFrameId = null;
        initLevel();

        this.setWorld();
        this.draw();
        this.run();
        this.startBackgroundMusic();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects)
        this.addObjectsToMap(this.level.clouds)

        // space for fixed Obj
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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

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

    setWorld() {
        this.character.world = this;
        this.setStatusBars();
        this.setEndboss();
    }

    setEndboss(){
        this.endboss = this.level.enemies[this.level.enemies.length - 1];
        this.endboss.world = this;
        this.endboss.animate();
    }

    setStatusBars() {
        this.level.statusBars.forEach((bar) => {
            bar.world = this;
        })
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkState();
        }, 100)
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.availableBottles >= 1) {
            this.character.availableBottles -= 1;
            this.level.statusBars[2].setPercentage(this.level.statusBars[2].percentage -= 10);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character);
            this.throwableObjects.push(bottle);
            this.character.resetMovementStop();
        }
    }

    checkCollisions() {
        this.checkCharacterCollision();
        this.checkBottleCollision();
        this.checkCharacterCollection(this.level.bottles);
        this.checkCharacterCollection(this.level.coins);
        this.checkCharacterJumpingCollision();
    }

    checkCharacterCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !(this.character.inPositionToJumpKill(enemy))) {
                this.character.hurtCharacter();
                this.level.statusBars[0].setPercentage(this.character.life);
                this.playAttackSound(enemy)
            }
        });
    }


    checkCharacterJumpingCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.inPositionToJumpKill(enemy)) {
                enemy.kill()
            }
        });
    }

    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.bottleHitsEnemy(enemy)) {
                if (enemy instanceof Chicken || enemy instanceof Chick) enemy.kill();
                if (enemy instanceof Endboss && !enemy.isHurt()) enemy.applyDamage(20); this.level.statusBars[3].setPercentage(enemy.life);
            }
        });
    }

    bottleHitsEnemy(enemy) {
        return this.throwableObjects.some((bottle) => {
            if (bottle.isColliding(enemy)) {
                bottle.stopThrow();
            }
            return bottle.isColliding(enemy);
        });
    }

    checkCharacterCollection(objects) {
        objects.forEach((object) => {
            if (this.character.isTouchingCollectable(object)) {
                if (object instanceof Bottle) this.collectBottle(object);
                if (object instanceof Coin) this.collectCoin(object);
            }
        });
    }

    collectBottle(object) {
        this.level.statusBars[2].setPercentage(this.level.statusBars[2].percentage += 10);
        this.character.availableBottles += 1;
        this.removeObject(object, this.level.bottles);
    }

    collectCoin(object) {
        this.level.statusBars[1].setPercentage(this.level.statusBars[1].percentage += 20);
        this.character.collectedCoins += 1;
        this.removeObject(object, this.level.coins);
    }

    removeObject(object, list) {
        list.splice(list.findIndex((element) => element.id == object.id), 1);
    }

    checkState() {
        this.checkEndbossStart();
        this.checkGameEnd();
    }

    checkEndbossStart() {
        if (this.character.x >= 1500 && !this.endboss.isWalking) this.endboss.startWalking();
    }

    checkGameEnd() {
        if (this.character.isDead() && this.gameRunning) this.gameOver(false);
        if (this.endboss.isDead() && this.gameRunning) this.gameOver(true);
    }

    gameOver(win) {
        this.gameRunning = false;
        setTimeout(() => {
            displayWinScreen(win);
        }, 2500);
    }

    startBackgroundMusic() {
        playSound(this.backgroundMusic);
    }

    stopBackgroundMusic() {
        stopSound(this.backgroundMusic);
    }

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