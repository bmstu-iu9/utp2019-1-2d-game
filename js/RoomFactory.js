class RoomFactory{
    static CreateTestRoom(){
        let room = new Room("Test Room", 100, 100)
        for(let i = 0; i < 100; i++){
            for(let j = 0; j < 100; j++){
                room.backgroundTiles[i][j] = TilesFactory.CreateTestTile(j*Game.tileWidth, i*Game.tileHeight)
            }
        }
        return room
    }
}