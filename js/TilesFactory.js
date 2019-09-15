'use strict';

class TilesFactory {

    /**
     *
     * @param {Image} img
     */

    static CreateTexture(img) {
        let obj = new Texture(img);
        textureStorage[img.src] = obj
        return obj
    }

    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */

    static CreateRock(x = 0, y = 0) {
        let src = [Game.RocksTexture1, Game.RocksTexture2, Game.RocksTexture3, Game.RocksTexture4]
        return new StaticObject(x, y, x, y, new DrawableObject("middleground", src[~~(Math.random() * 3)]));
    }

    static CreateRandomGrass(x = 0, y = 0) {
      let src = [Game.GrassTexture1, Game.GrassTexture2, Game.GrassTexture3]
      return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
    }

    static CreateRandomDirtGrassT(x = 0, y = 0) {
      let src = [Game.DirtTextureB1, Game.DirtTextureB2, Game.DirtTextureB3]
      return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
    }

    static CreateRandomDirtGrassR(x = 0, y = 0) {
      let src = [Game.DirtTextureL1, Game.DirtTextureL2, Game.DirtTextureL3]
      return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
    }

    static CreateRandomDirtGrassB(x = 0, y = 0) {
      let src = [Game.DirtTextureT1, Game.DirtTextureT2, Game.DirtTextureT3]
      return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
    }

    static CreateRandomDirtGrassL(x = 0, y = 0) {
      let src = [Game.DirtTextureR1, Game.DirtTextureR2, Game.DirtTextureR3]
      return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
    }

    static CreateForest(x = 0, y = 0) {
      return TilesFactory.createTile(x, y, ~~(Game.TreeTexture.width / 4), ~~(Game.TreeTexture.height / 5), new DrawableObject("middleground", Game.TreeTexture), "Bot")
    }

    static CreateBigForest(x = 0, y = 0) {
      let src = [Game.BigOakTexture, Game.BigBirchTexture]
      return TilesFactory.createTile(x, y, ~~(Game.TreeTexture.width / 4), ~~(Game.TreeTexture.height / 5), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    static CreateMediumForest(x = 0,y = 0) {
      let src = [Game.MediumOakTexture, Game.MediumBirchTexture]
      return TilesFactory.createTile(x, y, ~~(Game.MediumOakTexture.width / 2), ~~(Game.MediumOakTexture.height / 5), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    static CreateSmallForest(x = 0,y = 0) {
      let src = [Game.SmallOakTexture, Game.SmallBirchTexture]
      return TilesFactory.createTile(x, y, ~~(Game.SmallBirchTexture.width / 3), ~~(Game.SmallBirchTexture.height / 4), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    /**
     * Порождает и Player по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreatePlayer(x = 0, y = 0) {
        let stats = new Stats(150, 200)
        let player = TilesFactory.createNPC(x, y, 24, new DrawableObject("middleground", SpriteFactory.CreateTestSprite()), stats);
        player.manager = new PlayerManager(player)
        player.type = "player"
        return player
    }

    /**
     * Порождает и NPC по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreateStaticNPC(x, y, nav) {
        let t = TilesFactory.createNPC(x, y, 22, new DrawableObject("middleground", SpriteFactory.CreateTestSprite()))
        t.manager = new AIManager(t, nav)
        t.type = "staticNpc"
        return t
    }

    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */

    static CreateBigBirch(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.BigBirchTexture.width / 2), ~~(Game.BigBirchTexture.height / 4), new DrawableObject("middleground", Game.BigBirchTexture), "Bot")
    }

    static CreateBigOak(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.BigOakTexture.width / 2), ~~(Game.BigOakTexture.height / 5), new DrawableObject("middleground", Game.BigOakTexture), "Bot")
    }

    static CreateBigTent(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.BigTentTexture.width, ~~(Game.BigTentTexture.height / 4), new DrawableObject("middleground", Game.BigTentTexture), "Bot")
    }

    static CreateBranchesTexture1(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.BranchesTexture1.width, Game.BranchesTexture1.height / 4, new DrawableObject("middleground", Game.BranchesTexture1), "Bot")
    }

