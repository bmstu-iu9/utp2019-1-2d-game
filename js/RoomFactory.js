class RoomFactory {
    static CreateTestRoom() {
        let testRoomSize = 100
        let room = new Room("Test Room", testRoomSize, testRoomSize)

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.backgroundTiles[i][j] = TilesFactory.CreateTestTile(j * Game.tileWidth, i * Game.tileHeight)
            }
        }

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.middlegroundTiles[i][j] = new HashMap();
            }
        }

        let player = TilesFactory.CreateTestTile2(300, 350)

        let player2 = TilesFactory.CreateTestTile3(350, 370)

        room.middlegroundTiles[6][7].set(player)
        room.middlegroundTiles[7][7].set(player2)
        return room
    }
}