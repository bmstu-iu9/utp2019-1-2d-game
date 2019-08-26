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
    //'fire_ball.png'
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
            Game.dt = Game.dt - Game.step
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
        this.currentWorld.currentRoom.collide()
    },

    Render() {
        this.currentWorld.render()
    }
};

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
graph.add(89, 120)
graph.addEdge(6, 2)
graph.addEdge(6,3)
let first = new Vector2d(106, 100)
let last = new Vector2d(89, 120)
let mesh = new NavMesh(graph, 120, 120)
let ai = new AIManager()
mesh.savePath(first, last, ai)
Game.InitConfig()
ResourceLoader.setCallback(Game.InitLogic)
ResourceLoader.InitResourceRep(imagesStorage, Game.srcPath, imagesSrc)