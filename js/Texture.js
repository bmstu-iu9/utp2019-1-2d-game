'use strict'

class Texture {
    img;
    width;
    height;
    constructor(image) {
        this.setImage(image);
    }
    setImage(img) {
        if (img instanceof Image) {
            this.img = img;

        } else if (typeof(img) == "string") {
            this.img = new Image();
            this.img.src = "temporary/" + img;
        } else {
            throw Error("img is not a Image object or file source");

        }
        this.width = img.width;
        this.height = img.height;
    }
    render(canvasCoord) {
        ctx.drawImage(img, canvasCoord.x, canvasCoord.x);
    }
}

