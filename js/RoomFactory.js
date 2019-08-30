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

        let player = TilesFactory.CreatePlayer(1200, 990)

        room.Add(player)
        Game.camera.focusOn(player.actor)

        for (let i = 18; i < 20; i++) {
            for (let j = 21; j < 23; j++) {
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

        // for (let i = 0; i < testRoomSize; i++) {
        //     for (let j = 0; j < testRoomSize; j++) {
        //         if (i === 1 || j === 1 || i === (testRoomSize - 3) || j === (testRoomSize - 3)) {
        //             let t = TilesFactory.CreateDungeonWall(j * Game.tileWidth, i * Game.tileHeight);
        //             room.Add(t);
        //         }
        //     }
        // }
        room.addMap(17, 14,
            'qwwwwwwwwe              qwwwwwwwwwwe                                                               \n' +
            'a        d              a          d                                                               \n' +
            'a        d              a          d                                                               \n' +
            'a        d     qwwwwwwww2          d                                                               \n' +
            'a        d     a                   d                                                               \n' +
            'zsssse qsx     a qsssssse qsssssssse                                                                                   \n' +
            '     d a       a a      d a        1wwe                                                                      \n' +
            ' qwwwx zwwwwe  a a      d a        d  1wwe                                                                       \n' +
            ' a          1ww2 zwwwwwwx zwwwwwwwwx     1wwe                                                                              \n' +
            ' a                                          1e                                                        \n' +
            ' a                                           1e                                                       \n' +
            ' a          qsssssssse qssssssssse            d                                                                   \n' +
            ' zse qsse qs2        d a         d            d                                                               \n' +
            '   d a  d a          d a         d           qx                                                       \n' +
            '   d a  d a   qwwwwwwx zwwwwwwwwwx          q2                                                        \n' +
            '   d a  d a   a                          qss2                                                         \n' +
            '   d a  d a   a                       qss2                                                            \n' +
            ' qsx zwwx ze  a    qe   qe   qe    qss2\n' +
            ' a         d  a    zx   zx   zx    a                                                       \n' +
            ' a         d  a                    a                                                              \n' +
            ' a         d  zssssssssssssssssssss2                                                                                       \n' +
            ' zsssssssssx                                                                                                 \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                ')
        RoomFactory.addWall(room, 3, 28, 3, 'l')
        return room
    }
    static addWall(room, x, y, length, data) {
        let t = ''
        switch (data) {
            case 'lt':
                for (let i = 0; i < length - 1; i++) {
                    t +='a\n'
                }
                t += 'z'
                break
            case 'tr':
                t = 'q'
                for (let i = 0; i < length; i++) {
                    t += 'w'
                }
                break
            case 'b':
                t = 'z'
                for (let i = 0; i < length; i++) {
                    t += 'x'
                }
                t += 'c'
                break
            case 'r':
                for (let i = 0; i < length - 1; i++) {
                    t += 'd\n'
                }
                break
            case 'tb':
                t = ''
                for (let i = 0; i < length - 1; i++) {
                    t +='a\n'
                }
                break
        }
        room.addMap(x, y, t)
    }
}
