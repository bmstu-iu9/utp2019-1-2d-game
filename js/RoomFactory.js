'use strict';
class RoomFactory {
    static CreateTestRoom() {
        let testRoomSize = 120;
        let room = new Room("Test Room", testRoomSize, testRoomSize);

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.Add(TilesFactory.CreateTestTile(j * Game.tileWidth, i * Game.tileHeight))
            }
        }


        let grassTile = TilesFactory.CreateTestGrassTile();
        let player = TilesFactory.CreatePlayer(350, 370)

        room.Add(grassTile)
        room.Add(player)
        room.quadTree.add(player)
        Game.camera.focusOn(player.actor)

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let t = TilesFactory.CreateStaticNPC((2 + j) * 125, (2 + i) * 125);
                room.Add(t);
                room.quadTree.add(t);
            }
        }
        room.quadTree.add(grassTile)
        return room
    }


    static CreateRoundedRoom() {
        let testRoomSize = 120;
        let room = new Room("Test Room", testRoomSize, testRoomSize);

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                room.Add(TilesFactory.CreateTestTile(j * Game.tileWidth, i * Game.tileHeight))
            }
        }

        let player = TilesFactory.CreatePlayer(350, 370)

        room.Add(player)
        //room.quadTree.add(player)
        Game.camera.focusOn(player.actor)

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let t = TilesFactory.CreateStaticNPC((2 + j) * 60, (2 + i) * 60);
                room.Add(t);
                // Следование за игроком
                // t.manager = new Object(t)
                // t.Update = () => {
                //     t.actor.update()
                //     t.actor.move(player.actor.position.sub(t.actor.position, new Vector2d).normalize().mul(Math.random()* 6))
                //     t.hitbox.update(t.actor.centre)
                // }
                //room.quadTree.add(t);
            }
        }

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                if (i === 0 || j === 0 || i === (testRoomSize - 2) || j  === (testRoomSize - 2)){
                    let t = TilesFactory.CreateTestGrassTile(j * Game.tileWidth, i * Game.tileHeight);
                    room.Add(t);
                    //room.quadTree.add(t)
                }
            }
        }
        return room
    }
}