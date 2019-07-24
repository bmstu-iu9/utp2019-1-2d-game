'use strict';
class World{
    static tiles=[];
    static stones=[];
    constructor(){
        this.width=32;
        this.height=32;
        this.scale=64;
        for (let i=0;i<this.width*this.height;i++)
            World.tiles[i]=Tile.small_grass;
    }

    render(){
        for (let i=0;i<this.height;i++){
            for (let j=0;j<this.width;j++) {
                World.tiles[i*this.width+j].render(i*this.scale,j*this.scale,this.scale,this.scale);
            }
        }
    }

    setTile(tile,x,y){
        World.tiles[x*this.width+y]=tile;
        if (tile.isSolid) World.stones.push(new AABB(new Vector2d(x*this.scale+this.scale/2,y*this.scale+this.scale/2)
            ,new Vector2d(this.scale/2,this.scale/2)));
    }
}