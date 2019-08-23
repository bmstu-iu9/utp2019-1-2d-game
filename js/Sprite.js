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
    constructor(speed, pattern) {
        this.last = performance.now()
        this.pattern = pattern
        this.speed = speed;
        this.current = undefined
        this.switch(Object.keys(pattern.data.map)[9])
        console.log(this.current)
    }
    changeSpeed(speed) {
        this.speed = speed
    }
    switch(id) {
        this.reset()
        this.current = this.pattern.data.get(id)
        this.frames = this.current.frames
        this.img = this.current.img
        this.dir = this.current.dir
        this.spriteMapCoord = this.current.spriteMapCoord
        this.width = this.current.width
        this.height = this.current.height
    }
    update(dt) {
        this.index += this.speed * dt * this.current.speed
    }
    reset() {
        this.index = 0
    }
    render(canvasCoord) {
        this.update((Game.now - this.last) / 1000)
        let frame = 0;
        if (this.speed * this.current.speed > 0) {
            let max = this.frames.length;
            let id = ~~(this.index);
            frame = this.frames[id % max];
            if (this.current.once && id  >= max) {
                return;
            }
        }
        let x = this.spriteMapCoord.x * this.height
        let y = this.spriteMapCoord.y * this.width
        if (this.dir == 'vertical') {
            y += frame * this.height;
        } else if (this.dir == 'horizontal') {
            x += frame * this.width;
        }
        ctx.drawImage(this.img, x, y, this.width, this.height, canvasCoord.x, canvasCoord.y, this.width, this.height);
        this.last = Game.now
    }
}
