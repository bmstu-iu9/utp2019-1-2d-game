'use strict';
class RoomFactory {
    static CreateTestRoom() {
        let testRoomSize = 100;
        let room = new Room("Test Room", testRoomSize, testRoomSize);

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.Add(TilesFactory.CreateTestTile(j * Game.tileWidth, i * Game.tileHeight))
            }
        }


        let player = TilesFactory.CreateTileTry();
        let player2 = TilesFactory.CreateTestTile3(350, 370)

        room.Add(player)
        room.Add(player2)
        Game.camera.focusOn(player2.actor)

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let t = TilesFactory.CreateTestTile4((2 + j) * 125, (2 + i) * 125);
                room.Add(t);
                room.quadTree.add(t.hitbox);
            }
        }

        return room
    }
}