    static CreateBranchesTexture2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.BranchesTexture2.width, Game.BranchesTexture2.height / 4, new DrawableObject("middleground", Game.BranchesTexture2), "Bot")
    }

    static CreateBush1(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.Bush1Texture.width, ~~(Game.Bush1Texture.height / 6), new DrawableObject("middleground", Game.Bush1Texture), "Bot")
    }

    static CreateBush2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.Bush2Texture.width, ~~(Game.Bush2Texture.height / 6), new DrawableObject("middleground", Game.Bush2Texture), "Bot")
    }

    static CreateCaveEnter(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.CaveEnterTexture.width, ~~(Game.CaveEnterTexture.height / 3), new DrawableObject("middleground", Game.CaveEnterTexture), "Bot")
    }

    static CreateCross(x = 0, y = 0) {
        return TilesFactory.createMovableObj(x, y, Game.CrossTexture.width, ~~(Game.CrossTexture.height / 4), new DrawableObject("middleground", Game.CrossTexture), "Bot")
    }

    static CreateDeadWood1(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood1Texture.width, ~~(Game.DeadWood1Texture.height / 4), new DrawableObject("middleground", Game.DeadWood1Texture), "Bot")
    }

    static CreateDeadWood2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood2Texture.width, ~~(Game.DeadWood2Texture.height / 4), new DrawableObject("middleground", Game.DeadWood2Texture), "Bot")
    }
    static CreateDungeonWallRight(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 26, Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallLeftTexture),"RightBot")
    }

    static CreateDungeonColumnLeft(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DungeonColumnLeftTexture.width, ~~(Game.DungeonColumnLeftTexture.height / 5), new DrawableObject("middleground", Game.DungeonColumnLeftTexture), "RightBot")
    }

    static CreateDungeonColumnMiddle(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DungeonColumnMiddleTexture.width, ~~(Game.DungeonColumnMiddleTexture.height / 6), new DrawableObject("middleground", Game.DungeonColumnMiddleTexture), "Bot")
    }

    static CreateDeadWood3(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood3Texture.width, ~~(Game.DeadWood3Texture.height / 4), new DrawableObject("middleground", Game.DeadWood3Texture), "Bot")
    }

    static CreateDungeonColumnRight(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DungeonColumnRightTexture.width, ~~(Game.DungeonColumnRightTexture.height / 6), new DrawableObject("middleground", Game.DungeonColumnRightTexture), "LeftBot")
    }

    static CreateDungeonFloor1(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.DungeonFloorTexture1));
    }

    static CreateDungeonWallLeft(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 26, Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallRightTexture),"LeftBot")
    }
    static CreateDungeonWallNW(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallNWTexture),"RightBot")
    }

    static CreateDungeonWall2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.tileWidth, 26, new DrawableObject("middleground", Game.DungeonWallTexture2), "LeftBot")
    }

    static CreateDungeonWallNE(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallNETexture),"LeftBot")
    }
    static CreateDungeonWallSW(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallSWTexture),"LeftBot")
    }
    static CreateDungeonWallSE(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallSETexture),"RightBot")
    }
    static CreateDungeonWall(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, Game.tileWidth, 26, new DrawableObject("middleground", Game.DungeonWallTexture),"LeftBot")
    }

    static CreateDungeonFloorBrick(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.BrickTexture));
    }

    static CreateGrassTile1(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GrassTexture1));
    }

    static CreateGrassTile2(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GrassTexture2));
    }

    static CreateGrassTile3(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GrassTexture3));
    }

    static CreateGroundTile(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GroundTexture));
    }

    static CreateLukeTile(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.LukeTexture));
    }

    static CreateMediumBirch(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.MediumBirchTexture.width / 3), ~~(Game.MediumBirchTexture.height / 4), new DrawableObject("middleground", Game.MediumBirchTexture), "Bot")
    }

    static CreateMediumOak(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.MediumOakTexture.width / 2), ~~(Game.MediumOakTexture.height / 5), new DrawableObject("middleground", Game.MediumOakTexture), "Bot")
    }

    static CreateMetalDoor(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.MetalDoorTexture.width, ~~(Game.MetalDoorTexture.height / 4), new DrawableObject("middleground", Game.MetalDoorTexture), "Bot")
    }

    static CreateMushroomsTile(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.MushroomsTexture.width, ~~(Game.MushroomsTexture.height / 6), new DrawableObject("middleground", Game.MushroomsTexture), "Bot")
    }

    static CreateRocks1(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.RocksTexture1.width, ~~(Game.RocksTexture1.height / 3), new DrawableObject("middleground", Game.RocksTexture1), "Bot")
    }

    static CreateRocks2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.RocksTexture2.width, ~~(Game.RocksTexture2.height / 3), new DrawableObject("middleground", Game.RocksTexture2), "Bot")
    }

    static CreateRocks3(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.RocksTexture3.width, ~~(Game.RocksTexture3.height / 3), new DrawableObject("middleground", Game.RocksTexture3), "Bot")
    }

    static CreateRocks4(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.RocksTexture4.width, ~~(Game.RocksTexture4.height / 3), new DrawableObject("middleground", Game.RocksTexture4), "Bot")
    }

    static CreateSmallBirch(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.SmallBirchTexture.width / 3), ~~(Game.SmallBirchTexture.height / 4), new DrawableObject("middleground", Game.SmallBirchTexture), "Bot")
    }

    static CreateSmallOak(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.SmallOakTexture.width / 2), ~~(Game.SmallOakTexture.height / 5), new DrawableObject("middleground", Game.SmallOakTexture), "Bot")
    }

    static CreateSmallTent(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.SmallTentTexture.width, ~~(Game.SmallTentTexture.height / 4), new DrawableObject("middleground", Game.SmallTentTexture), "Bot")
    }

    static CreateTombstone1(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.TombstoneTexture1.width, ~~(Game.TombstoneTexture1.height / 4), new DrawableObject("middleground", Game.TombstoneTexture1), "Bot")
    }

    static CreateTombstone2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.TombstoneTexture2.width, ~~(Game.TombstoneTexture2.height / 4), new DrawableObject("middleground", Game.TombstoneTexture2), "Bot")
    }

    static CreateTree(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.TreeTexture.width / 4), ~~(Game.TreeTexture.height / 5), new DrawableObject("middleground", Game.TreeTexture), "Bot")
    }

    static CreateWell(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.WellTexture.width, ~~(Game.WellTexture.height / 5), new DrawableObject("middleground", Game.WellTexture), "Bot")
    }

    static CreateHPBottle(x=0, y=0){
        let first_aid_kit=TilesFactory.createMovableObj(x,y,Game.HPBottle.width,~~(Game.HPBottle.height/2),new DrawableObject("middleground",Game.HPBottle),"Bot")
        first_aid_kit.collisonSolveStrategy='hit'
        /**
         *
         * @param {Collision} collision
         */
        first_aid_kit.onCollide=(collision)=>{
            if (collision.obstacleObject.manager && collision.obstacleObject.manager instanceof PlayerManager){
                collision.obstacleObject.statsManager.gainAction(new Action(new Stats(50,0,0,0,0,0)))
                Game.currentWorld.currentRoom.delete(first_aid_kit)
            }
        }
        return first_aid_kit
    }

    static CreateManaBottle(x=0,y=0){
        let first_aid_kit=TilesFactory.createMovableObj(x,y,Game.ManaBottle.width,~~(Game.ManaBottle.height/2),new DrawableObject("middleground",Game.ManaBottle),"Bot")
        first_aid_kit.collisonSolveStrategy='hit'
        /**
         *
         * @param {Collision} collision
         */
        first_aid_kit.onCollide=(collision)=>{
            if (collision.obstacleObject.manager && collision.obstacleObject.manager instanceof PlayerManager){
                collision.obstacleObject.statsManager.gainAction(new Action(new Stats(0,50,0,0,0,0)))
                Game.currentWorld.currentRoom.delete(first_aid_kit)
            }
        }
        return first_aid_kit
    }

    static CreateAttackBonus(x=0,y=0){
        let sword=TilesFactory.createMovableObj(x,y,Game.Sword.width,~~(Game.Sword.height/2),new DrawableObject('middleground',Game.Sword),"Bot")
        sword.collisonSolveStrategy='hit'
        /**
         *
         * @param {Collision} collision
         */
        sword.onCollide=(collision)=>{
            if (collision.obstacleObject.manager && collision.obstacleObject.manager instanceof PlayerManager){
                let effect=new Effect(2)
                effect.prevStat=collision.obstacleObject.statsManager.stats.strenght
                /**
                 * @param {StatsManager} statsManager
                 * @param {Number} dt
                 */
                effect.update=function(statsManager,dt){
                    this.remainTime-=dt;
                    if (this.remainTime>0){
                        statsManager.stats.strenght=this.prevStat*2
                    }else statsManager.stats.strenght=this.prevStat
                }
                collision.obstacleObject.statsManager.gainEffect(effect)
                Game.currentWorld.currentRoom.delete(sword)
            }
        }
        return sword
    }

    /**
     * create tile with hitbox
     * @param x
     * @param y
     * @param w
     * @param h
     * @param {DrawableObject} drawable
     * @param {String} alignment Options : LeftTop, LeftBot, RightTop, RightBot, Center, Bot
     * @returns {StaticObject}
     */
    static createTile(x = 0, y = 0, w = Game.tileWidth, h = Game.tileHeight, drawable = undefined, alignment = "Bot") {
        if (drawable.placement !== "middleground")
            throw "Solid object placement can be middleground only"
        let height = drawable.drowable.height
        let width = drawable.drowable.width
        let xCentre, yCentre
        let lt = new Vector2d()
        let rt = new Vector2d()
        let rb = new Vector2d()
        let lb = new Vector2d()
        switch (alignment) {
            case 'Bot':
                xCentre = ~~(x + width / 2)
                yCentre = ~~(y + height - h / 2)
                lt.set(~~(x + width / 2 - w / 2), y + height - h)
                rt.set(~~(x + width / 2 + w / 2), y + height - h)
                rb.set(~~(x + width / 2 + w / 2), y + height)
                lb.set(~~(x + width / 2 - w / 2), y + height)
                break
            case 'Center':
                xCentre = ~~(x + width / 2)
                yCentre = ~~(y + height / 2)
                lt.set(~~(x + width / 2 - w / 2), ~~(y + height / 2 - h / 2))
                rt.set(~~(x + width / 2 + w / 2), ~~(y + height / 2 - h / 2))
                rb.set(~~(x + width / 2 + w / 2), ~~(y + height / 2 + h / 2))
                lb.set(~~(x + width / 2 - w / 2), ~~(y + height / 2 + h / 2))
                break
            case 'LeftTop':
                xCentre = ~~(x + w / 2)
                yCentre = ~~(y + h / 2)
                lt.set(x, y)
                rt.set(x + w, y)
                rb.set(x + w, y + h)
                lb.set(x, y + h)
                break
            case 'LeftBot':
                xCentre = ~~(x + w / 2)
                yCentre = ~~(y + height - h / 2)
                lt.set(x, y + height - h)
                rt.set(x + w, y + height - h)
                rb.set(x + w, y + height)
                lb.set(x, y + height)
                break
            case 'RightTop':
                xCentre = ~~(x + width - w / 2)
                yCentre = ~~(y + h / 2)
                lt.set(x + width - w, y)
                rt.set(x + width, y)
                rb.set(x + width, y + h)
                lb.set(x + width - w, y + h)
                break
            case 'RightBot':
                xCentre = ~~(x + width - w / 2)
                yCentre = ~~(y + height - h / 2)
                lt.set(x + width - w, y + height - h)
                rt.set(x + width, y + height - h)
                rb.set(x + width, y + height)
                lb.set(x + width - w, y + height)
                break
            default:
                throw "wrong alignment type"
        }
        let tile = new StaticObject(x, y, xCentre, yCentre, drawable)
        tile.hitbox = new AABB(new Vector2d(tile.actor.centre), [lt, rt, rb, lb])
        return tile
    }

    static createMovableObj(x = 0, y = 0, w = Game.tileWidth, h = Game.tileHeight, drawable = undefined, alignment = "Bot") {
        if (drawable.placement !== "middleground")
            throw "Solid object placement can be middleground only"
        let height = drawable.drowable.height
        let width = drawable.drowable.width
        let xCentre, yCentre
        let lt = new Vector2d()
        let rt = new Vector2d()
        let rb = new Vector2d()
        let lb = new Vector2d()
        switch (alignment) {
            case 'Bot':
                xCentre = ~~(x + width / 2)
                yCentre = ~~(y + height - h / 2)
                lt.set(~~(x + width / 2 - w / 2), y + height - h)
                rt.set(~~(x + width / 2 + w / 2), y + height - h)
                rb.set(~~(x + width / 2 + w / 2), y + height)
                lb.set(~~(x + width / 2 - w / 2), y + height)
                break
            case 'Center':
                xCentre = ~~(x + width / 2)
                yCentre = ~~(y + height / 2)
                lt.set(~~(x + width / 2 - w / 2), ~~(y + height / 2 - h / 2))
                rt.set(~~(x + width / 2 + w / 2), ~~(y + height / 2 - h / 2))
                rb.set(~~(x + width / 2 + w / 2), ~~(y + height / 2 + h / 2))
                lb.set(~~(x + width / 2 - w / 2), ~~(y + height / 2 + h / 2))
                break
            case 'LeftTop':
                xCentre = ~~(x + w / 2)
                yCentre = ~~(y + h / 2)
                lt.set(x, y)
                rt.set(x + w, y)
                rb.set(x + w, y + h)
                lb.set(x, y + h)
                break
            case 'LeftBot':
                xCentre = ~~(x + w / 2)
                yCentre = ~~(y + height - h / 2)
                lt.set(x, y + height - h)
                rt.set(x + w, y + height - h)
                rb.set(x + w, y + height)
                lb.set(x, y + height)
                break
            case 'RightTop':
                xCentre = ~~(x + width - w / 2)
                yCentre = ~~(y + h / 2)
                lt.set(x + width - w, y)
                rt.set(x + width, y)
                rb.set(x + width, y + h)
                lb.set(x + width - w, y + h)
                break
            case 'RightBot':
                xCentre = ~~(x + width - w / 2)
                yCentre = ~~(y + height - h / 2)
                lt.set(x + width - w, y + height - h)
                rt.set(x + width, y + height - h)
                rb.set(x + width, y + height)
                lb.set(x + width - w, y + height)
                break
            default:
                throw "wrong alignment type"
        }
        let tile = new MovableObject(x, y, xCentre, yCentre, drawable)
        tile.hitbox = new AABB(new Vector2d(tile.actor.centre), [lt, rt, rb, lb])
        return tile
    }

    /**
     * create NPC with hitbox
     * @param x
     * @param y
     * @param r
     * @param {DrawableObject} drawable
     * @returns {NPC}
     */
    static createNPC(x = 0, y = 0, r = ~~(Game.tileWidth / 2), drawable, stats) {
        if (drawable.placement !== "middleground")
            throw "Solid object placement can be middleground only"
        let height = drawable.drowable.height
        let width = drawable.drowable.width
        let xCentre = ~~(x + width / 2)
        let yCentre = ~~(y + height)
        return new NPC(new Vector2d(x, y),
            new Vector2d(xCentre, yCentre),
            drawable,
            new Hitbox(HITBOX_CIRCLE, new Vector2d(xCentre, yCentre), r),
            stats
        )
    }
}
