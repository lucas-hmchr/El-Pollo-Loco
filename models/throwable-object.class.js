class ThrowableObject extends MovableObject {

    speedY = 30;
    speedX = 20;
    throwRight;

    IMAGES_THROWING = [
        '../assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASHING = [
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    throwIntervalId;
    isFlying;

    availableBottles = 0;

    flyingBottleSound = new Audio('../assets/sounds/flying-bottle.mp3');

    constructor(x, y, character) {
        super().loadImage('../assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.throwRight = !character.otherDirection;
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 65;
        this.throw()
    }

    throw() {
        this.availableBottles -= 1;
        this.speedY = 30;
        this.applyGravity()
        this.throwIntervalId = setInterval(() => {
            this.throwRight ? this.x += 10 : this.x -= 10;
        }, 25);
        this.throwAnimation()
        this.isFlying = true;
    }

    throwAnimation() {
        playSound(this.flyingBottleSound);
        setInterval(() => {
            if (this.isFlying) {
                this.playAnimation(this.IMAGES_THROWING)
            }
        }, 75)
    }

    splashAnimation() {
        this.playAnimationOnce(this.IMAGES_SPLASHING, 800)
        this.moveObjBelowCanvas(800);

    };

    stopThrow() {
        stopSound(this.flyingBottleSound);
        this.removeGravity();
        this.splashAnimation();
        clearInterval(this.throwIntervalId);
        this.isFlying = false;
    }
}