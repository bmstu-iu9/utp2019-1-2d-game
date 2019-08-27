'use strict'

let canvas = document.getElementById("canvas")
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
let ctx = canvas.getContext("2d", { alpha: false })

let imagesStorage = {}
let textureStorage = {}


let imagesSrc = [
    'ghost_shriek.png',
    'knight.png',
    'Floor.png',
    'Wall.png',
    'fire_ball.png',
    'rocks1.png',
    'rocks2.png',
    'rocks3.png',
    'rocks4.png'

];

let Game = {
    InitConfig() {
        Game.srcPath = "resources/"
        Game.fps = 60
        Game.dt = 0;
        Game.step = 1 / Game.fps
        Game.last = 0;
        Game.tileWidth = 52
        Game.tileHeight = 52
        Game.objCnt = 0;
        Game.now = 0;
    },

    InitLogic() {
        Game.BrickTexture = TilesFactory.CreateTexture(imagesStorage.Floor)
        Game.GrassTexture = TilesFactory.CreateTexture(imagesStorage.Wall)
        Game.Rock1Texture = TilesFactory.CreateTexture(imagesStorage.rocks1)
        Game.Rock2Texture= TilesFactory.CreateTexture(imagesStorage.rocks2)
        Game.Rock3Texture= TilesFactory.CreateTexture(imagesStorage.rocks3)
        Game.Rock4Texture= TilesFactory.CreateTexture(imagesStorage.rocks4)
        Game.GhostBox = BoxFactory.CreateKnightBox()
        Game.FireBallBox = BoxFactory.CreateFireBallBox()
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
            Game.dt -= Game.step
            Game.Update()
            Game.Collide();
            Game.camera.Update()
        }
        Game.Render();
        Game.last = Game.now;
        requestAnimationFrame(Game.Loop)
    },

    Update() {
        this.currentWorld.Update()
    },

    Collide() {
        this.currentWorld.currentRoom.collisionManager.collide();
    },

    Render() {
        this.currentWorld.render()
    }
};

Game.InitConfig();
ResourceLoader.setCallback(Game.InitLogic)
ResourceLoader.InitResourceRep(imagesStorage, Game.srcPath, imagesSrc)
