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

    static CreateCarrot(x = 0, y = 0) {
      let src = [Game.Carrot1, Game.Carrot2, Game.Carrot3]
      return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
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

    static CreateFen(x = 0, y = 0) {
      let src = [Game.F1, Game.F2]
      return TilesFactory.createTile(x, y, 54, ~~(Game.F2.height / 3.5), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    static CreateBigForest(x = 0, y = 0) {
        let src = [Game.BigOakTexture, Game.BigBirchTexture]
        return TilesFactory.createTile(x, y, ~~(Game.TreeTexture.width / 4), ~~(Game.TreeTexture.height / 5), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    static CreateMediumForest(x = 0, y = 0) {
        let src = [Game.MediumOakTexture, Game.MediumBirchTexture]
        return TilesFactory.createTile(x, y, ~~(Game.MediumOakTexture.width / 2), ~~(Game.MediumOakTexture.height / 5), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    static CreateSmallForest(x = 0, y = 0) {
        let src = [Game.SmallOakTexture, Game.SmallBirchTexture]
        return TilesFactory.createTile(x, y, ~~(Game.SmallBirchTexture.width / 3), ~~(Game.SmallBirchTexture.height / 4), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    static CreateTumbleForest(x = 0,y = 0) {
      let src = [Game.TumbleTree2Texture, Game.TumbleTree4Texture]
      return TilesFactory.createTile(x, y, ~~(Game.TumbleTree2Texture.width / 4), ~~(Game.TumbleTree2Texture.height / 5), new DrawableObject("middleground", src[~~(Math.random() * 2)]), "Bot");
    }

    static CreateDungeonFloor1(x = 0, y = 0) {
        let src = [Game.DungeonFloorTexture1, Game.DungeonFloorTexture3, Game.DungeonFloorTexture4]
        return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
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
        let t = TilesFactory.createNPC(x, y, 22, new DrawableObject("middleground", SpriteFactory.CreateEnemySprite()))
        t.manager = new AIManager(t, nav)
        t.type = "staticNpc"
        return t
    }

    static CreateStaticNPC2(x, y, nav) {
        let t = TilesFactory.createNPC(x, y, 22, new DrawableObject("middleground", SpriteFactory.CreateGhostKnightSprite()))
        t.manager = new AIManager(t, nav)
        t.type = "staticNpc2"
        return t
    }

    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */

     static CreateAngleTent1(x = 0, y = 0) {
       x = x * Game.tileWidth
       y = y * Game.tileHeight
         return TilesFactory.createTile(x, y, ~~(Game.AngleTentTexture1.width / 2), ~~(Game.AngleTentTexture1.height / 5), new DrawableObject("middleground", Game.AngleTentTexture1), "Bot")
     }

     static CreateAngleTent2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
         return TilesFactory.createTile(x, y, ~~(Game.AngleTentTexture2.width / 2), ~~(Game.AngleTentTexture2.height / 5), new DrawableObject("middleground", Game.AngleTentTexture2), "Bot")
     }

    static CreateBigBirch(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.BigBirchTexture.width / 2), ~~(Game.BigBirchTexture.height / 4), new DrawableObject("middleground", Game.BigBirchTexture), "Bot")
    }

    static CreateBarrels(x = 0, y = 0) {
       x = x * Game.tileWidth
       y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Barrels.width / 2), ~~(Game.Barrels.height / 5), new DrawableObject("middleground", Game.Barrels), "Bot")
    }

    static CreateBench(x = 0, y = 0) {
       x = x * Game.tileWidth
       y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Bench.width / 2), ~~(Game.Bench.height / 1.5), new DrawableObject("middleground", Game.Bench), "Bot")
    }

    static CreateBlood1(x = 0, y = 0) {
       x = x * Game.tileWidth
       y = y * Game.tileHeight
        return new StaticObject(x, y, x, y, new DrawableObject("middleground", Game.Blood));
    }

    static CreateBlood2(x = 0, y = 0) {
       x = x * Game.tileWidth
       y = y * Game.tileHeight
        return new StaticObject(x, y, x, y, new DrawableObject("middleground", Game.Blood2));
    }

    static CreateBigOak(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.BigOakTexture.width / 2), ~~(Game.BigOakTexture.height / 5), new DrawableObject("middleground", Game.BigOakTexture), "Bot")
    }

    static CreateBigTent(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
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

    static CreateCart(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Cart.width / 1.5), ~~(Game.Cart.height / 3), new DrawableObject("middleground", Game.Cart), "Bot")
    }

    static CreateCart2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.Cart2.width, ~~(Game.Cart2.height / 3), new DrawableObject("middleground", Game.Cart2), "Bot")
    }

    static CreateCart3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Cart3.width / 2), ~~(Game.Cart3.height / 3), new DrawableObject("middleground", Game.Cart3), "Bot")
    }

    static CreateCart4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Cart4.width / 1.5), ~~(Game.Cart4.height / 4.5), new DrawableObject("middleground", Game.Cart4), "Center")
    }

    static CreateCart5(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Cart5.width / 1.8), ~~(Game.Cart5.height / 3.8), new DrawableObject("middleground", Game.Cart5), "Bot")
    }

    static CreateCastle(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Castle.width / 2), ~~(Game.Castle.height / 1.5), new DrawableObject("middleground", Game.Castle), "Center")
    }

    static CreateCaveEnter(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.CaveEnterTexture.width, ~~(Game.CaveEnterTexture.height / 3), new DrawableObject("middleground", Game.CaveEnterTexture), "Bot")
    }

    static CreateColumn(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Column.width / 5), ~~(Game.Column.height / 5), new DrawableObject("middleground", Game.Column), "Bot")
    }

    static CreateCross(x = 0, y = 0) {
        return TilesFactory.createMovableObj(x, y, Game.CrossTexture.width, ~~(Game.CrossTexture.height / 4), new DrawableObject("middleground", Game.CrossTexture), "Bot")
    }

    static CreateCage(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Cage.width / 5), ~~(Game.Cage.height / 5), new DrawableObject("middleground", Game.Cage), "Bot")
    }

    static CreateCircle(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Circle.width / 5), ~~(Game.Circle.height / 5), new DrawableObject("middleground", Game.Circle), "Bot")
    }

    static CreateDeadWood1(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood1Texture.width, ~~(Game.DeadWood1Texture.height / 4), new DrawableObject("middleground", Game.DeadWood1Texture), "Bot")
    }

    static CreateDeadWood2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood2Texture.width, ~~(Game.DeadWood2Texture.height / 4), new DrawableObject("middleground", Game.DeadWood2Texture), "Bot")
    }

    static CreateDeadWood3(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood3Texture.width, ~~(Game.DeadWood3Texture.height / 4), new DrawableObject("middleground", Game.DeadWood3Texture), "Bot")
    }

    static CreateDeadWood4(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood4Texture.width, ~~(Game.DeadWood4Texture.height / 4), new DrawableObject("middleground", Game.DeadWood4Texture), "Bot")
    }

    static CreateDeadWood5(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood5Texture.width, ~~(Game.DeadWood5Texture.height / 4), new DrawableObject("middleground", Game.DeadWood5Texture), "Bot")
    }

    static CreateDeadWood6(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood6Texture.width, ~~(Game.DeadWood6Texture.height / 4), new DrawableObject("middleground", Game.DeadWood6Texture), "Bot")
    }

    static CreateDeadWood7(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DeadWood7Texture.width, ~~(Game.DeadWood7Texture.height / 4), new DrawableObject("middleground", Game.DeadWood7Texture), "Bot")
    }

    static CreateDeadNpc1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.DeadNpc1.width / 5), ~~(Game.DeadNpc1.height / 7), new DrawableObject("middleground", Game.DeadNpc1), "RightBot")
    }

    static CreateDeadNpc2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.DeadNpc2.width / 4), ~~(Game.DeadNpc2.height / 7), new DrawableObject("middleground", Game.DeadNpc2), "LeftBot")
    }

    static CreateDrunkHuman(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.DrunkHuman.width / 4), ~~(Game.DrunkHuman.height / 7), new DrawableObject("middleground", Game.DrunkHuman), "Bot")
    }

    static CreateDeadPeople(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.DeadPeople.width / 4), ~~(Game.DeadPeople.height / 7), new DrawableObject("middleground", Game.DeadPeople), "Bot")
    }

    static CreateDeadPeople2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.DeadPeople2.width / 1.2), ~~(Game.DeadPeople2.height), new DrawableObject("middleground", Game.DeadPeople2), "Bot")
    }

    static CreateDungeonEnter(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.DungeonEnterTexture.width, Game.DungeonEnterTexture.height, new DrawableObject("middleground", Game.DungeonEnterTexture),"Bot")
    }

    static CreateDungeonWallRight(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 26, Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallLeftTexture), "RightBot")
    }

    static CreateDungeonColumnLeft(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DungeonColumnLeftTexture.width, ~~(Game.DungeonColumnLeftTexture.height / 5), new DrawableObject("middleground", Game.DungeonColumnLeftTexture), "RightBot")
    }

    static CreateDungeonColumnMiddle(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DungeonColumnMiddleTexture.width, ~~(Game.DungeonColumnMiddleTexture.height / 6), new DrawableObject("middleground", Game.DungeonColumnMiddleTexture), "Bot")
    }

    static CreateDungeonColumnRight(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.DungeonColumnRightTexture.width, ~~(Game.DungeonColumnRightTexture.height / 6), new DrawableObject("middleground", Game.DungeonColumnRightTexture), "LeftBot")
    }

    static CreateDungeonWallLeft(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 26, Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallRightTexture), "LeftBot")
    }

    static CreateDungeonWallNW(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallNWTexture), "RightBot")
    }

    static CreateDungeonWall2(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.tileWidth, 26, new DrawableObject("middleground", Game.DungeonWallTexture2), "LeftBot")
    }

    static CreateDungeonWallNE(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallNETexture), "LeftBot")
    }

    static CreateDungeonWallSW(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallSWTexture), "LeftBot")
    }

    static CreateDungeonWallSE(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, 35, 35, new DrawableObject("middleground", Game.DungeonWallSETexture), "RightBot")
    }

    static CreateDungeonWall(x = 0, y = 0) {
        return TilesFactory.createTile(x, y - 52, Game.tileWidth, 26, new DrawableObject("middleground", Game.DungeonWallTexture), "LeftBot")
    }

    static CreateDungeonFloorBrick(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.BrickTexture));
    }

    static CreateEnter(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.EnterTexture.width / 2), ~~(Game.EnterTexture.height / 5), new DrawableObject("middleground", Game.EnterTexture), "Bot")
    }

    static CreateFenOff(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.F3.width, ~~(Game.F3.height / 3), new DrawableObject("middleground", Game.F3), "Bot")
    }

    static CreateFence1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.FenceTexture1.width, ~~(Game.FenceTexture1.height / 4), new DrawableObject("middleground", Game.FenceTexture1), "Bot")
    }

    static CreateFence2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.FenceTexture2.width / 2), ~~(Game.FenceTexture2.height / 4), new DrawableObject("middleground", Game.FenceTexture2), "Bot")
    }

    static CreateFence3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.FenceTexture3.width, ~~(Game.FenceTexture3.height / 4), new DrawableObject("middleground", Game.FenceTexture3), "Bot")
    }

    static CreateFence4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.FenceTexture4.width, ~~(Game.FenceTexture4.height / 4), new DrawableObject("middleground", Game.FenceTexture4), "Bot")
    }

    static CreateFence5(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.FenceTexture5.width), ~~(Game.FenceTexture5.height / 4), new DrawableObject("middleground", Game.FenceTexture5), "Bot")
    }

    static CreateFence6(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.FenceTexture6.width), ~~(Game.FenceTexture6.height), new DrawableObject("middleground", Game.FenceTexture6), "Bot")
    }

    static CreateFence7(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.FenceTexture7.width / 2), ~~(Game.FenceTexture7.height / 1.5), new DrawableObject("middleground", Game.FenceTexture7), "Center")
    }

    static CreateFence8(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.FenceTexture8.width * 1.5), ~~(Game.FenceTexture8.height / 4), new DrawableObject("middleground", Game.FenceTexture8), "Bot")
    }

    static CreateGrassTile1(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GrassTexture1));
    }

    static CreateDeadDirt(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.DeadDirt));
    }

    static CreateNecropolisFloor(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.NecropolisFloor));
    }

    static CreateNecropolisDirt(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.NecropolisTextureDirt));
    }

    static CreateNecropolisDirt2(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.NecropolisTextureDirt2));
    }

    static CreateGrassDirt(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GrassDirt));
    }

    static CreateGrassTile2(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GrassTexture2));
    }

    static CreateGrassTile3(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.GrassTexture3));
    }

    static CreateGroundTile(x = 0, y = 0) {
        let src = [Game.GroundTexture, Game.GroundTexture2]
        return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 2)]));
    }

    static CreateGate(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Gate.width), ~~(Game.Gate.height), new DrawableObject("middleground", Game.Gate));
    }

    static CreateGarbage1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Garbage1.width), ~~(Game.Garbage1.height / 3), new DrawableObject("middleground", Game.Garbage1), "Bot");
    }

    static CreateGarbage2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Garbage2.width), ~~(Game.Garbage2.height / 3), new DrawableObject("middleground", Game.Garbage2), "Bot");
    }

    static CreateGarbage3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Garbage3.width), ~~(Game.Garbage3.height / 3), new DrawableObject("middleground", Game.Garbage3), "Bot");
    }

    static CreateGarbage4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Garbage4.width), ~~(Game.Garbage4.height / 3), new DrawableObject("middleground", Game.Garbage4), "Bot");
    }

    static CreateGarbage5(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Garbage5.width / 2), ~~(Game.Garbage5.height), new DrawableObject("middleground", Game.Garbage5), "Bot");
    }

    static CreateGarbage6(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Garbage6.width / 2), ~~(Game.Garbage6.height), new DrawableObject("middleground", Game.Garbage6), "Bot");
    }

    static CreateHouse1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House1Texture.width / 1.35), ~~(Game.House1Texture.height / 3), new DrawableObject("middleground", Game.House1Texture));
    }

    static CreateHouse2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House2Texture.width / 1.20), ~~(Game.House2Texture.height / 1.5), new DrawableObject("middleground", Game.House2Texture), "Bot");
    }

    static CreateHouse3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House3Texture.width / 1.35), ~~(Game.House3Texture.height / 3), new DrawableObject("middleground", Game.House3Texture));
    }

    static CreateHouse4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House4Texture.width), ~~(Game.House4Texture.height / 3), new DrawableObject("middleground", Game.House4Texture));
    }

    static CreateHouse5(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House5Texture.width  / 1.5), ~~(Game.House5Texture.height / 1.25), new DrawableObject("middleground", Game.House5Texture), "RightTop");
    }

    static CreateHouse6(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House6Texture.width / 1.35), ~~(Game.House6Texture.height / 1.5), new DrawableObject("middleground", Game.House6Texture));
    }

    static CreateHouse7(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House7Texture.width / 1.35), ~~(Game.House7Texture.height / 2), new DrawableObject("middleground", Game.House7Texture));
    }

    static CreateHouse8(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House8Texture.width / 1.25), ~~(Game.House8Texture.height / 3), new DrawableObject("middleground", Game.House8Texture));
    }

    static CreateHouse9(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.House9Texture.width / 1.25), ~~(Game.House9Texture.height / 3), new DrawableObject("middleground", Game.House9Texture));
    }

    static CreateLattice(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Lattice.width / 1.25), ~~(Game.Lattice.height / 3.2), new DrawableObject("middleground", Game.Lattice), "Center");
    }

    static CreateLattice2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Lattice2.width / 1.25), ~~(Game.Lattice2.height / 3.2), new DrawableObject("middleground", Game.Lattice2), "Center");
    }

    static CreateLukeTile(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.LukeTexture));
    }

    static CreateLukeTile2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return new StaticObject(x, y, x, y, new DrawableObject("middleground", Game.LukeTexture2));
    }

    static CreateMediumBirch(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.MediumBirchTexture.width / 3), ~~(Game.MediumBirchTexture.height / 4), new DrawableObject("middleground", Game.MediumBirchTexture), "Bot")
    }

    static CreateMediumOak(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, ~~(Game.MediumOakTexture.width / 2), ~~(Game.MediumOakTexture.height / 5), new DrawableObject("middleground", Game.MediumOakTexture), "Bot")
    }

    static CreateMetalDoor(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.MetalDoorTexture.width, ~~(Game.MetalDoorTexture.height / 4), new DrawableObject("middleground", Game.MetalDoorTexture), "Bot")
    }

    static CreateMushroomsTile(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.MushroomsTexture.width, ~~(Game.MushroomsTexture.height / 6), new DrawableObject("middleground", Game.MushroomsTexture), "Bot")
    }

    static CreateNecropolis(x = 0, y = 0) {
      let src = [Game.NecropolisTexture, Game.NecropolisTexture2, Game.NecropolisTexture3]
      return new StaticObject(x, y, x, y, new DrawableObject("background", src[~~(Math.random() * 3)]));
    }

    static CreateNecropolisTree(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.NecropolisTree.width / 1.5), ~~(Game.NecropolisTree.height / 3), new DrawableObject("middleground", Game.NecropolisTree), "Bot")
    }

    static CreateNecropolisTree2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.NecropolisTree2.width / 1.5), ~~(Game.NecropolisTree2.height / 3), new DrawableObject("middleground", Game.NecropolisTree2), "Bot")
    }

    static CreatePaving(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.Paving));
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

    static CreateSkeleton1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Skeleton1.width / 1.7), ~~(Game.Skeleton1.height / 4), new DrawableObject("middleground", Game.Skeleton1), "Bot")
    }

    static CreateSkeleton2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Skeleton2.width / 1.7), ~~(Game.Skeleton2.height / 4), new DrawableObject("middleground", Game.Skeleton2), "Bot")
    }

    static CreateSkeleton3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Skeleton3.width / 1.7), ~~(Game.Skeleton3.height / 4), new DrawableObject("middleground", Game.Skeleton3), "Bot")
    }

    static CreateSkeleton4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Skeleton4.width / 1.7), ~~(Game.Skeleton4.height / 4), new DrawableObject("middleground", Game.Skeleton4), "Bot")
    }

    static CreateShed(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Shed.width / 1.7), ~~(Game.Shed.height / 4), new DrawableObject("middleground", Game.Shed), "Bot")
    }

    static CreateTombstone1(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.TombstoneTexture1.width, ~~(Game.TombstoneTexture1.height / 4), new DrawableObject("middleground", Game.TombstoneTexture1), "Bot")
    }

    static CreateTomb1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.Tomb1.width, ~~(Game.Tomb1.height / 4), new DrawableObject("middleground", Game.Tomb1), "Bot")
    }

    static CreateTomb2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.Tomb2.width, ~~(Game.Tomb2.height / 4), new DrawableObject("middleground", Game.Tomb2), "Bot")
    }

    static CreateTable(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Table.width / 1.7), ~~(Game.Table.height / 4), new DrawableObject("middleground", Game.Table), "Bot")
    }

    static CreateTent1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Tent1.width), ~~(Game.Tent1.height / 4), new DrawableObject("middleground", Game.Tent1), "Bot")
    }

    static CreateTent2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Tent2.width), ~~(Game.Tent2.height / 4), new DrawableObject("middleground", Game.Tent2), "Bot")
    }

    static CreateTent3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Tent3.width), ~~(Game.Tent3.height / 4), new DrawableObject("middleground", Game.Tent3), "Bot")
    }

    static CreateTent4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Tent4.width), ~~(Game.Tent4.height / 4), new DrawableObject("middleground", Game.Tent4), "Bot")
    }

    static CreateTombstone3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture3.width, ~~(Game.TombstoneTexture3.height / 4), new DrawableObject("middleground", Game.TombstoneTexture3), "Bot")
    }

    static CreateTombstone4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture4.width, ~~(Game.TombstoneTexture4.height / 3), new DrawableObject("middleground", Game.TombstoneTexture4), "Bot")
    }

    static CreateTombstone5(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture5.width, ~~(Game.TombstoneTexture5.height / 4), new DrawableObject("middleground", Game.TombstoneTexture5), "Bot")
    }

    static CreateTombstone6(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture6.width, ~~(Game.TombstoneTexture6.height / 2.75), new DrawableObject("middleground", Game.TombstoneTexture6), "Bot")
    }

    static CreateTombstone7(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture7.width, ~~(Game.TombstoneTexture7.height / 4), new DrawableObject("middleground", Game.TombstoneTexture7), "Bot")
    }

    static CreateTombstone8(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture8.width, ~~(Game.TombstoneTexture8.height / 4), new DrawableObject("middleground", Game.TombstoneTexture8), "Bot")
    }

    static CreateTombstone9(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.TombstoneTexture9.width / 2), ~~(Game.TombstoneTexture9.height / 4), new DrawableObject("middleground", Game.TombstoneTexture9), "Bot")
    }

    static CreateTombstone10(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture10.width, ~~(Game.TombstoneTexture10.height / 4), new DrawableObject("middleground", Game.TombstoneTexture10), "Bot")
    }

    static CreateTombstone11(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.TombstoneTexture11.width, ~~(Game.TombstoneTexture11.height / 4), new DrawableObject("middleground", Game.TombstoneTexture11), "Bot")
    }

    static CreateTree(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.TreeTexture.width / 4), ~~(Game.TreeTexture.height / 5), new DrawableObject("middleground", Game.TreeTexture), "Bot")
    }

    static CreateTrap(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Trap.width / 4), ~~(Game.Trap.height / 5), new DrawableObject("middleground", Game.Trap), "Bot")
    }

    static CreateTrap2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Trap2.width / 4), ~~(Game.Trap2.height / 5), new DrawableObject("middleground", Game.Trap2), "Bot")
    }

    static CreateTrap3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Trap3.width / 2), ~~(Game.Trap3.height / 5), new DrawableObject("middleground", Game.Trap3), "Bot")
    }

    static CreateTrap4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Trap4.width / 4), ~~(Game.Trap4.height / 5), new DrawableObject("middleground", Game.Trap4), "Bot")
    }

    static CreateTrap5(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.Trap5.width / 2), ~~(Game.Trap5.height / 5), new DrawableObject("middleground", Game.Trap5), "Bot")
    }

    static CreateTumbleTree1(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.TumbleTree1Texture.width / 1.35), ~~(Game.TumbleTree1Texture.height / 1.5), new DrawableObject("middleground", Game.TumbleTree1Texture), "Bot")
    }

    static CreateTumbleTree2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.TumbleTree2Texture.width / 3), ~~(Game.TumbleTree2Texture.height / 3.3), new DrawableObject("middleground", Game.TumbleTree2Texture), "Bot")
    }

    static CreateTumbleTree3(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.TumbleTree3Texture.width / 3), ~~(Game.TumbleTree3Texture.height / 3), new DrawableObject("middleground", Game.TumbleTree3Texture), "Bot")
    }

    static CreateTumbleTree4(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.TumbleTree4Texture.width / 1.35), ~~(Game.TumbleTree4Texture.height / 3), new DrawableObject("middleground", Game.TumbleTree4Texture), "Bot")
    }

    static CreateState(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, ~~(Game.State.width / 2.2), ~~(Game.State.height / 4), new DrawableObject("middleground", Game.State), "Bot")
    }

    static CreateWardrobe(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.Wardrobe.width, ~~(Game.Wardrobe.height / 5), new DrawableObject("middleground", Game.Wardrobe), "Bot")
    }

    static CreateWardrobe2(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
        return TilesFactory.createTile(x, y, Game.Wardrobe2.width, ~~(Game.Wardrobe2.height / 5), new DrawableObject("middleground", Game.Wardrobe2), "Bot")
    }

    static CreateWell(x = 0, y = 0) {
        x = x * Game.tileWidth
        y = y * Game.tileHeight
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
                collision.obstacleObject.statsManager.gainAction(new Action(new Stats(0,70,0,0,0,0)))
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
