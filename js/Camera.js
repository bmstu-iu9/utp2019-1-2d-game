'use strict';
//не готов

class Camera {
    constructor(x,y){
        this.pos=new Vector2d(x,y);
    }
    changePosition(x,y){
        this.pos.add(x,y);
    }
}