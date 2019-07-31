'use strict'

let ctx = document.getElementById(canvas)

const Game = {
    fps : 60,
    dt : 0,
    step : 1 / 60,
    last : 0,
    tileWidth : 50,
    tileHeight : 50,
    currenWorld : new World("mainWorld"),
    objCnt : 0,
    now : 0,

    getUniqId(){
        Game.objCnt = Game.objCnt + 1
        return "gameObj_" + Game.obj
    },

    GameLoop(){
        Game.now = performance.now()
        Game.dt = Game.dt + Math.min(1, (Game.now - Game.last) / 1000);
        while(Game.dt > Game.step){
            Game.dt = Game.dt - Game.step 
            Game.Update()
        }
        Game.last = Game.now
        Game.Render()
        requestAnimationFrame(Game.GameLoop)
    }, 

    Update(){

    },

    Render(){

    },
}

Game.GameLoop()