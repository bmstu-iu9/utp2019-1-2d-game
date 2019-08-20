'use strict';
class TilesFactory {

    /**
     *
     * @param {Image} img
     */
    static CreateTexture(img){
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
        let tile = new StaticObject(100, 100, 125, 125, new DrawableObject("middleground", Game.GrassTexture));
        tile.hitbox = new AABB(new Vector2d(tile.actor.centre), [
            tile.actor.centre.add(-25, -25, new Vector2d()),
            tile.actor.centre.add(25, -25, new Vector2d()),
            tile.actor.centre.add(25, 40, new Vector2d()),
            tile.actor.centre.add(-25, 40, new Vector2d())
        ]);
        return tile
    }
}