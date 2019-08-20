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
        this.width = this.img.width
        this.height = this.img.height

    }
    /**
     * 
     * @param {Vector2D} canvasCoord 
     */
    render(canvasCoord) {
        ctx.drawImage(this.img, canvasCoord.x, canvasCoord.y);
    }

    /**
     *
     * @param {Texture} object
     */

    toJSON(){
        console.log(this.img.src)
        return this.img.src
    }
    static fromJSON(object){
        console.log(object)
        return textureStorage[object] //Как появится id нужно будет удалить
    }
}

