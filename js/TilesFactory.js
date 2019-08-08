'use strict';
class TilesFactory {
    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x 
     * @param {Number} y 
     */
    static CreateTestTile(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("background", Game.TestTexture));
    }
    static CreateTestTile2(x = 0, y = 0) {
        return new StaticObject(x, y, x, y, new DrawableObject("middleground", Game.TestTexture2));
    }
    static CreateTestTile3(x = 0, y = 0) {
        return new NPC(new Vector2d(x, y), new Vector2d(x+25, y+25));
    }

    static CreateTestTile4(x,y){
        return new StaticObject(x,y,x+25,y+25,new DrawableObject('middleground',SpriteFactory.CreateTestSprite()))
    }

    static CreateTileTry(x = 0, y = 0) {
        return new StaticObject(100, 100, 125,125, new DrawableObject("middleground", Game.texture));
    }
}