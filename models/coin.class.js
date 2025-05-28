class Coin extends MovableObject {

    y = 200;
    width = 85;
    height = 85;
    id = Date.now()

    offset = {
        top: 30,
        bottom: 30,
        left: 25,
        right: 25,
    }

    IMAGES = [
        '../assets/8_coin/coin_1.png',
        '../assets/8_coin/coin_2.png',
    ]

    /**
     * Set up the coin.
     * - Load the necessary images.
     * - Set a random position based on the params.
     * - Start the animation.
     * @param {Number} minx - Minimum x-coordinate.
     * @param {Number} maxx - Maximum x-coordinate.
     */
    constructor(minx, maxx) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES)
        this.x = Math.random() * (maxx - minx + 1) + minx;
        this.y = Math.random() * (200 - 100 + 1) + 100;
        this.animate();
    }

    /**
     * Start the coin animation.
     */
    animate() {
        setStoppableInterval(() => {
            this.handleAnimation();
        }, 200)
    }

    /**
     * Handle the coin animation.
     */
    handleAnimation() {
        this.playAnimation(this.IMAGES)
    }

}