class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Loads the image of the given path and sets the position based of the given x coordinate.
     * @param {String} imagePath - Path of the image.
     * @param {Number} x - X-coordinate.
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}