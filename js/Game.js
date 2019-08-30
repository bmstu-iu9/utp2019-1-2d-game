'use strict'

let canvas = document.getElementById("canvas")
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
let ctx = canvas.getContext("2d", { alpha: false })

let imagesStorage = {}
let textureStorage = {}


let imagesSrc = [
    'big_birch.png',
    'big_oak.png',
    'big_tent.png',
    'branches.png',
    'branches2.png',
    'bush1.png',
    'bush2.png',
    'cave_enter.png',
    'cross.png',
    'deadwood1.png',
    'deadwood2.png',
    'deadwood3.png',
    'dungeon_column_left.png',
    'dungeon_column_middle.png',
    'dungeon_column_right.png',
    'dungeon_floor1.png',
    'dungeon_wall_right.png',
    'dungeon_wall_left.png',
    'dungeon_wall1.png',
    'explosion.png',
    'fire_ball.png',
    'Floor.png',
    'ghost_shriek.png',
    'grass1.png',
    'grass2.png',
    'grass3.png',
    'ground1.png',
    'hp_bar_background.png',
    'hp_bar_overlay.png',
    'knight.png',
    'lightning.png',
    'luke.png',
    'medium_birch.png',
    'medium_oak.png',
    'metal_door.png',
    'mushrooms.png',
    'rocks1.png',
    'rocks2.png',
    'rocks3.png',
    'rocks4.png',
    'small_birch.png',
    'small_oak.png',
    'small_tent.png',
    'tombstone1.png',
    'tombstone2.png',
    'tree.png',
    'wall_NW.png',
    'wall_NE.png',
    'wall_SW.png',
    'wall_SE.png',
    'Wall.png',
    'wall2.png',
    'well.png',

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
        Game.BigBirchTexture = TilesFactory.CreateTexture(imagesStorage.big_birch)
        Game.BigOakTexture = TilesFactory.CreateTexture(imagesStorage.big_oak)
        Game.BigTentTexture = TilesFactory.CreateTexture(imagesStorage.big_tent)
        Game.BranchesTexture1 = TilesFactory.CreateTexture(imagesStorage.branches)
        Game.BranchesTexture2 = TilesFactory.CreateTexture(imagesStorage.branches2)
        Game.Bush1Texture = TilesFactory.CreateTexture(imagesStorage.bush1)
        Game.Bush2Texture = TilesFactory.CreateTexture(imagesStorage.bush2)
        Game.CaveEnterTexture = TilesFactory.CreateTexture(imagesStorage.cave_enter)
        Game.CrossTexture = TilesFactory.CreateTexture(imagesStorage.cross)
        Game.DeadWood1Texture = TilesFactory.CreateTexture(imagesStorage.deadwood1)
        Game.DeadWood2Texture = TilesFactory.CreateTexture(imagesStorage.deadwood2)
        Game.DeadWood3Texture = TilesFactory.CreateTexture(imagesStorage.deadwood3)
        Game.DungeonColumnLeftTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_column_left)
        Game.DungeonColumnMiddleTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_column_middle)
        Game.DungeonColumnRightTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_column_right)
        Game.DungeonFloorTexture1 = TilesFactory.CreateTexture(imagesStorage.dungeon_floor1)
        Game.DungeonWallLeftTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_wall_right)
        Game.DungeonWallRightTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_wall_left)
        Game.DungeonWallTexture1 =  TilesFactory.CreateTexture(imagesStorage.dungeon_wall1)
        Game.BrickTexture = TilesFactory.CreateTexture(imagesStorage.Floor)
        Game.GrassTexture1 = TilesFactory.CreateTexture(imagesStorage.grass1)
        Game.GrassTexture2 = TilesFactory.CreateTexture(imagesStorage.grass2)
        Game.GrassTexture3 = TilesFactory.CreateTexture(imagesStorage.grass3)
        Game.GroundTexture =  TilesFactory.CreateTexture(imagesStorage.ground1)
        Game.HealthBarBackgroudTexture = TilesFactory.CreateTexture(imagesStorage.hp_bar_background)
        Game.HealthBarOverlayTexture = TilesFactory.CreateTexture(imagesStorage.hp_bar_overlay)
        Game.LukeTexture = TilesFactory.CreateTexture(imagesStorage.luke)
        Game.MediumBirchTexture = TilesFactory.CreateTexture(imagesStorage.medium_birch)
        Game.MediumOakTexture = TilesFactory.CreateTexture(imagesStorage.medium_oak)
        Game.MetalDoorTexture = TilesFactory.CreateTexture(imagesStorage.metal_door)
        Game.MushroomsTexture = TilesFactory.CreateTexture(imagesStorage.mushrooms)
        Game.RocksTexture1 = TilesFactory.CreateTexture(imagesStorage.rocks1)
        Game.RocksTexture2 = TilesFactory.CreateTexture(imagesStorage.rocks2)
        Game.RocksTexture3 = TilesFactory.CreateTexture(imagesStorage.rocks3)
        Game.RocksTexture4 = TilesFactory.CreateTexture(imagesStorage.rocks4)
        Game.SmallBirchTexture = TilesFactory.CreateTexture(imagesStorage.small_birch)
        Game.SmallOakTexture = TilesFactory.CreateTexture(imagesStorage.small_oak)
        Game.SmallTentTexture = TilesFactory.CreateTexture(imagesStorage.small_tent)
        Game.TombstoneTexture1 = TilesFactory.CreateTexture(imagesStorage.tombstone1)
        Game.TombstoneTexture2 = TilesFactory.CreateTexture(imagesStorage.tombstone2)
        Game.TreeTexture = TilesFactory.CreateTexture(imagesStorage.tree)
        Game.DungeonWallNETexture = TilesFactory.CreateTexture(imagesStorage.wall_NE)
        Game.DungeonWallNWTexture = TilesFactory.CreateTexture(imagesStorage.wall_NW)
        Game.DungeonWallSETexture = TilesFactory.CreateTexture(imagesStorage.wall_SE)
        Game.DungeonWallSWTexture = TilesFactory.CreateTexture(imagesStorage.wall_SW)
        Game.DungeonWallTexture1 = TilesFactory.CreateTexture(imagesStorage.Wall)
        Game.DungeonWallTexture2 = TilesFactory.CreateTexture(imagesStorage.wall2)
        Game.WellTexture = TilesFactory.CreateTexture(imagesStorage.well)
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

Game.InitConfig();
ResourceLoader.setCallback(Game.InitLogic)
ResourceLoader.InitResourceRep(imagesStorage, Game.srcPath, imagesSrc)
