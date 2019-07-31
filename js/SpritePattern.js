'use strict'

class SpritePattern {
    img;
    frames;
    dir; // vertical or horizontal
    spriteMapCoord;
    width;
    height;
    constructor(image, frames, dir, spriteMapCoord) {
        this.img = image;
        this.frames = frames;
        this.dir = dir;
        this.spriteMapCoord = spriteMapCoord;
        this.width = width;
        this.height = height;
    }
}