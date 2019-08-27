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
        let player = new NPC(new Vector2d(x, y), new Vector2d(x + 25, y + 25));
        player.manager = new PlayerManager(player)
        return player
    }

    /**
     * Порождает и NPC по заданным игровым координатам
     * @param {Number} x 
     * @param {Number} y 
     */
    static CreateStaticNPC(x, y) {
        return new NPC(new Vector2d(x, y), new Vector2d(x + 25, y + 25))
    }

    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x 
     * @param {Number} y 
     */
    static CreateTestGrassTile(x = 0, y = 0) {
        let tile = new StaticObject(x, y, x + 26, y + 26, new DrawableObject("middleground", Game.GrassTexture))
        tile.hitbox = new AABB(new Vector2d(tile.actor.centre), [
            tile.actor.centre.add(-26, -26, new Vector2d()),
            tile.actor.centre.add(26, -26, new Vector2d()),
            tile.actor.centre.add(26, 26, new Vector2d()),
            tile.actor.centre.add(-26, 26, new Vector2d())
        ]);
        return tile
    }
}