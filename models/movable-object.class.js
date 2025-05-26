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
    lastHit;
    deathDate;
    gravityIntervalId;
    movementStop;

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft(otherDirection) {
        this.x -= this.speed;
        this.otherDirection = otherDirection;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    };

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

    applyGravity() {
        this.gravityIntervalId = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    };

    removeGravity() {
        if (this.gravityIntervalId !== null) {
            clearInterval(this.gravityIntervalId);
            this.gravityIntervalId = null;
        }
    };

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 85;
        }
    }

    jump() {
        this.speedY = 30;
    }

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

    characterLife() {
        return this.life;
    }

    isDead() {
        return this.life == 0;
    }

    applyDamage(damage) {
        this.life -= damage;
        if (this.life < 0) {
            this.life = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    kill() {
        this.life = 0;
        this.deathDate = new Date().getTime();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 2;
    }

    removeBody() {
        if (this.deathDate && this.deathDate + 1000 < new Date().getTime()) {
            this.width = 0;
            this.height = 0;
            this.y = 700;
        }
    }

    moveObjBelowCanvas(timeout) {
        setTimeout(() => {
            this.y = 1000;
        }, timeout)
    }
    
    setMovementStop() {
        if (!this.movementStop) this.movementStop = new Date().getTime();
    }

    resetMovementStop() {
        this.movementStop = null;
    }

}