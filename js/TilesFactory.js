class TilesFactory{
    /**
     * Порождает и возвращает тайл по заданным игровым координатам
     * @param {Number} x 
     * @param {Number} y 
     */
    static CreateTestTile(x = 0, y = 0){
        return  new DrawableObject(x, y, "background",  Game.TestTexture)
    }
}