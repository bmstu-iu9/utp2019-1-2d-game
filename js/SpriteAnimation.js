class SpriteAnimation {
    capture=87;        //захват пикселей
    constructor(filename,frame){
        this.pattern=new Texture(filename);
        this.currentFrame=0;
        this.delay=0;
        this.currentDirection=0;
        this.frames=frame;
    }
    animate(direction) {
        if (this.delay++ > 3) {
            this.delay=0;
            this.currentFrame++;
            if (direction !== undefined && direction !== this.currentDirection) {
                this.currentDirection = direction;
                this.currentFrame = 0;
            }
            if (this.currentFrame >= this.frames.length)
                this.currentFrame = 0;
            this.pattern.drawElement(this.capture * this.frames[this.currentFrame], this.currentDirection * this.capture+40,
                this.capture, this.capture, player.pos.x - player.scale / 2, player.pos.y - player.scale / 2, player.scale, player.scale);
        }
        //+40 тк изображение по OY немного ниже ,чем нужно
    }
    draw(){
        this.pattern.drawElement(this.capture * this.frames[this.currentFrame], this.currentDirection * this.capture+40,
            this.capture, this.capture, player.pos.x - player.scale / 2, player.pos.y - player.scale / 2, player.scale, player.scale);
    }
}

