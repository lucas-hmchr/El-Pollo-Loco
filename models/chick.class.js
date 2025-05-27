class Chick extends MovableObject {

    height = 50;
    width = 60;
    y = 375;
    x = 200 + (Math.random() * 1500);

    offset = {
        top: -30,
        bottom: 0,
        left: -10,
        right: -10,
    }

    IMAGES_WALKING = [
        '../assets/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('../assets/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING)
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        if (this.isDead()) {

        } else {
            setInterval(() => {
                this.handleMovement();
            }, 1000 / 60)

            setInterval(() => {
                this.handleAnimation();
            }, 200)
        }
    }

    handleMovement() {
        if (!this.isDead()) this.walk();
    }

    walk() {
        if (this.x < 250) {
            this.moveRight();
            this.otherDirection = true;
        }
        if (!this.otherDirection) {
            this.moveLeft(false);
        } else {
            this.moveRight();
            this.otherDirection = true;
        }
        if (this.x > 2000) {
            this.otherDirection = false;
            this.moveLeft(false);
        }
    }

    handleAnimation() {
        this.isDead() ? this.loadImage('../assets/3_enemies_chicken/chicken_small/2_dead/dead.png') : this.playAnimation(this.IMAGES_WALKING);
        if (this.isDead()) this.removeBody();
    }
}
