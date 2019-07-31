'use strict'

class Sprite {
    speed;
    index = 0;
    once; // once used or loop animation
    pattern; // SpritePattern
    img;
    frames;
    dir; // vertical or horizontal
    spriteMapCoord;
    constructor(speed, once, pattern) {
        this.pattern = pattern;
        this.once = once;
        this.speed = speed;
        this.frames = pattern.frames;
        this.img = pattern.img;
        this.dir = pattern.dir;
        this.spriteMapCoord = pattern.spriteMapCoord;
        this.width = pattern.width;
        this.height = pattern.height;
    }
    update(dt) {
        this.index += this.speed * dt;
    }
    reset() {
        this.index = 0;
    }
    render(canvasCoord) {
        let frame = 0;
        if (this.speed > 0) {
            let max = this.frames.length;
            let id = ~~(this.index);
            frame = this.frames[id % max];
            if (this.once && id  >= max) {
                return;
            }
        }
        let x = this.spriteMapCoord[0];
        let y = this.spriteMapCoord[1];
        if (this.dir == 'vertical') {
            y += frame * this.width;
        } else if (this.dir == 'horizontal') {
            x += frame * this.height;
        }
        ctx.drawImage(this.img, x, y, this.height, this.width, canvasCoord.x, canvasCoord.x, this.height, this.width);
    }
}
