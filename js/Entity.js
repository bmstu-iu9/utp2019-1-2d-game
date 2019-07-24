'use strict';
class Entity{
    constructor(textureName,scale){
        this.texture=new Texture(textureName);
        this.scale=scale;
        this.pos=new Vector2d(0,0);
        this.boundingBox=new AABB(new Vector2d(0,0),new Vector2d(1,1));
    }

    //дописать

}