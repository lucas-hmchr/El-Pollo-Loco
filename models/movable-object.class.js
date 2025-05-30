class MovableObject extends DrawableObject {
    x = 100;
    y = 300;
    img;
    height = 150;
    width = 100;

    imageCache = {};

    currentImage = 0;

    speed = 0.15;

    otherDirection = false;
    speedY = 0;
    acceleration = 3;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    life = 100;
    lastHit = 0;
    deathDate;
    gravityIntervalId;
    movementStop;
    world;

    /**
     * Moves object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves object to the right.
     * @param {Boolean} otherDirection - Tells if image needs to be facing the opposite direction.
     */
    moveLeft(otherDirection) {
        this.x -= this.speed;
        this.otherDirection = otherDirection;
    }

    /**
     * Runs a repeated animation with passed images. 
     * @param {Array} images - Array with strings as paths for images.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    };

    /**
     * Run a animation with passend images a single time.
     * @param {Array} images - Array with strings as paths for images.
     * @param {Number} totalDuration - Total time of animation.
     */
    playAnimationOnce(images, totalDuration) {
        this.currentImage = 0;
        const timePerFrame = totalDuration / images.length;
        const animationInterval = setInterval(() => {
            if (this.currentImage < images.length) {
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(animationInterval);
            }
        }, timePerFrame);
    }

    /**
     * Activate gravitation for the object.
     */
    applyGravity() {
        this.gravityIntervalId = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    };

    /**
     * Deactivate gravitation for the object.
     */
    removeGravity() {
        if (this.gravityIntervalId !== null) {
            clearInterval(this.gravityIntervalId);
            this.gravityIntervalId = null;
        }
    };

    /**
     * Checks if the object is above the ground.
     * @returns {Boolean} - True, if is above ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 85;
        }
    }

    /**
     * Check if object collides with another object.
     * @param {MovableObject} mo - Other movable object. 
     * @returns {Boolean} - True if collision gets detected.
     */
    isColliding(mo) {
        if (!mo.isDead()) {
            return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
        } else {
            return false;
        }
    }

    /**
     * Returns the health points.
     * @returns {Number} - Health points
     */
    characterLife() {
        return this.life;
    }

    /**
     * Returns if object has health points.
     * @returns {Boolean} - True if object is dead.
     */
    isDead() {
        return this.life == 0;
    }

    /**
     * Deal damage.
     * @param {Number} damage - Amount of damage to be applied.
     */
    applyDamage(damage) {
        this.life -= damage;
        if (this.life < 0) {
            this.life = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Kill object instantly by setting health points to 0.
     */
    kill() {
        this.life = 0;
        this.deathDate = new Date().getTime();
    }

    /**
     * Check if object has taken damage within the last 2 seconds.
     * @returns {Boolean} - True if damage has been applied in the last 2 seconds.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 500;
        return timepassed < 2;
    }

    /**
     * Remove the body of the object 1 second after its death.
     */
    removeBody() {
        if (this.deathDate && this.deathDate + 1000 < new Date().getTime()) {
            this.width = 0;
            this.height = 0;
            this.y = 700;
        }
    }

    /**
     * Moves the object below the screen after a given time.
     * @param {Number} timeout - Time in milliseconds.
     */
    moveObjBelowCanvas(timeout) {
        setTimeout(() => {
            this.y = 1000;
        }, timeout)
    }

    /**
     * Sets a timestamp when the object stopped moving.
     */
    setMovementStop() {
        if (!this.movementStop) this.movementStop = new Date().getTime();
    }

    /**
     * Resets the timestamp.
     */
    resetMovementStop() {
        this.movementStop = null;
    }

}