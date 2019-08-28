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
    constructor(speed, pattern, firstPatternName = "idle", isAngleEnabled = false, onceCallback) {
        this.isAngleEnabled = isAngleEnabled
        this.last = performance.now()
        this.pattern = pattern
        this.speed = speed;
        this.current = undefined
        this.switch(firstPatternName, undefined)
    }
    changeSpeed(speed) {
        this.speed = speed
    }
    switch(name, vector) {
        //this.reset()
        if (vector !== undefined) {
            if (this.isAngleEnabled) {
                let data = this.pattern.data.get(name)
                let vec = Math.atan2(vector.y, vector.x)
                this.angle = vec
                this.current = data[0]
            } else {
                let data = this.pattern.data.get(name)
                let vec = 2 - polarAngle(vector) / Math.PI
                if (data.length == 4) {
                    if (vec <= 0.25 || vec >= 1.75) {
                        this.current = data[0]
                    } else if (vec >= 0.75 && vec <= 1.25) {
                        this.current = data[2]
                    } else {
                        this.current = data[Math.ceil((vec - 0.25) / 0.5)]
                    }
                }
                else { this.current = data[0] }
            }
        } else {
            let data = this.pattern.data.get(name)
            this.current = data[0]
        }
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
            if (this.current.once && id >= max) {
                if (this.onceCallback) {
                    this.onceCallback()
                }
                return
            }
        }
        let x = this.spriteMapCoord.x * this.height
        let y = this.spriteMapCoord.y * this.width
        if (this.dir == 'vertical') {
            y += frame * this.height;
        } else if (this.dir == 'horizontal') {
            x += frame * this.width;
        }

        if (this.isAngleEnabled) {
            ctx.save();
            ctx.translate(canvasCoord.x + this.width / 2, canvasCoord.y + this.height / 2);
            ctx.rotate(this.current.baseAngle + this.angle);
            ctx.translate(-(canvasCoord.x + this.width / 2), -(canvasCoord.y + this.height / 2));
            ctx.drawImage(this.img, x, y, this.width, this.height, canvasCoord.x, canvasCoord.y, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.img, x, y, this.width, this.height, canvasCoord.x, canvasCoord.y, this.width, this.height);
        }

        this.last = Game.now
    }

    toJSON() {
        return {
            pattern: this.pattern,
            once: this.once,
            speed: this.speed,
            frames: this.frames,
            img: this.img, // нужно будет только id
            index: this.index,
            dir: this.dir,
            spriteMapCoord: this.spriteMapCoord,
            width: this.width,
            height: this.height
        }
    }

    /**
     *
     * @param {Sprite}object
     */
    static fromJSON(object) {
        let sprite = new Sprite(object.speed, object.once, SpritePattern.fromJSON(object.pattern))
    }
}

function polarAngle(vector) {
    let first = Math.atan2(vector.y, vector.x)
    first += first >= 0 ? 0 : 2 * Math.PI
    return first
}