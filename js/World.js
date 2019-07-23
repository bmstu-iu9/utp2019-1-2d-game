'use strict';
class World{
    static tiles=[];
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
        World.tiles[y*this.width+x]=tile;
    }
}