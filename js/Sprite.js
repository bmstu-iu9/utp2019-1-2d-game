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
    last;
    constructor(speed, once, pattern) {
        this.last = performance.now()
        this.pattern = pattern;
        this.once = once;
        this.speed = speed;
        this.switch(pattern.current.id)
    }
    switch(id) {
        this.reset()
        this.pattern.switch(id)
        this.frames = this.pattern.current.frames
        this.img = this.pattern.current.img
        this.dir = this.pattern.current.dir
        this.spriteMapCoord = this.pattern.current.spriteMapCoord
        this.width = this.pattern.current.width
        this.height = this.pattern.current.height
    }
    update(dt) {
        this.index += this.speed * dt;
    }
    reset() {
        this.index = 0;
    }
    render(canvasCoord) {
        this.update((Game.now - this.last) / 1000)
        let frame = 0;
        if (this.speed > 0) {
            let max = this.frames.length;
            let id = ~~(this.index);
            frame = this.frames[id % max];
            if (this.once && id  >= max) {
                return;
            }
        }
        let x = this.spriteMapCoord.x;
        let y = this.spriteMapCoord.y
        if (this.dir == 'vertical') {
            y += frame * this.height;
        } else if (this.dir == 'horizontal') {
            x += frame * this.width;
        }
        ctx.drawImage(this.img, x, y, this.width, this.height, canvasCoord.x, canvasCoord.y, this.width, this.height);
        this.last = Game.now
    }
}
