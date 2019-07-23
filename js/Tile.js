'use strict';
class Tile{
    static tiles=[];
    static numberOfTiles=0;
    static small_grass=new Tile('small_grass.jpg');
    static grass=new Tile('grass.png');
    static black=new Tile('black.jpg').makeSolid();
    constructor(name){
        this.id=Tile.numberOfTiles++;
        this.texture=new Texture(name);
        Tile.tiles[this.id]=this;
        this.isSolid=false;
    }
    render(x,y,w,h){
        this.texture.draw(x,y,w,h);
    }
    makeSolid(){
        this.isSolid=true;
        return this;
    }
}
