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
        let player = TilesFactory.createNPC(x, y, 26, new DrawableObject("middleground", SpriteFactory.CreateTestSprite()));
        player.manager = new PlayerManager(player)
        return player
    }

    /**
     * Порождает и NPC по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreateStaticNPC(x, y) {
        return TilesFactory.createNPC(x, y, 26, new DrawableObject("middleground", SpriteFactory.CreateTestSprite()))
    }

    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x
     * @param {Number} y
     */
    static CreateTestGrassTile(x = 0, y = 0) {
        return TilesFactory.createTile(100, 100, 50, 50, new DrawableObject("middleground", Game.GrassTexture));
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
    static createTile(x = 0, y = 0, w = 0, h = 0, drawable) {
        let height = drawable.drowable.height
        let width = drawable.drowable.width
        let xCentre = ~~(x + width - w / 2)
        let yCentre = ~~(y + height - h / 2)
        let tile = new StaticObject(x, y, xCentre, yCentre, drawable)
        tile.hitbox = new AABB(new Vector2d(tile.actor.centre), [
            tile.actor.centre.add(-25, -25, new Vector2d()),
            tile.actor.centre.add(25, -25, new Vector2d()),
            tile.actor.centre.add(25, 25, new Vector2d()),
            tile.actor.centre.add(-25, 25, new Vector2d())
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
    static createNPC(x = 0, y = 0, r = 0, drawable) {
        let height = drawable.drowable.height
        let width = drawable.drowable.width
        let xCentre = ~~(x + width / 2)
        let yCentre = ~~(y + height - r)
        return new NPC(new Vector2d(x, y),
            new Vector2d(xCentre, yCentre),
            drawable,
            new Hitbox(HITBOX_CIRCLE, new Vector2d(xCentre, yCentre), r)
        )
    }
}