class DrawableObject {

    img;
    imageCache = [];
    currentImage;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Loads a single image and assigns it to this.img.
     * @param {String} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image of the object to the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


    /**
     * Loads multiple images and stores them in the imageCache for later use.
     * @param {Array} arr - An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws an (invisible) frame around the object for debugging or collision visualization.
     * Only applies to specific object types.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Chick ) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Checks whether the current object is touching a collectable object.
     * @param {Object} obj - The collectable object to check collision with.
     * @returns {Boolean} - True if a collision is detected, otherwise false.
     */
    isTouchingCollectable(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }
}