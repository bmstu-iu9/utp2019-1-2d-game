'use strict'

let canvas = document.getElementById("canvas")
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
canvas.clickPositionX = 0;
canvas.clickPositionY = 0;
let ctx = canvas.getContext("2d", {alpha: false})

let imagesStorage = {}
let textureStorage = {}
let soundStorage = {}

let imagesSrc = [
    'angle_tent1.png',
    'angle_tent2.png',
    'barrels.png',
    'bench.png',
    'big_birch.png',
    'big_oak.png',
    'big_tent.png',
    'blood.png',
    'blood2.png',
    'branches.png',
    'branches2.png',
    'bush1.png',
    'bush2.png',
    'cage.png',
    'cart.png',
    'carrot1.png',
    'carrot2.png',
    'carrot3.png',
    'cart2.png',
    'cart3.png',
    'cart4.png',
    'cart5.png',
    'castle.png',
    'cave_enter.png',
    'circle.png',
    'column.png',
    'cross.png',
    'deadwood1.png',
    'deadwood2.png',
    'deadwood3.png',
    'deadwood4.png',
    'deadwood5.png',
    'deadwood6.png',
    'deadwood7.png',
    'dead_npc1.png',
    'dead_npc2.png',
    'dirtB1.png',
    'dirtB2.png',
    'dirtB3.png',
    'dirtL1.png',
    'dirtL2.png',
    'dirtL3.png',
    'dirtR1.png',
    'dirtR2.png',
    'dirtR3.png',
    'dirtT1.png',
    'dirtT2.png',
    'dirtT3.png',
    'dead_dirt.png',
    'dead_people.png',
    'dead_people2.png',
    'drunk_human.png',
    'dungeon_enter.png',
    'dungeon_column_left.png',
    'dungeon_column_middle.png',
    'dungeon_column_right.png',
    'dungeon_floor1.png',
    'dungeon_floor2.png',
    'dungeon_floor3.png',
    'dungeon_floor4.png',
    'dungeon_wall_right.png',
    'dungeon_wall_left.png',
    'dungeon_wall1.png',
    'enter.png',
    'explosion.png',
    'f1.png',
    'f2.png',
    'f3.png',
    'fence1.png',
    'fence2.png',
    'fence3.png',
    'fence4.png',
    'fence5.png',
    'fence6.png',
    'fence7.png',
    'fence8.png',
    'fire_ball.png',
    'Floor.png',
    'ghost_shriek.png',
    'gate.png',
    'garbage1.png',
    'garbage2.png',
    'garbage3.png',
    'garbage4.png',
    'garbage5.png',
    'grass_dirt.png',
    'grass1.png',
    'grass2.png',
    'grass3.png',
    'ground1.png',
    'ground2.png',
    'house1.png',
    'house2.png',
    'house3.png',
    'house4.png',
    'house5.png',
    'house6.png',
    'house7.png',
    'house8.png',
    'house9.png',
    'hp_bar_background.png',
    'hp_bar_overlay.png',
    'knight.png',
    'lattice.png',
    'lattice2.png',
    'lightning.png',
    'luke.png',
    'luke2.png',
    'medium_birch.png',
    'medium_oak.png',
    'metal_door.png',
    'mushrooms.png',
    'necropolis.png',
    'necropolis2.png',
    'necropolis3.png',
    'necropolis_dirt.png',
    'necropolis_dirt2.png',
    'necropolis_floor.png',
    'nicropolis_tree.png',
    'nicropolis_tree2.png',
    'paving.png',
    'rocks1.png',
    'rocks2.png',
    'rocks3.png',
    'rocks4.png',
    'shop.png',
    'shed.png',
    'skeleton1.png',
    'skeleton2.png',
    'skeleton3.png',
    'skeleton4.png',
    'small_birch.png',
    'small_oak.png',
    'small_tent.png',
    'state.png',
    'table.png',
    'tent1.png',
    'tent2.png',
    'tent3.png',
    'tent4.png',
    'tomb.png',
    'tomb2.png',
    'tombstone1.png',
    'tombstone2.png',
    'tombstone3.png',
    'tombstone4.png',
    'tombstone5.png',
    'tombstone6.png',
    'tombstone7.png',
    'tombstone8.png',
    'tombstone9.png',
    'tombstone10.png',
    'tombstone11.png',
    'tree.png',
    'trap.png',
    'trap2.png',
    'trap3.png',
    'trap4.png',
    'trap5.png',
    'tumble_tree1.png',
    'tumble_tree2.png',
    'tumble_tree3.png',
    'tumble_tree4.png',
    'wardrobe.png',
    'wardrobe2.png',
    'wall_NW.png',
    'wall_NE.png',
    'wall_SW.png',
    'wall_SE.png',
    'Wall.png',
    'wall2.png',
    'well.png',
    'lightning.png',
    'HPBottle.png',
    'ManaBottle.png',
    'Sword.png',
    'enemy_knight.png',
    'ghost_knight.png',
    'Levelup.png'
];

