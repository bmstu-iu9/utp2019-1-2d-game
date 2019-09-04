'use strict'

class Texture {
    /**
     *
     * @param {Image} image
     */
    constructor(image) {
        this.setImage(image);
        this.type = "texture"
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

    toJSON(){
        return Serializations[this.type](this)
    }
    /**
     *
     * @param {Texture} object
     */
    static fromJSON(object){
        return textureStorage[object.src] //Как появится id нужно будет удалить
    }
}
