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
        this.update((Game.now - Game.last) / 1000)
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
    }

    toJSON(){
        return {
            pattern : this.pattern,
            once : this.once,
            speed : this.speed,
            frames : this.frames,
            img : this.img, // нужно будет только id
            index : this.index,
            dir : this.dir,
            spriteMapCoord : this.spriteMapCoord,
            width : this.width,
            height : this.height
        }
    }

    /**
     *
     * @param {Sprite}object
     */

    static fromJSON(object){
        let sprite = new Sprite(object.speed,object.once,SpritePattern.fromJSON(object.pattern))
    }
}
