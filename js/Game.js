'use strict'

let canvas = document.getElementById("canvas")
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight; 
let ctx = canvas.getContext("2d")

const Game = {
    Init(){
        Game.srcPath = "resources/"
        Game.TestImage = new Image()
        Game.TestImage.src = Game.srcPath + "test.jpg"
        Game.TestTexture = new Texture(Game.TestImage)
        Game.fps = 60
        Game.dt = 0
        Game.step = 1 / Game.fps
        Game.last = 0
        Game.tileWidth = 70
        Game.tileHeight = 70
        Game.camera = new Camera(canvas.width, canvas.height)
        Game.roomRnd = new RoomRenderer(2)
        Game.currentWorld = WorldFactory.CreateTestWorld()     
        Game.objCnt = 0
        Game.now = 0
    },
    /**
     * Возвращает уникальный id в формате "gameObj_number"
     */
    getUniqId() {
        Game.objCnt++
        return "gameObj_" + Game.objCnt
    },

    GameLoop() {
        Game.now = performance.now()
        Game.dt = Game.dt + Math.min(1, (Game.now - Game.last) / 1000);
        while (Game.dt > Game.step) {
            Game.dt = Game.dt - Game.step
            Game.Update()
        }
        Game.last = Game.now
        Game.Render()
        requestAnimationFrame(Game.GameLoop)
    },

    Update() {

    },

    Render() {
        this.currentWorld.render();
    },
}

Game.Init()
Game.GameLoop()