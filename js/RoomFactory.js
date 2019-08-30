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


        let grassTile = TilesFactory.CreateTestGrassTile(100, 100);
        let player = TilesFactory.CreatePlayer(350, 370)

        room.Add(grassTile)
        room.Add(player)
        Game.camera.focusOn(player.actor)

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let t = TilesFactory.CreateStaticNPC((2 + j) * 125, (2 + i) * 125);
                room.Add(t);
            }
        }
        return room
    }


    static CreateRoundedRoom() {
        let testRoomSize = 120;
        let room = new Room("Test Room", testRoomSize, testRoomSize);

        let tree = TilesFactory.CreateBigBirch(100,500)
        room.Add(tree)
        let tree2 = TilesFactory.CreateBigOak(300,500)
        room.Add(tree2)
        let tent = TilesFactory.CreateBigTent(500,500)
        room.Add(tent)
        let branches1 = TilesFactory.CreateBranchesTexture1(700,500)
        room.Add(branches1)
        let branches2 = TilesFactory.CreateBranchesTexture2(900,500)
        room.Add(branches2)
        let bush1 = TilesFactory.CreateBush1(1100,500)
        room.Add(bush1)
        let bush2 = TilesFactory.CreateBush2(1300,500)
        room.Add(bush2)
        let cave_enter = TilesFactory.CreateCaveEnter(1500,500)
        room.Add(cave_enter)
        let cross = TilesFactory.CreateCross(1700,500)
        room.Add(cross)
        let deadwood1 = TilesFactory.CreateDeadWood1(1900,500)
        room.Add(deadwood1)
        let deadwood2 = TilesFactory.CreateDeadWood2(2100,500)
        room.Add(deadwood2)
        let deadwood3 = TilesFactory.CreateDeadWood3(2300,500)
        room.Add(deadwood3)
        let columnleft = TilesFactory.CreateDungeonColumnLeft(300,100)
        room.Add(columnleft)
        let columnmiddle = TilesFactory.CreateDungeonColumnMiddle(500,100)
        room.Add(columnmiddle)
        let columnright = TilesFactory.CreateDungeonColumnRight(700,100)
        room.Add(columnright)
        let wallleft = TilesFactory.CreateDungeonWallLeft(900,100)
        room.Add(wallleft)
        let wallrigght = TilesFactory.CreateDungeonWallRight(1100,100)
        room.Add(wallrigght)
        let luke = TilesFactory.CreateLuke(1300,100)
        room.Add(luke)
        let tree3 = TilesFactory.CreateMediumBirch(1500,100)
        room.Add(tree3)
        let tree4 = TilesFactory.CreateMediumOak(1700,100)
        room.Add(tree4)
        let door = TilesFactory.CreateMetalDoor(1900,100)
        room.Add(door)
        let mushrooms = TilesFactory.CreateMushroomsTile(2100,100)
        room.Add(mushrooms)
        let rocks1 = TilesFactory.CreateRocks1(100,300)
        room.Add(rocks1)
        let rocks2 = TilesFactory.CreateRocks2(300,300)
        room.Add(rocks2)
        let rocks3 = TilesFactory.CreateRocks3(500,300)
        room.Add(rocks3)
        let rocks4 = TilesFactory.CreateRocks4(700,300)
        room.Add(rocks4)
        let tree5 = TilesFactory.CreateSmallBirch(900,300)
        room.Add(tree5)
        let tree6 = TilesFactory.CreateSmallOak(1100,300)
        room.Add(tree6)
        let tent2 = TilesFactory.CreateSmallTent(1300,300)
        room.Add(tent2)
        let tombstone1 = TilesFactory.CreateTombstone1(1500,300)
        room.Add(tombstone1)
        let tombstone2 = TilesFactory.CreateTombstone2(1700,300)
        room.Add(tombstone2)
        let tree7 = TilesFactory.CreateTree(1900,300)
        room.Add(tree7)
        let wall23 = TilesFactory.CreateDungeonWall2(2100,300)
        room.Add(wall23)
        let well = TilesFactory.CreateWell(2300,300)
        room.Add(well)
        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                //room.Add(TilesFactory.CreateDungeonFloorBrick(j * Game.tileWidth, i * Game.tileHeight))
                //room.Add(TilesFactory.CreateDungeonFloor1(j * Game.tileWidth, i * Game.tileHeight))
                //room.Add(TilesFactory.CreateGrassTile1(j * Game.tileWidth, i * Game.tileHeight))
                room.Add(TilesFactory.CreateGroundTile(j * Game.tileWidth, i * Game.tileHeight))
                //     Добавляет текстуры камней на сцену, нужно был для теста rendering'a
                //     if (Math.random() < 0.4) {
                //         room.Add(TilesFactory.CreateRock(j * Game.tileWidth, i * Game.tileHeight))
                //     }
            }
        }

        let player = TilesFactory.CreatePlayer(350, 370)

        room.Add(player)
        Game.camera.focusOn(player.actor)

        for (let i = 10; i < 15; i++) {
            for (let j = 10; j < 15; j++) {
                let t = TilesFactory.CreateStaticNPC((2 + j) * 60, (2 + i) * 60);
                room.Add(t);
                // Следование за игроком
                // t.manager = new Object(t)
                // t.manager.update = () => {
                //     t.actor.update()
                //     t.actor.move(player.actor.position.sub(t.actor.position, new Vector2d).normalize().mul(2))
                //     t.hitbox.update(t.actor.centre)
                //     t.collisonSolveStrategy = 'move'
                //     t.walking = (t.actor.offset.x !== 0 || t.actor.offset.y !== 0)
                //     t.direction = t.actor.offset
                // }
            }
        }

        for (let i = 0; i < testRoomSize; i++) {
            for (let j = 0; j < testRoomSize; j++) {
                if (i === 0 || j === 0 || i === (testRoomSize - 2) || j === (testRoomSize - 2)) {
                    let t = TilesFactory.CreateDungeonWall(j * Game.tileWidth, i * Game.tileHeight);
                    room.Add(t);
                }
            }
        }
        room.addMap(2, 14,
            'qwwwwwwe\n' +
                  'a      d\n' +
                  'zw     c\n')
        return room
    }
    static addWall(room, x, y, length, data) {
        let t = ''
        switch (data) {
            case 'l':
                for (let i = 0; i < length - 1; i++) {
                    t.push('a\n')
                }
                break
            case 't':
                t = 'q'
                for (let i = 0; i < length; i++) {
                    t.push('w')
                }
                t = 'e'
                break
            case 'b':
                t = 'z'
                for (let i = 0; i < length; i++) {
                    t.push('x')
                }
                t = 'c'
                break
            case 'r':
                for (let i = 0; i < length - 1; i++) {
                    t.push('d\n')
                }
                break
        }
        room.addMap(x, y, t)
    }
}
