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
    static CreateTestTile(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.BrickTexture));
    }
    static CreateRock(x = 0, y = 0) {
        let src = [Game.Rock1Texture, Game.Rock2Texture, Game.Rock3Texture, Game.Rock4Texture]
        return new StaticObject(x, y, x, y, new DrawableObject("middleground", src[~~(Math.random() * 3)]));
    }


    /**
     * Порождает и Player по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreatePlayer(x = 0, y = 0) {
        let player = TilesFactory.createNPC(x, y, 15, new DrawableObject("middleground", SpriteFactory.CreateTestSprite()));
        player.manager = new PlayerManager(player)
        return player
    }

    /**
     * Порождает и NPC по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreateStaticNPC(x, y) {
        return TilesFactory.createNPC(x, y, 10, new DrawableObject("middleground", SpriteFactory.CreateTestSprite()))
    }

    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreateTestGrassTile(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.GrassTexture.width, 15, new DrawableObject("middleground", Game.GrassTexture));
    }
    static CreateDungeonWallRight(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, 26, Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallLeftTexture),"RightTop")
    }
    static CreateDungeonWallLeft(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, 26, Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallRightTexture),"LeftTop")
    }
    static CreateDungeonWallNW(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, 35, 35, new DrawableObject("middleground", Game.DungeonWallNWTexture),"LeftBot")
    }
    static CreateDungeonWallNE(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, 35, 35, new DrawableObject("middleground", Game.DungeonWallNETexture),"RightBot")
    }
    static CreateDungeonWallSW(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, 52, 2 * Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallSWTexture),"LeftTop")
    }
    static CreateDungeonWallSE(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, 52, 2 * Game.tileHeight, new DrawableObject("middleground", Game.DungeonWallSETexture),"RightTop")
    }
    static CreateDungeonWall(x = 0, y = 0) {
        return TilesFactory.createTile(x, y, Game.tileWidth, 26, new DrawableObject("middleground", Game.DungeonWallTexture),"LeftBot")
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

    /**
     * create NPC with hitbox
     * @param x
     * @param y
     * @param r
     * @param {DrawableObject} drawable
     * @returns {NPC}
     */
    static createNPC(x = 0, y = 0, r = ~~(Game.tileWidth / 2), drawable) {
        if (drawable.placement !== "middleground")
            throw "Solid object placement can be middleground only"
        let height = drawable.drowable.height
        let width = drawable.drowable.width
        let xCentre = ~~(x + width / 2)
        let yCentre = ~~(y + height)
        return new NPC(new Vector2d(x, y),
            new Vector2d(xCentre, yCentre),
            drawable,
            new Hitbox(HITBOX_CIRCLE, new Vector2d(xCentre, yCentre), r)
        )
    }
}