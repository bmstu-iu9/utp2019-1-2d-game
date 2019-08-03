'use strict'

class SpritePattern {
    constructor(image, frames, dir, x, y, height, width) {
        this.img = image;
        this.frames = frames;
        this.dir = dir;
        this.spriteMapCoord = new Vector2d(x, y)
        this.width = width;
        this.height = height;
    }
}