'use strict';

let world=new World();
let player=new Player();

world.setTile(Tile.black,2,3);

const input=new Input();

const render=()=>{
    input.update();
    world.render();
    player.changePosition();
    player.render();
    requestAnimationFrame(render);
};

$(document).ready(render());