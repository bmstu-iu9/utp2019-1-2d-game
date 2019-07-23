'use strict';
class AABB{
    constructor(centre,he){
        this.halfExtend=he;
        this.centre=centre;
    }
    getCollision(object){
        const diffX=Math.abs(this.centre.x-object.centre.x);
        const diffY=Math.abs(this.centre.y-object.centre.y);
        let diff=new Vector2d(diffX,diffY);
        diff.sub(new Vector2d(this.halfExtend.x+object.halfExtend.x,this.halfExtend.y+object.halfExtend.y));
        return new Collision(diff,diff.x<0 && diff.y<0);
    }

    correctPosition(object,collision){
        let vec=new Vector2d(object.centre.x,object.centre.y);
        let correction=vec.sub(this.centre);
        if (collision.dist.x>collision.dist.y){
            if (correction.x>0){
                this.centre.add(collision.dist.x,0);
            }else {
                this.centre.sub(collision.dist.x,0);
            }
        }else {
            if (correction.y>0){
                this.centre.add(0,collision.dist.y);
            }else {
                this.centre.sub(0,collision.dist.y);
            }
        }
    }
}

class Collision{
    constructor(dist,isInt){
        this.isIntersecting=isInt;
        this.dist=dist;
    }
}
