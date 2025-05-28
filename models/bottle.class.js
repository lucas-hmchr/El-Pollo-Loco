class Bottle extends DrawableObject{

    y = 350;
    x = Math.random()*500;
    width = 75;
    height = 75;
    id = Date.now()

    offset = {
        top: 10,
        bottom: 10,
        left: 40,
        right: 40,
    }

    /**
     * Loads the image of the given path and sets a random position inbetween the minimum and maximum x coordinates.
     * @param {String} imagePath - Path of the image.
     * @param {Number} minx - Minimum x-coordinate.
     * @param {Number} maxx - Maximum x-coordinate.
     */
    constructor(imagePath, minx, maxx) {
        super().loadImage(imagePath);
        this.x = Math.random() * (maxx - minx + 1) + minx;        
    }

}