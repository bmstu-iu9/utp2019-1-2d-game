class RoomFactory {
    static CreateTestRoom() {
        let testRoomSize = 100
        let room = new Room("Test Room", testRoomSize, testRoomSize)

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.Add(TilesFactory.CreateTestTile(j * Game.tileWidth, i * Game.tileHeight))
            }
        }


        let player = TilesFactory.CreateTestTile2(300, 350)

        let player2 = TilesFactory.CreateTestTile3(350, 370)
        
        room.Add(player)
        room.Add(player2)
        Game.camera.focusOn(player2.actor)
        return room
    }
}