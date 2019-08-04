'use strict'

let canvas = document.getElementById("canvas")
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
let ctx = canvas.getContext("2d")

let imagesStorage = {}

let imagesSrc = [
    'tile.png',
    'test.jpg',
]

let Game = {
    InitConfig() {
        Game.srcPath = "resources/"
        Game.TestImage = { a: 1 }
        Game.fps = 60
        Game.dt = 0
        Game.step = 1 / Game.fps
        Game.last = 0
        Game.tileWidth = 70
        Game.tileHeight = 70
        Game.objCnt = 0
        Game.now = 0

    },

    InitLogic() {
        Game.TestImage = imagesStorage.test
        Game.TestTexture = new Texture(Game.TestImage)
        Game.camera = new Camera(canvas.width, canvas.height)
        Game.roomRnd = new RoomRenderer(2)
        Game.currentWorld = WorldFactory.CreateTestWorld()
        requestAnimationFrame(Game.Loop)
    },

    /**
     * Возвращает уникальный id в формате "gameObj_number"
     */
    getUniqId() {
        Game.objCnt++
        return "gameObj_" + Game.objCnt
    },

    Loop() {
        Game.now = performance.now()
        Game.dt = Game.dt + Math.min(1, (Game.now - Game.last) / 1000)
        while (Game.dt > Game.step) {
            Game.dt = Game.dt - Game.step
            Game.Update()
        }
        Game.last = Game.now
        Game.Render()
        requestAnimationFrame(Game.Loop)
    },

    Update() {

    },

    Render() {
        this.currentWorld.render();
    },
}

Game.InitConfig()
ResourceLoader.setCallback(Game.InitLogic)
ResourceLoader.InitResourceRep(imagesStorage, Game.srcPath, imagesSrc)