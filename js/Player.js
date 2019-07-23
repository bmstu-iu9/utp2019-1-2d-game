'use strict';
class Player{
    constructor(){
        this.texture=new Texture('player.jpg');
        this.pos=new Vector2d(canvas.width/2,canvas.height/2);
        this.scale=32;
        this.ds=2;
    }
    render(){
        this.texture.draw(this.pos.x,this.pos.y,this.scale,this.scale);
    }
    changePosition() {
        if (keys.up && keys.left) {
            this.pos.add(-this.ds / Math.sqrt(2), -this.ds / Math.sqrt(2));
        } else if (keys.up && keys.right) {
            this.pos.add(this.ds / Math.sqrt(2), -this.ds / Math.sqrt(2));
        } else if (keys.down && keys.left) {
            this.pos.add(-this.ds / Math.sqrt(2), this.ds / Math.sqrt(2));
        } else if (keys.down && keys.right) {
            this.pos.add(this.ds / Math.sqrt(2), this.ds / Math.sqrt(2));
        } else {
            if (keys.up) this.pos.y -= this.ds;
            if (keys.down) this.pos.y += this.ds;
            if (keys.right) this.pos.x += this.ds;
            if (keys.left) this.pos.x -= this.ds;
        }
    }
}