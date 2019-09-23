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
    KeyZ:false, // save()
    KeyF: false,
    Space:false,
    Escape:false,
};

let keyboardUP={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false,
    KeyW:false,
    KeyA:false,
    KeyS:false,
    KeyD:false,
    KeyZ:false, // save()
    KeyF: false,
    Space:false,
    Escape:false,
};

let mouse={
    isLeftClicked:false,
    isRightClicked:false,
    clickPosition:new Vector2d()
};

const inputReset = () => {
    for(const key in keyboardUP){
        keyboardUP[key] = false;
    }
}

const keyboardHandler=(event)=>{
    if (keyboard.hasOwnProperty(event.code)){
        keyboard[event.code]=event.type==='keydown';
        
    }
};
const keyboardUPHandler=(event)=>{
    if (keyboardUP.hasOwnProperty(event.code)){
        keyboardUP[event.code]=event.type==='keyup';
    }
};

const keyboardListener=()=>{
    addEventListener('keydown', keyboardHandler);
    addEventListener('keydown', keyboardUPHandler);
    addEventListener('keyup', keyboardUPHandler);
    addEventListener('keyup', keyboardHandler);
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
