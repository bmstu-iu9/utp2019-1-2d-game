class RoomFactory{
    static CreateTestRoom(){
        let room = new Room("Test Room", 100, 100)
        for(let i = 0; i < 100; i++){
            for(let j = 0; j < 100; j++){
                room.backgroundTiles[i][j] = TilesFactory.CreateTestTile(j*Game.tileWidth, i*Game.tileHeight)
            }
        }
        for(let i = 0; i < 100; i++){
            for(let j = 0; j < 100; j++){
                room.middlegroundTiles[i][j] = new HashMap();
            }
        }
        let player = TilesFactory.CreateTestTile2(300, 350)

        let player2 = TilesFactory.CreateTestTile2(350, 370 )
        room.middlegroundTiles[6][7].set(player)
        room.middlegroundTiles[7][7].set(player2)
        return room
    }
}