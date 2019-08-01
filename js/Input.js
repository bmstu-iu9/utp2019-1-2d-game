'use strict';

let keyboard={
    up:false,
    down:false,
    right:false,
    left:false,
    keyW:false,
    keyA:false,
    keyS:false,
    keyD:false
};

let mouse={
    isLeftClicked:false,
    isRightClicked:false,
    clickPosition:new Vector2d()
};

addEventListener('keydown',(e)=>{
    if (e.keyCode === 38) {
        keyboard.up = true;
    }
    if (e.keyCode === 40) {
        keyboard.down = true;
    }
    if (e.keyCode === 37) {
        keyboard.left = true;
    }
    if (e.keyCode === 39) {
        keyboard.right = true;
    }
    if (e.keyCode === 87) {
        keyboard.keyW = true;
    }
    if (e.keyCode === 65) {
        keyboard.keyA = true;
    }
    if (e.keyCode === 83) {
        keyboard.keyS = true;
    }
    if (e.keyCode === 68) {
        keyboard.keyD = true;
    }
});

addEventListener('keyup',(e)=>{
    if (e.keyCode === 38) {
        keyboard.up = false;
    }
    if (e.keyCode === 40) {
        keyboard.down = false;
    }
    if (e.keyCode === 37) {
        keyboard.left = false;
    }
    if (e.keyCode === 39) {
        keyboard.right = false;
    }
    if (e.keyCode === 87) {
        keyboard.keyW = false;
    }
    if (e.keyCode === 65) {
        keyboard.keyA = false;
    }
    if (e.keyCode === 83) {
        keyboard.keyS = false;
    }
    if (e.keyCode === 68) {
        keyboard.keyD = false;
    }
});

addEventListener('mousedown',(e)=>{
   if (e.which===1){
       mouse.isLeftClicked=true;
   }
   if (e.which===3){
       mouse.isRightClicked=true;
   }
   mouse.clickPosition.set(e.clientX,e.clientY);
});

addEventListener('mouseup',(e)=>{
    if (e.which===1){
        mouse.isLeftClicked=false;
    }
    if (e.which===3){
        mouse.isRightClicked=false;
    }
});

