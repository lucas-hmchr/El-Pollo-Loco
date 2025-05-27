class Cloud extends MovableObject{

    y = 100;
    x = Math.random()*500;
    width = 400;
    height = 300;

    /**
     * Loads the image of the given path and sets a random position inbetween the minimum and maximum x coordinates.
     * @param {String} imagePath - Path of the image.
     * @param {Number} minx - Minimum x-coordinate.
     * @param {Number} maxx - Maximum x-coordinate.
     */
    constructor(imagePath, minx, maxx) {
        super().loadImage(imagePath);
        this.x = Math.random() * (maxx - minx + 1) + minx;
        this.y = Math.random() * (100 - 20 + 1) + 20;
        
        this.animate()
    }


    /**
     * Move the cloud to the left slowly.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(false)
        }, 10)

        
    }
}