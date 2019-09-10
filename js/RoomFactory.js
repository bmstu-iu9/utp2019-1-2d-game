'use strict';
class RoomFactory {
    static CreateTestRoom(object = undefined) {
        let testRoomHeight = 160;
        let testRoomWidth = 120;
        let room = new Room("Test Room", testRoomHeight, testRoomWidth);
        room.type = "testRoom"


        let grassTile = TilesFactory.CreateTestGrassTile(100, 100);
        room.Add(grassTile)
        if (object === undefined) {
            let player = TilesFactory.CreatePlayer(350, 370)
            room.Add(player)
            Game.camera.focusOn(player.actor)


            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    let t = TilesFactory.CreateStaticNPC((2 + j) * 125, (2 + i) * 125);
                    room.Add(t);
                }
            }
        }
        return room
    }


    static CreateRoundedRoom(object = undefined) {
        let testRoomSize = 80;
        let room = new Room("Test Room", testRoomSize, testRoomSize);
        if (object === undefined) {
            //room.type = "roundedRoom"
            // for (let i = 0; i < testRoomSize; i++) {
            //     for (let j = 0; j < testRoomSize; j++) {
            //         //room.Add(TilesFactory.CreateDungeonFloorBrick(j * Game.tileWidth, i * Game.tileHeight))
            //         //room.Add(TilesFactory.CreateDungeonFloor1(j * Game.tileWidth, i * Game.tileHeight))
            //         //room.Add(TilesFactory.CreateGrassTile1(j * Game.tileWidth, i * Game.tileHeight))
            //         room.Add(TilesFactory.CreateGroundTile(j * Game.tileWidth, i * Game.tileHeight))
            //         //     Добавляет текстуры камней на сцену, нужно был для теста rendering'a
            //         //     if (Math.random() < 0.4) {
            //         //         room.Add(TilesFactory.CreateRock(j * Game.tileWidth, i * Game.tileHeight))
            //         //     }
            //     }
            // }
            room.drawGround(0, 0, 79, 79)
            room.drawRandomGrass(0, 0, 73, 12)
            room.drawRandomGrass(0, 11, 14, 67)
            room.drawRandomGrass(15, 50, 58, 28)
            room.drawRandomGrass(66, 11, 7, 39)
            room.drawRandomGrass(55, 11, 11, 9)
            room.drawRandomGrass(53, 11, 2, 1)
            room.drawRandomGrass(55, 37, 11, 13)
            room.drawRandomGrass(74, 0, 4, 78)
            room.drawRandomGrass(63, 34, 3, 2)
            room.drawRandomGrass(14, 0, 11, 13)
            room.drawRandomDirtGrassR(14, 12, 0, 12)
            room.drawRandomDirtGrassR(15, 22, 0, 27)
            room.drawRandomDirtGrassT(16, 50, 37, 0)
            room.drawRandomDirtGrassL(54, 38, 0, 11)
            room.drawRandomDirtGrassT(54, 38, 3, 0)
            room.drawRandomDirtGrassT(57, 37, 2, 0)
            room.drawRandomDirtGrassT(60, 36, 2, 0)
            room.drawRandomDirtGrassT(63, 35, 1, 0)
            room.drawRandomDirtGrassT(65, 34, 0, 0)
            room.drawRandomDirtGrassL(66, 22, 0, 11)
            room.drawRandomDirtGrassB(65, 21, 0, 0)
            room.drawRandomDirtGrassB(61, 20, 3, 0)
            room.drawRandomDirtGrassL(60, 19, 0, 0)
            room.drawRandomDirtGrassB(57, 18, 2, 0)
            room.drawRandomDirtGrassL(56, 14, 0, 3)
            room.drawRandomDirtGrassB(54, 13, 1, 0)
            room.drawRandomDirtGrassB(53, 12, 0, 0)
            room.drawRandomDirtGrassL(42, 11, 0, 0)
            room.drawRandomDirtGrassB(43, 11, 8, 0)
            room.drawRandomDirtGrassB(36, 10, 5, 0)
            room.drawRandomDirtGrassR(35, 11, 0, 0)
            room.drawRandomDirtGrassB(32, 11, 2, 0)
            room.drawRandomDirtGrassL(31, 11, 0, 0)
            room.drawRandomDirtGrassB(25, 10, 5, 0)
            room.drawRandomDirtGrassR(24, 11, 0, 0)
            room.drawRandomDirtGrassB(15, 11, 8, 0)
            room.drawDirt(15, 14, 1, 10)
            room.drawDirt(16, 24, 1, 24)
            room.drawDirt(16, 48, 36, 1)
            room.drawDirt(52, 36, 1, 13)
            room.drawDirt(52, 36, 3, 1)
            room.drawDirt(56, 35, 0, 2)
            room.drawDirt(57, 35, 2, 1)
            room.drawDirt(59, 34, 3, 1)
            room.drawDirt(62, 33, 1, 1)
            room.drawDirt(62, 33, 2, 1)
            room.drawDirt(62, 33, 2, 1)
            room.drawDirt(64, 22, 1, 11)
            room.drawDirt(62, 21, 2, 1)
            room.drawDirt(61, 21, 0, 1)
            room.drawDirt(61, 21, 3, 1)
            room.drawDirt(59, 20, 1, 1)
            room.drawDirt(58, 20, 0, 0)
            room.drawDirt(56, 18, 0, 0)
            room.drawDirt(55, 19, 4, 1)
            room.drawDirt(54, 16, 1, 3)
            room.drawDirt(55, 19, 1, 1)
            room.drawDirt(54, 14, 1, 1)
            room.drawDirt(15, 12, 10, 1)
            room.drawDirt(25, 11, 5, 1)
            room.drawDirt(30, 12, 6, 1)
            room.drawDirt(36, 11, 5, 1)
            room.drawDirt(41, 12, 10, 1)
            room.drawDirt(52, 12, 0, 2)
            room.drawDirt(53, 13, 0, 2)
            room.drawBigForest(2, 5, 70, 4)
            room.drawBigForest(2, 10, 10, 13)
            room.drawBigForest(3, 24, 10, 30)
            room.drawBigForest(12, 50, 60, 5)
            room.drawBigForest(60, 35, 5, 3)
            room.drawBigForest(55,37,20,15)
            room.drawBigForest(66, 20, 11, 17)
            room.drawBigForest(53, 9, 24, 2)
            room.drawBigForest(56, 12, 20, 4)
            room.drawBigForest(61, 16, 14, 2)
            room.drawBigForest(65, 18, 11, 2)


            room.type = "roundedRoom"
            let player = TilesFactory.CreatePlayer(1280, 1300)

            room.Add(player)
            Game.player = player
            Game.camera.focusOn(player.actor)
        }
        room.nav = RoomFactory.initNavMesh(testRoomSize, testRoomSize)
        console.log(room.nav)
        for (let i = 15; i < 16; i++) {
            if (object === undefined) {
                for (let j = 16; j < 17; j++) {
                    let t = TilesFactory.CreateStaticNPC(j * 60, i * 60, room.nav);
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
            '         qwwe       qwwe                                                                 \n' +
            'qwwwwwwww2  1wwwwwww2  1wwwwwwwwwwe                                                                 \n' +
            'a        a  d       a  d     jg   1e                                                         \n' +
            'a        a  d       a  d           1e                                             \n' +
            'a        a  d     gha  d           qx                                                       \n' +
            'a        a  d       a  d          q2                                                          \n' +
            'zsssse qs2  1sse qss2  1e qsssssssx                                                                               \n' +
            'a    d a       d a      d a       1wwe                                                                      \n' +
            'zqwwwx zwwwwe  d a      d a       d  1wwe                                                                       \n' +
            ' a       g  1wwx zwwwwwwx zwwwwwwwx     1wwe                                                                              \n' +
            ' a                                         1we                                                        \n' +
            ' a                                           1e                                                       \n' +
            ' a          qsssssssse qssssssssse    35      d                                                                   \n' +
            ' zse qsse qs2        d a         d            d                                                               \n' +
            '   d a  d a          d a         d            d                                                      \n' +
            '   d a  d a   qwwwwwwx zwwwwwwwwwx    35      d                                                        \n' +
            '   d a  d a   a                  d           qx                                                         \n' +
            '   d a  d a   a                  d         qs2                                                     \n' +
            ' qsx zwwx zse a   qe   qe   qe   1e     qss2                                            \n' +
            ' a          d a   zx   zx   zx    d  qss2                                                     \n' +
            ' a          d a                   1ss2                                                        \n' +
            ' a f        d a            f      d                                          \n' +
            ' zssse  qsssx a      h            d                                                                               \n' +
            ' a   d  a     a        g          d                                                              \n' +
            ' qsssx  zssse zsssssssssssssssssssx                                                                                         \n' +
            ' a          d                                                                                     \n' +
            ' a         fd                                                                                     \n' +
            ' a          35                                                                                   \n' +
            ' af   35                                                                                           \n' +
            ' a          35                                                                                      \n' +
            ' a          d                                                                                       \n' +
            ' a          d                                                                                       \n' +
            ' zssssssssssx                                                                                                  \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                                                                   \n' +
            '                                                ')
        // room.addMap(17, 14,
        //     '                                                                       \n' +
        //     '                                                                       \n' +
        //     ' 666666666  666666666  666666666666666666666666666666666666666666666666\n' +
        //     ' 666666666  666666666  666666666666666666666666666666666666666666666666\n' +
        //     ' 666666666  666666666  666666666666666666666666666666666666666666666666\n' +
        //     ' 666666666  666666666  666666666666666666666666666666666666666666666666\n' +
        //     ' 666666666  666666666  666666666666666666666666666666666666666666666666\n' +
        //     '     666       666       6666666666666666666666666666666666666666666666\n' +
        //     '  6666666666   666       6666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '   666  66666666666666666666666666666666666666666666666666666\n' +
        //     '   666  66666666666666666666666666666666666666666666666666666666666\n' +
        //     '   666  66666666666666666666666666666666666666666666666666666666666\n' +
        //     '   666  66666666666666666666666666666666666666666666666666666666666\n' +
        //     '   666  66666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  666666666666666666666666666666666666666666666666666666666666666666\n' +
        //     '  6666666666\n' +
        //     '  6666666666\n' +
        //     '  6666666666\n' +
        //     '  6666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '  66666666666\n' +
        //     '             ')
        RoomFactory.addWall(room, 3, 28, 3, 'l')
        return room
    }

    static initNavMesh(roomSizeX, roomSizeY) {
        let t = [1355, 855, 1350, 1043, 1254, 1036, 1190, 1036, 959, 1043, 959, 855, 1219, 855, 1484, 1215, 1490, 1265, 1505, 1354, 1501, 1406, 1414, 1398, 1348, 1397, 1151, 1398, 1082, 1398, 1012, 1406, 1012, 1215, 1191, 1215, 1264, 1215,
            1598, 1272, 1714, 1268, 1775, 1271, 2064, 1272, 2175, 1271, 2244, 1271, 2620, 1272, 2575, 1354, 2205, 1354, 2087, 1346, 2017, 1345, 1854, 1354, 1726, 1354, 1630, 1354,
            1926, 856, 1922, 1042, 1776, 1034, 1565, 1042, 1558, 856, 1756, 856,
            2628, 856, 2643, 907, 2680, 908, 2697, 960, 2697, 981, 2654, 985, 2633, 1042, 2252, 1033, 2173, 1033, 2130, 1033, 2130, 856, 2229, 856, 1701, 1033,
            2784, 1168, 2799, 1219, 2940, 1220, 2951, 1269, 3096, 1272, 3107, 1321, 3200, 1324, 3208, 1371, 3252, 1376, 3252, 1553, 3231, 1554, 3217, 1614, 3133, 1605, 3113, 1666, 2979, 1657, 2957, 1718, 2823, 1709, 2801, 1770, 2702, 1766, 2702, 1661, 2650, 1657, 2647, 1347, 2699, 1270, 2702, 1168,
            2085, 1582, 2167, 1584, 2362, 1584, 2576, 1584, 2585, 1736, 2628, 1740, 2628, 1978, 2448, 1668, 2439, 1790, 2339, 1785, 2356, 1657, 2184, 1663, 2178, 1790, 2091, 1792, 2091, 1657, 1924, 1663, 1913, 1792, 1828, 1791, 1820, 1663, 2166, 1978, 2086, 1978, 1688, 1978, 1688, 1781, 1688, 1678, 1688, 1584, 1837, 1584, 2023, 1584,
            1408, 1737, 1484, 1740, 1484, 1874, 1314, 1859, 1304, 2060, 1484, 2052, 1486, 2196, 1490, 2271, 1484, 2394, 1012, 2394, 1012, 2052, 1190, 2052, 1189, 1866, 1012, 1874, 1012, 1740, 1084, 1739, 1151, 1739, 1347, 1738
        ]
        let q = [[1, 2, 6],
            [0, 2],
            [6, 0, 3, 1],
            [2, 6, 4, 5],
            [3, 5],
            [6, 3, 4],
            [3, 0, 2, 5],
            [18, 8],
            [18, 11, 9],
            [8, 10, 11],
            [9, 11],
            [18, 10, 12, 8, 9],
            [11, 18, 13],
            [18, 17, 12, 14],
            [17, 13, 16, 15],
            [16, 14],
            [17, 14, 15],
            [18, 14, 3, 13, 16],
            [12, 2, 3, 7, 8, 11, 13, 17],
            [8, 9, 20, 32],
            [19, 21, 31, 32, 35],
            [20, 22, 31, 30, 35],
            [21, 23, 30, 29, 28],
            [22, 24, 28, 27, 47, 46],
            [23, 25, 27, 26, 46],
            [24, 26, 73, 74, 73],
            [24, 25, 27],
            [26, 28, 23, 24],
            [29, 27, 22, 23, 102, 76],
            [28, 30, 22, 102],
            [31, 29, 21, 22],
            [32, 30, 20, 21],
            [31, 19, 20, 9],
            [38, 35, 34],
            [33, 35],
            [33, 34, 51, 38, 20, 21],
            [37, 51],
            [36, 51, 38],
            [37, 33, 51, 35],
            [40, 50],
            [50, 39, 41, 42],
            [40, 42],
            [41, 40, 43],
            [42, 44],
            [45, 43, 42, 40, 50, 46],
            [44, 46],
            [23, 24, 44, 45, 47, 50],
            [46, 48, 49, 50, 23],
            [49, 47],
            [48, 50],
            [49, 39, 40, 44, 47, 46],
            [36, 37, 38, 35, 20],
            [75, 53],
            [52, 75, 54, 55, 73, 74],
            [53, 55],
            [53, 54, 56, 57, 66, 72, 71, 73],
            [55, 57],
            [56, 58, 55, 66, 64, 59],
            [57, 59],
            [58, 57, 64, 62, 60],
            [59, 61, 62],
            [60, 62],
            [59, 60, 61, 63, 64],
            [62, 64],
            [62, 63, 57, 59, 65, 66],
            [66, 64],
            [55, 57, 64, 65, 68, 67, 71],
            [68, 66],
            [70, 69, 67, 71],
            [70, 68],
            [71, 68, 69],
            [66, 68, 72, 70],
            [55, 71, 55, 73],
            [72, 26, 25, 74, 53, 55],
            [25, 73, 75, 53],
            [74, 52, 53],
            [28, 102, 90, 77],
            [76, 78, 87, 90],
            [77, 79, 86, 87, 83],
            [78, 80, 83],
            [83, 79, 81, 82, 84],
            [80, 82],
            [80, 81, 85, 84, 95],
            [80, 78, 79, 84, 86],
            [80, 82, 85, 83],
            [86, 88, 84, 95, 82],
            [78, 83, 87, 85, 88],
            [86, 88, 77, 90, 78],
            [86, 87, 85, 89, 95],
            [96, 95, 88, 90, 92, 97],
            [76, 77, 102, 91, 92, 87, 89],
            [101, 102, 90, 94, 92],
            [91, 90, 89, 97, 93],
            [97, 92, 94, 98],
            [100, 101, 91, 99, 98, 93],
            [82, 96, 88, 89, 85],
            [89, 95, 97],
            [98, 96, 93, 92, 89],
            [99, 97, 93, 94],
            [100, 94, 98],
            [99, 94, 101],
            [100, 102, 91, 94],
            [29, 28, 101, 76, 90, 91],
            [120, 11, 104, 106, 105],
            [103, 105],
            [103, 104, 106],
            [103, 105, 107, 115, 120, 114],
            [106, 114, 108, 109, 110, 111, 112],
            [107, 109],
            [107, 108, 110],
            [107, 109, 111],
            [107, 112, 110],
            [111, 114, 107],
            [112, 114],
            [107, 113, 115, 112, 106],
            [114, 106, 116, 120, 119, 118],
            [117, 118, 115],
            [118, 116],
            [117, 116, 14, 13, 115, 119],
            [120, 13, 118, 115],
            [12, 11, 103, 106, 115, 119]
        ]
        let graph = new Graph()
        for (let i = 0; i < t.length; i += 2) {
            graph.add(t[i], t[i + 1])
        }
        console.log(graph)
        for (let i = 0; i < q.length; i++) {
            for (let j = 0; j < q[i].length; j++) {
                graph.addEdge(i, q[i][j])
            }
        }
        let nav = new NavMesh(graph, roomSizeX, roomSizeY)
        return nav
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