const sounds = [
    'HitSound.wav',
    'FireballExplosion.wav',
    'FireballCast.wav',
    'BackgroundSound.mp3',
    'Last.mp3',
]

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
        Game.result = []
    },

    InitLogic() {
        Game.AngleTentTexture1 = TilesFactory.CreateTexture(imagesStorage.angle_tent1)
        Game.AngleTentTexture2 = TilesFactory.CreateTexture(imagesStorage.angle_tent2)
        Game.Barrels = TilesFactory.CreateTexture(imagesStorage.barrels)
        Game.Bench = TilesFactory.CreateTexture(imagesStorage.bench)
        Game.BigBirchTexture = TilesFactory.CreateTexture(imagesStorage.big_birch)
        Game.BigOakTexture = TilesFactory.CreateTexture(imagesStorage.big_oak)
        Game.BigTentTexture = TilesFactory.CreateTexture(imagesStorage.big_tent)
        Game.Blood = TilesFactory.CreateTexture(imagesStorage.blood)
        Game.Blood2 = TilesFactory.CreateTexture(imagesStorage.blood2)
        Game.BranchesTexture1 = TilesFactory.CreateTexture(imagesStorage.branches)
        Game.BranchesTexture2 = TilesFactory.CreateTexture(imagesStorage.branches2)
        Game.Bush1Texture = TilesFactory.CreateTexture(imagesStorage.bush1)
        Game.Bush2Texture = TilesFactory.CreateTexture(imagesStorage.bush2)
        Game.Cage = TilesFactory.CreateTexture(imagesStorage.cage)
        Game.Carrot1 = TilesFactory.CreateTexture(imagesStorage.carrot1)
        Game.Carrot2 = TilesFactory.CreateTexture(imagesStorage.carrot2)
        Game.Carrot3 = TilesFactory.CreateTexture(imagesStorage.carrot3)
        Game.Cart = TilesFactory.CreateTexture(imagesStorage.cart)
        Game.Cart2 = TilesFactory.CreateTexture(imagesStorage.cart2)
        Game.Cart3 = TilesFactory.CreateTexture(imagesStorage.cart3)
        Game.Cart4 = TilesFactory.CreateTexture(imagesStorage.cart4)
        Game.Cart5 = TilesFactory.CreateTexture(imagesStorage.cart5)
        Game.Castle = TilesFactory.CreateTexture(imagesStorage.castle)
        Game.CaveEnterTexture = TilesFactory.CreateTexture(imagesStorage.cave_enter)
        Game.Column = TilesFactory.CreateTexture(imagesStorage.column)
        Game.Circle = TilesFactory.CreateTexture(imagesStorage.circle)
        Game.CrossTexture = TilesFactory.CreateTexture(imagesStorage.cross)
        Game.DeadWood1Texture = TilesFactory.CreateTexture(imagesStorage.deadwood1)
        Game.DeadWood2Texture = TilesFactory.CreateTexture(imagesStorage.deadwood2)
        Game.DeadWood3Texture = TilesFactory.CreateTexture(imagesStorage.deadwood3)
        Game.DeadWood4Texture = TilesFactory.CreateTexture(imagesStorage.deadwood4)
        Game.DeadWood5Texture = TilesFactory.CreateTexture(imagesStorage.deadwood5)
        Game.DeadWood6Texture = TilesFactory.CreateTexture(imagesStorage.deadwood6)
        Game.DeadWood7Texture = TilesFactory.CreateTexture(imagesStorage.deadwood7)
        Game.DeadDirt = TilesFactory.CreateTexture(imagesStorage.dead_dirt)
        Game.DeadNpc1 = TilesFactory.CreateTexture(imagesStorage.dead_npc1)
        Game.DeadNpc2 = TilesFactory.CreateTexture(imagesStorage.dead_npc2)
        Game.DirtTextureB1 = TilesFactory.CreateTexture(imagesStorage.dirtB1)
        Game.DirtTextureB2 = TilesFactory.CreateTexture(imagesStorage.dirtB2)
        Game.DirtTextureB3 = TilesFactory.CreateTexture(imagesStorage.dirtB3)
        Game.DirtTextureL1 = TilesFactory.CreateTexture(imagesStorage.dirtL1)
        Game.DirtTextureL2 = TilesFactory.CreateTexture(imagesStorage.dirtL2)
        Game.DirtTextureL3 = TilesFactory.CreateTexture(imagesStorage.dirtL3)
        Game.DirtTextureR1 = TilesFactory.CreateTexture(imagesStorage.dirtR1)
        Game.DirtTextureR2 = TilesFactory.CreateTexture(imagesStorage.dirtR2)
        Game.DirtTextureR3 = TilesFactory.CreateTexture(imagesStorage.dirtR3)
        Game.DirtTextureT1 = TilesFactory.CreateTexture(imagesStorage.dirtT1)
        Game.DirtTextureT2 = TilesFactory.CreateTexture(imagesStorage.dirtT2)
        Game.DirtTextureT3 = TilesFactory.CreateTexture(imagesStorage.dirtT3)
        Game.DrunkHuman = TilesFactory.CreateTexture(imagesStorage.drunk_human)
        Game.DeadPeople = TilesFactory.CreateTexture(imagesStorage.dead_people)
        Game.DeadPeople2 = TilesFactory.CreateTexture(imagesStorage.dead_people2)
        Game.DungeonEnterTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_enter)
        Game.DungeonColumnLeftTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_column_left)
        Game.DungeonColumnMiddleTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_column_middle)
        Game.DungeonColumnRightTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_column_right)
        Game.DungeonFloorTexture1 = TilesFactory.CreateTexture(imagesStorage.dungeon_floor1)
        Game.DungeonFloorTexture2 = TilesFactory.CreateTexture(imagesStorage.dungeon_floor2)
        Game.DungeonFloorTexture3 = TilesFactory.CreateTexture(imagesStorage.dungeon_floor3)
        Game.DungeonFloorTexture4 = TilesFactory.CreateTexture(imagesStorage.dungeon_floor4)
        Game.DungeonWallLeftTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_wall_right)
        Game.DungeonWallRightTexture = TilesFactory.CreateTexture(imagesStorage.dungeon_wall_left)
        Game.DungeonWallTexture1 = TilesFactory.CreateTexture(imagesStorage.dungeon_wall1)
        Game.BrickTexture = TilesFactory.CreateTexture(imagesStorage.Floor)
        Game.Garbage1 = TilesFactory.CreateTexture(imagesStorage.garbage1)
        Game.Garbage2 = TilesFactory.CreateTexture(imagesStorage.garbage2)
        Game.Garbage3 = TilesFactory.CreateTexture(imagesStorage.garbage3)
        Game.Garbage4 = TilesFactory.CreateTexture(imagesStorage.garbage4)
        Game.Garbage5 = TilesFactory.CreateTexture(imagesStorage.garbage5)
        Game.GrassDirt = TilesFactory.CreateTexture(imagesStorage.grass_dirt)
        Game.GrassTexture1 = TilesFactory.CreateTexture(imagesStorage.grass1)
        Game.GrassTexture2 = TilesFactory.CreateTexture(imagesStorage.grass2)
        Game.GrassTexture3 = TilesFactory.CreateTexture(imagesStorage.grass3)
        Game.GroundTexture = TilesFactory.CreateTexture(imagesStorage.ground1)
        Game.GroundTexture2 = TilesFactory.CreateTexture(imagesStorage.ground2)
        Game.House1Texture = TilesFactory.CreateTexture(imagesStorage.house1)
        Game.EnterTexture = TilesFactory.CreateTexture(imagesStorage.enter)
        Game.F1 = TilesFactory.CreateTexture(imagesStorage.f1)
        Game.F2 = TilesFactory.CreateTexture(imagesStorage.f2)
        Game.F3 = TilesFactory.CreateTexture(imagesStorage.f3)
        Game.FenceTexture1 = TilesFactory.CreateTexture(imagesStorage.fence1)
        Game.FenceTexture2 = TilesFactory.CreateTexture(imagesStorage.fence2)
        Game.FenceTexture3 = TilesFactory.CreateTexture(imagesStorage.fence3)
        Game.FenceTexture4 = TilesFactory.CreateTexture(imagesStorage.fence4)
        Game.FenceTexture5 = TilesFactory.CreateTexture(imagesStorage.fence5)
        Game.FenceTexture6 = TilesFactory.CreateTexture(imagesStorage.fence6)
        Game.FenceTexture7 = TilesFactory.CreateTexture(imagesStorage.fence7)
        Game.FenceTexture8 = TilesFactory.CreateTexture(imagesStorage.fence8)
        Game.Gate = TilesFactory.CreateTexture(imagesStorage.gate)
        Game.House1Texture = TilesFactory.CreateTexture(imagesStorage.house1)
        Game.House2Texture = TilesFactory.CreateTexture(imagesStorage.house2)
        Game.House3Texture = TilesFactory.CreateTexture(imagesStorage.house3)
        Game.House4Texture = TilesFactory.CreateTexture(imagesStorage.house4)
        Game.House5Texture = TilesFactory.CreateTexture(imagesStorage.house5)
        Game.House6Texture = TilesFactory.CreateTexture(imagesStorage.house6)
        Game.House7Texture = TilesFactory.CreateTexture(imagesStorage.house7)
        Game.House8Texture = TilesFactory.CreateTexture(imagesStorage.house8)
        Game.House9Texture = TilesFactory.CreateTexture(imagesStorage.house9)
        Game.HealthBarBackgroudTexture = TilesFactory.CreateTexture(imagesStorage.hp_bar_background)
        Game.HealthBarOverlayTexture = TilesFactory.CreateTexture(imagesStorage.hp_bar_overlay)
        Game.Lattice = TilesFactory.CreateTexture(imagesStorage.lattice)
        Game.Lattice2 = TilesFactory.CreateTexture(imagesStorage.lattice2)
        Game.LukeTexture = TilesFactory.CreateTexture(imagesStorage.luke)
        Game.LukeTexture2 = TilesFactory.CreateTexture(imagesStorage.luke2)
        Game.MediumBirchTexture = TilesFactory.CreateTexture(imagesStorage.medium_birch)
        Game.MediumOakTexture = TilesFactory.CreateTexture(imagesStorage.medium_oak)
        Game.MetalDoorTexture = TilesFactory.CreateTexture(imagesStorage.metal_door)
        Game.MushroomsTexture = TilesFactory.CreateTexture(imagesStorage.mushrooms)
        Game.NecropolisTexture = TilesFactory.CreateTexture(imagesStorage.necropolis)
        Game.NecropolisTexture2 = TilesFactory.CreateTexture(imagesStorage.necropolis2)
        Game.NecropolisTexture3 = TilesFactory.CreateTexture(imagesStorage.necropolis3)
        Game.NecropolisTextureDirt = TilesFactory.CreateTexture(imagesStorage.necropolis_dirt)
        Game.NecropolisTextureDirt2 = TilesFactory.CreateTexture(imagesStorage.necropolis_dirt2)
        Game.NecropolisFloor = TilesFactory.CreateTexture(imagesStorage.necropolis_floor)
        Game.NecropolisTree = TilesFactory.CreateTexture(imagesStorage.nicropolis_tree)
        Game.NecropolisTree2 = TilesFactory.CreateTexture(imagesStorage.nicropolis_tree2)
        Game.Paving = TilesFactory.CreateTexture(imagesStorage.paving)
        Game.RocksTexture1 = TilesFactory.CreateTexture(imagesStorage.rocks1)
        Game.RocksTexture2 = TilesFactory.CreateTexture(imagesStorage.rocks2)
        Game.RocksTexture3 = TilesFactory.CreateTexture(imagesStorage.rocks3)
        Game.RocksTexture4 = TilesFactory.CreateTexture(imagesStorage.rocks4)
        Game.Shed = TilesFactory.CreateTexture(imagesStorage.shed)
        Game.Shop = TilesFactory.CreateTexture(imagesStorage.shop)
        Game.Skeleton1 = TilesFactory.CreateTexture(imagesStorage.skeleton1)
        Game.Skeleton2 = TilesFactory.CreateTexture(imagesStorage.skeleton2)
        Game.Skeleton3 = TilesFactory.CreateTexture(imagesStorage.skeleton3)
        Game.Skeleton4 = TilesFactory.CreateTexture(imagesStorage.skeleton4)
        Game.SmallBirchTexture = TilesFactory.CreateTexture(imagesStorage.small_birch)
        Game.SmallOakTexture = TilesFactory.CreateTexture(imagesStorage.small_oak)
        Game.SmallTentTexture = TilesFactory.CreateTexture(imagesStorage.small_tent)
        Game.State = TilesFactory.CreateTexture(imagesStorage.state)
        Game.Table = TilesFactory.CreateTexture(imagesStorage.table)
        Game.Tent1 = TilesFactory.CreateTexture(imagesStorage.tent1)
        Game.Tent2 = TilesFactory.CreateTexture(imagesStorage.tent2)
        Game.Tent3 = TilesFactory.CreateTexture(imagesStorage.tent3)
        Game.Tent4 = TilesFactory.CreateTexture(imagesStorage.tent4)
        Game.Tomb1 = TilesFactory.CreateTexture(imagesStorage.tomb)
        Game.Tomb2 = TilesFactory.CreateTexture(imagesStorage.tomb2)
        Game.TombstoneTexture1 = TilesFactory.CreateTexture(imagesStorage.tombstone1)
        Game.TombstoneTexture2 = TilesFactory.CreateTexture(imagesStorage.tombstone2)
        Game.TombstoneTexture3 = TilesFactory.CreateTexture(imagesStorage.tombstone3)
        Game.TombstoneTexture4 = TilesFactory.CreateTexture(imagesStorage.tombstone4)
        Game.TombstoneTexture5 = TilesFactory.CreateTexture(imagesStorage.tombstone5)
        Game.TombstoneTexture6 = TilesFactory.CreateTexture(imagesStorage.tombstone6)
        Game.TombstoneTexture7 = TilesFactory.CreateTexture(imagesStorage.tombstone7)
        Game.TombstoneTexture8 = TilesFactory.CreateTexture(imagesStorage.tombstone8)
        Game.TombstoneTexture9 = TilesFactory.CreateTexture(imagesStorage.tombstone9)
        Game.TombstoneTexture10 = TilesFactory.CreateTexture(imagesStorage.tombstone10)
        Game.TombstoneTexture11 = TilesFactory.CreateTexture(imagesStorage.tombstone11)
        Game.TreeTexture = TilesFactory.CreateTexture(imagesStorage.tree)
        Game.Trap = TilesFactory.CreateTexture(imagesStorage.trap)
        Game.Trap2 = TilesFactory.CreateTexture(imagesStorage.trap2)
        Game.Trap3 = TilesFactory.CreateTexture(imagesStorage.trap3)
        Game.Trap4 = TilesFactory.CreateTexture(imagesStorage.trap4)
        Game.Trap5 = TilesFactory.CreateTexture(imagesStorage.trap5)
        Game.TumbleTree1Texture = TilesFactory.CreateTexture(imagesStorage.tumble_tree1)
        Game.TumbleTree2Texture = TilesFactory.CreateTexture(imagesStorage.tumble_tree2)
        Game.TumbleTree3Texture = TilesFactory.CreateTexture(imagesStorage.tumble_tree3)
        Game.TumbleTree4Texture = TilesFactory.CreateTexture(imagesStorage.tumble_tree4)
        Game.DungeonWallNETexture = TilesFactory.CreateTexture(imagesStorage.wall_NE)
        Game.DungeonWallNWTexture = TilesFactory.CreateTexture(imagesStorage.wall_NW)
        Game.DungeonWallSETexture = TilesFactory.CreateTexture(imagesStorage.wall_SE)
        Game.DungeonWallSWTexture = TilesFactory.CreateTexture(imagesStorage.wall_SW)
        Game.DungeonWallTexture = TilesFactory.CreateTexture(imagesStorage.wall2)
        Game.DungeonWallTexture2 = TilesFactory.CreateTexture(imagesStorage.Wall)
        Game.Wardrobe = TilesFactory.CreateTexture(imagesStorage.wardrobe)
        Game.Wardrobe2 = TilesFactory.CreateTexture(imagesStorage.wardrobe2)
        Game.WellTexture = TilesFactory.CreateTexture(imagesStorage.well)
        Game.HPBottle = TilesFactory.CreateTexture(imagesStorage.HPBottle)
        Game.ManaBottle = TilesFactory.CreateTexture(imagesStorage.ManaBottle)
        Game.Sword = TilesFactory.CreateTexture(imagesStorage.Sword)
        Game.Levelup = TilesFactory.CreateTexture(imagesStorage.Levelup)
        Game.GhostBox = BoxFactory.CreateKnightBox()
        Game.EnemyKnightBox = BoxFactory.CreateEnemyKnightBox()
        Game.GhostKnightBox = BoxFactory.CreateGhostKnightBox()
        Game.FireBallBox = BoxFactory.CreateFireBallBox()
        Game.LightningBox = BoxFactory.CreateLigthningBox()
        Game.BackgroundSound = soundStorage.BackgroundSound
        Game.BackgroundSound.loop=true
        Game.BackgroundSound.volume -= 0.98
        Game.HitSound = soundStorage.HitSound
        Game.FireballCast = soundStorage.FireballCast
        Game.FireballExplosion = soundStorage.FireballExplosion
        Game.Last = soundStorage.Last
        Game.HitSound.volume -= 0.9
        Game.HitSound.playbackRate = 0.85
        Game.FireballCast.volume -= 0.95
        Game.FireballExplosion.volume -= 0.95
        Game.FireballExplosion.playbackRate = 1.5
        Game.Last.volume -= 0.95
        Game.camera = new Camera(canvas.width, canvas.height)

        Game.currentWorld = WorldFactory.CreateTestWorld()
        Game.barControler = new BarControler(Game.player)
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
            Game.barControler.update()
            Game.Collide();
            Game.camera.Update()
        }
        Game.Render();
        Game.last = Game.now;
        //console.log(mouse.clickPosition.add(Game.camera.position, new Vector2d()))
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
ResourceLoader.setCallback(Game.InitLogic)
ResourceLoader.loadSounds(soundStorage, sounds)
ResourceLoader.InitResourceRep(imagesStorage, Game.srcPath, imagesSrc)
