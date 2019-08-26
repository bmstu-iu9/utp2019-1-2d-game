'use strict';

let keyboard={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false,
    KeyW:false,
    KeyA:false,
    KeyS:false,
    KeyD:false,
    KeyF:false
};

let mouse={
    isLeftClicked:false,
    isRightClicked:false,
    clickPosition:new Vector2d()
};

const keyboardListener=(keyboard)=>{
    const keyboardHandler=(event)=>{
        if (keyboard.hasOwnProperty(event.code)){
            keyboard[event.code]=event.type==='keydown';
        }
    };
    addEventListener('keydown',keyboardHandler);
    addEventListener('keyup',keyboardHandler);
};

const mouseListener=(mouse)=>{
    const mouseHandler=(event)=>{
        const state=event.type==='mousedown';
        if (event.which===1){
            mouse.isLeftClicked=state;
        }
        if (event.which===3){
            mouse.isRightClicked=state;
        }
        if (state){
            mouse.clickPosition.set(event.clientX,event.clientY);
        }
    };
    addEventListener('mousedown',mouseHandler);
    addEventListener('mouseup',mouseHandler);
};

keyboardListener(keyboard);
mouseListener(mouse);
