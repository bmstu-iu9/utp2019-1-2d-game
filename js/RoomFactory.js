'use strict';
class RoomFactory {
    static CreateTestRoom() {
        let testRoomSize = 100;
        let room = new Room("Test Room", testRoomSize, testRoomSize);

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.backgroundTiles[i][j] = TilesFactory.CreateTestTile(j * Game.tileWidth, i * Game.tileHeight);
            }
        }

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.middlegroundTiles[i][j] = new HashMap();
            }
        }

        let player = TilesFactory.CreateTileTry();

        let p=TilesFactory.CreateTestTile3();

        for (let i=0;i<10;i++){
            for (let j=0;j<10;j++){
                let t=TilesFactory.CreateTestTile4((2+j)*125,(2+i)*125);
                room.middlegroundTiles[i][j].set(t);
                room.quadTree.add(t.hitbox);
            }
        }

        room.middlegroundTiles[6][7].set(player);
        room.middlegroundTiles[8][8].set(p);
        console.log(room.quadTree);
        return room;
    }
}