'use strict';
class AABB{
    constructor(x,y){
        this.halfExtend=new Vector2d(1,1);
        this.centre=new Vector2d(x,y);
    }
    getCollision(object){
        const diffX=Math.abs(this.centre.x-object.centre.x);
        const diffY=Math.abs(this.centre.y-object.centre.y);
        return new Collision(new Vector2d(diffX,diffY),diffX<this.halfExtend.x&&diffY<this.halfExtend.y);
    }
}

class Collision{
    constructor(dist,isInt){
        this.isIntersecting=isInt;
        this.dist=dist;
    }
}