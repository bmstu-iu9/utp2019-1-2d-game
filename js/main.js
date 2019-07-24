'use strict';

let world=new World();
let player=new Player();

const input=new Input();


world.setTile(Tile.brick,3,3);
world.setTile(Tile.brick,2,3);
world.setTile(Tile.brick,1,3);
world.setTile(Tile.brick,0,3);
world.setTile(Tile.brick,3,2);
const render=()=>{
    input.update();
    world.render();
    player.changePosition();
    player.render();
    requestAnimationFrame(render);
};

$(document).ready(render());