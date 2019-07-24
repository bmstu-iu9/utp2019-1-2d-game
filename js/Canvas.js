'use strict';

const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');


//не работает с context
let gl;
try{
    gl=canvas.getContext('webgl')||canvas.getContext('experimental-webgl');
}catch (e) {
    alert('Error occurred initializing webgl');
}
