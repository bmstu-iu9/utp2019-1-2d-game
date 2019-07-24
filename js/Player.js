'use strict';
class Player{
    constructor(){
        this.scale=64;
        this.pos=new Vector2d(canvas.width/2,canvas.height/2);
        this.ds=2;
        this.boundingBox=new AABB(new Vector2d(this.pos.x,this.pos.y),new Vector2d(this.scale/4,this.scale/4));
        this.animation=new SpriteAnimation('sprite_tr.png',[0,1,2,3,4,5,6]);
    }
    render(){
        this.collide();
        this.animation.draw();
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
            if (keys.up) {
                this.pos.y -= this.ds;
                this.animation.animate(1);
            }
            if (keys.down){
                this.pos.y += this.ds;
                this.animation.animate(0);
            }
            if (keys.right) {
                this.pos.x += this.ds;
                this.animation.animate(2);
            }
            if (keys.left) {
                this.pos.x -= this.ds;
                this.animation.animate(3);
            }
        }
    }
    collide(){
        this.boundingBox.centre.set(this.pos);
        for (let stone of World.stones){
            let c=this.boundingBox.getCollision(stone);
            if (c.isIntersecting){
                this.boundingBox.correctPosition(stone,c);
                this.pos.set(this.boundingBox.centre);
            }
        }
    }


}