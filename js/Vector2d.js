class Vector2d{
    x;
    y;
    constructor(vector2d_or_x,y){
        if (arguments.length===0){
            this.x=this.y=0;
        }else {
            if (y === undefined) {
                this.x = vector2d_or_x.x;
                this.y = vector2d_or_x.y;
            } else {
                this.x = vector2d_or_x;
                this.y = y;
            }
        }
    }

    add(vector2d_or_x,y_or_res,res){
        if (vector2d_or_x instanceof Vector2d){
            if (y_or_res===undefined){
                this.x+=vector2d_or_x.x;
                this.y+=vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d){
                y_or_res.set(this.x,this.y);
                return y_or_res.add(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)){
            if (res===undefined){
                this.x+=vector2d_or_x;
                this.y+=y_or_res;
                return this;
            }
            if (res instanceof Vector2d){
                res.set(this.x,this.y);
                return res.add(vector2d_or_x,y_or_res);
            }
        }
    }

    sub(vector2d_or_x,y_or_res,res){
        if (vector2d_or_x instanceof Vector2d){
            if (y_or_res===undefined){
                this.x-=vector2d_or_x.x;
                this.y-=vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d){
                y_or_res.set(this.x,this.y);
                return y_or_res.sub(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)){
            if (res===undefined){
                this.x-=vector2d_or_x;
                this.y-=y_or_res;
                return this;
            }
            if (res instanceof Vector2d){
                res.set(this.x,this.y);
                return res.sub(vector2d_or_x,y_or_res);
            }
        }
    }


    mul(number,res){
        if (res===undefined){
            this.x*=number;
            this.y*=number;
            return this;
        }
        if (res instanceof Vector2d){
            res.set(this.x,this.y);
            return res.mul(number);
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
        return this.mul(1/this.length());
    }

    vectorProjection(vector_to_project_on){
        return this.dotProduct(vector_to_project_on.normalize());
    }
}