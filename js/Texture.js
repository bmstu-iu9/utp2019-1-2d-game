'use strict'

class Texture {
    /**
     * 
     * @param {Image} image 
     */
    constructor(image) {
        this.setImage(image);
    }
    /**
     * 
     * @param {Image} img 
     */
    setImage(img) {
        if (img instanceof Image) {
            this.img = img;

        }
        this.width = img.width
        this.height = img.height
    }
    /**
     * 
     * @param {Vector2D} canvasCoord 
     */
    render(canvasCoord) {
        ctx.drawImage(this.img, canvasCoord.x, canvasCoord.y);
    }
}

