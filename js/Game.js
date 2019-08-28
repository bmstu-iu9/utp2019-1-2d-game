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
    'wall2.png',
    'fire_ball.png',
    'rocks1.png',
    'rocks2.png',
    'rocks3.png',
    'rocks4.png',
    'dungeon_wall_right.png',
    'dungeon_wall_left.png',
    'wall_NW.png',
    'wall_NE.png',
    'wall_SW.png',
    'wall_SE.png',
    'lightning.png',

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
        Game.DungeonWallTexture = TilesFactory.CreateTexture(imagesStorage.wall2)
        Game.Rock1Texture = TilesFactory.CreateTexture(imagesStorage.rocks1)
        Game.Rock2Texture= TilesFactory.CreateTexture(imagesStorage.rocks2)
        Game.Rock3Texture= TilesFactory.CreateTexture(imagesStorage.rocks3)
        Game.Rock4Texture= TilesFactory.CreateTexture(imagesStorage.rocks4)
        Game.DungeonWallLeftTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_wall_right)
        Game.DungeonWallRightTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_wall_left)
        Game.DungeonWallNWTexture = TilesFactory.CreateTexture(imagesStorage.wall_NW)
        Game.DungeonWallNETexture = TilesFactory.CreateTexture(imagesStorage.wall_NE)
        Game.DungeonWallSWTexture = TilesFactory.CreateTexture(imagesStorage.wall_SW)
        Game.DungeonWallSETexture = TilesFactory.CreateTexture(imagesStorage.wall_SE)
        Game.GhostBox = BoxFactory.CreateKnightBox()
        Game.FireBallBox = BoxFactory.CreateFireBallBox()
        Game.LightningBox = BoxFactory.CreateLigthningBox()
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
        if (keyboard.KeyZ === true)
            SaveLoad.save()
        if (keyboard.KeyX === true)
            SaveLoad.load()
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

Game.InitConfig()
let graph = new Graph()
graph.add(100, 100)
graph.add(110, 110)
graph.add(90, 100)
graph.add(90, 110)
graph.add(110, 90)
graph.add(100, 110)
graph.addEdge(0, 1)
graph.addEdge(0, 2)
graph.addEdge(0, 3)
graph.addEdge(0, 4)
graph.addEdge(0, 5)
graph.addEdge(3, 5)
graph.addEdge(5, 1)
graph.addEdge(2, 4)
graph.addEdge(1, 4)
graph.addEdge(2, 3)
graph.add(80, 120)
graph.addEdge(6, 2)
graph.addEdge(6,3)
let first = new Vector2d(106, 100)
let last = new Vector2d(95, 105)
let mesh = new NavMesh(graph, 120, 120)
let ai = new AIManager()
mesh.savePath(first, last, ai)
ResourceLoader.setCallback(Game.InitLogic)
ResourceLoader.InitResourceRep(imagesStorage, Game.srcPath, imagesSrc)