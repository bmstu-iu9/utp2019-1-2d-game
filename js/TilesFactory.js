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

    /**
     * Порождает и Player по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreatePlayer(x = 0, y = 0) {
        let player = TilesFactory.createNPC(x, y, 10, new DrawableObject("middleground", SpriteFactory.CreateTestSprite()));
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

    /**
     * create tile without hitbox
     * @param x
     * @param y
     * @param w
     * @param h
     * @param {DrawableObject} drawable
     * @returns {StaticObject}
     */
    static createTile(x = 0, y = 0, w = Game.tileWidth, h = Game.tileHeight, drawable) {
        if(drawable.placement !== "middleground")
            throw "Solid object placement can be middleground only"
        let height = drawable.drowable.height
        let width = drawable.drowable.width
        let xCentre = ~~(x + width / 2)
        let yCentre = ~~(y + height - h / 2)
        let tile = new StaticObject(x, y, xCentre, yCentre, drawable)
        tile.hitbox = new AABB(new Vector2d(tile.actor.centre), [
            new Vector2d(~~(x + width / 2 - w / 2), y + height - h),
            new Vector2d(~~(x + width / 2 + w / 2), y + height - h),
            new Vector2d(~~(x + width / 2 + w / 2), y + height),
            new Vector2d(~~(x + width / 2 - w / 2), y + height)
        ])
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
        if(drawable.placement !== "middleground")
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