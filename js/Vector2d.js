'use strict';
class Vector2d{
    x;
    y;
    constructor(vector2d_or_x,y){
        if (y===undefined){
            this.x=vector2d_or_x.x;
            this.y=vector2d_or_x.y;
        }else {
            this.x=vector2d_or_x;
            this.y=y;
        }
    }
    add(vector2d_or_x,y){
        if (y===undefined){
            this.x+=vector2d_or_x.x;
            this.y+=vector2d_or_x.y;
        }else {
            this.x+=vector2d_or_x;
            this.y+=y;
        }
    }
    sub(vector2d_or_x,y){
        if (y===undefined){
            this.x-=vector2d_or_x.x;
            this.y-=vector2d_or_x.y;
        }else {
            if (y instanceof Vector2d){
                y.set(this.x,this.y);
                y.sub(vector2d_or_x);
                return y;
            }
            this.x-=vector2d_or_x;
            this.y-=y;
        }
    }
    mul(vector2d_or_x,res){
        if (res===undefined){
            if (vector2d_or_x instanceof Vector2d){
                this.x*=vector2d_or_x.x;
                this.y*=vector2d_or_x.y;
            }else {
                this.x*=vector2d_or_x;
                this.y*=vector2d_or_x;
            }
        }else {
            res=new Vector2d(this.x,this.y);
            res.mul(vector2d_or_x);
            return res;
        }
    }
    set(vector2d_or_x,y){
        if (y===undefined){
            this.x=vector2d_or_x.x;
            this.y=vector2d_or_x.y;
        }else {
            this.x=vector2d_or_x;
            this.y=y;
        }
    }
    dotProduct(vector2d){
        return this.x*vector2d.x+this.y*vector2d.y;
    }

    lengthSquared(){
        return this.x*this.x+this.y*this.y;
    }

    length(){
        return Math.sqrt(this.lengthSquared());
    }

    normalize(){
        this.x/=this.length();
        this.y/=this.length();
        return this;
    }

    vectorProjection(vector_to_project_on){
        return this.dotProduct(vector_to_project_on)/vector_to_project_on.length();
    }

}