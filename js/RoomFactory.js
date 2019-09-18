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
        let testRoomSize = 100;
        let room = new Room("Test Room", testRoomSize, testRoomSize);
        if (object === undefined) {
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
            //Spawn
            room.drawRandomGrass(79, 0, 20, 99)
            room.drawRandomGrass(0, 79, 99, 20)
            room.Add(TilesFactory.CreateEnter(73, 78.5))
            room.drawDirt(67, 86, 11, 2)
            room.drawRandomDirtGrassL(91, 86, 0, 3)
            room.drawRandomDirtGrassL(79, 86, 0, 2)
            room.Add(TilesFactory.CreateHouse9(81.2, 79.7))
            room.drawRandomDirtGrassT(67, 89, 11, 0)
            room.drawRandomDirtGrassB(71, 85, 7, 0)
            room.Add(TilesFactory.CreateFence3(73.3, 87))
            room.Add(TilesFactory.CreateFence2(66.5, 86.8))
            room.Add(TilesFactory.CreateFence5(69.5, 86.9))
            room.Add(TilesFactory.CreateFence6(70.5, 82.9))
            room.Add(TilesFactory.CreateFence6(67, 82.9))
            room.Add(TilesFactory.CreateFence5(71, 83.7))
            room.Add(TilesFactory.CreateFence6(78.5, 86))
            room.drawFence7(67, 72 ,0, 10)
            room.drawFence7(67, 85 ,0, 3)
            room.drawFence7(78.5, 84.5 ,0, 2)
            room.drawFence7(70.5, 61 ,0, 22)
            room.Add(TilesFactory.CreateFenOff(67.05, 71))
            room.Add(TilesFactory.CreateFenOff(67.05, 68.5))
            room.Add(TilesFactory.CreateFenOff(67.05, 62.5))
            room.drawFence7(67, 63 ,0, 6)
            room.Add(TilesFactory.CreateFenOff(67.05, 59.5))
            room.Add(TilesFactory.CreateFenOff(70.6, 59.5))
            room.Add(TilesFactory.CreateFence3(59, 61.9))
            room.Add(TilesFactory.CreateFence5(63.5, 61.9))
            room.Add(TilesFactory.CreateFence5(51.5, 58))
            room.Add(TilesFactory.CreateFence5(55, 58.1))
            room.Add(TilesFactory.CreateFence5(59.2, 58.8))
            room.Add(TilesFactory.CreateFence5(63, 58.9))
            room.Add(TilesFactory.CreateFence5(51.5, 61))
            room.Add(TilesFactory.CreateFence5(55, 61.1))
            room.Add(TilesFactory.CreateFence5(48, 61))
            room.Add(TilesFactory.CreateFenOff(58.7, 59))
            room.Add(TilesFactory.CreateFenOff(51, 58.6))
            room.Add(TilesFactory.CreateFenOff(51, 48.6))
            room.Add(TilesFactory.CreateFenOff(47.5, 48.6))
            room.Add(TilesFactory.CreateFenOff(47.5, 61.5))
            room.drawFence7(47.5, 50, 0, 12)
            room.drawFence7(50.9, 50, 0, 9)
            room.drawFen(31, 39.5, 18, 0)
            room.Add(TilesFactory.CreateFenOff(30.5, 39))
            room.Add(TilesFactory.CreateFenOff(30.4, 45.6))
            room.drawFen(30.5, 46, 17, 0)
            room.Add(TilesFactory.CreateFenOff(50, 39))
            room.Add(TilesFactory.CreateFenOff(50, 45.5))
            room.Add(TilesFactory.CreateFenOff(48.3, 45.5))
            room.drawFence7(50, 40, 0, 6)
            room.drawDirt(31, 39, 20, 10)
            room.drawDirt(16, 47, 14, 0)
            room.drawNecropolis(31, 40, 18, 6)
            room.drawNecropolisDirt(50, 40, 0, 6)
            room.drawNecropolisDirt2(30, 40, 0, 6)
            room.drawFence7(30, 40, 0, 1)
            room.drawFence7(30.3, 43.5, 0, 2)
            room.drawDirt(48, 50, 2, 10)
            room.drawRandomDirtGrassR(47, 50, 0, 12)
            room.drawRandomDirtGrassL(51, 50, 0, 10)
            room.drawDirt(48, 60, 10, 2)
            room.drawRandomDirtGrassT(48, 63, 10, 0)
            room.drawDirt(67, 68, 3, 17)
            room.drawRandomDirtGrassR(66, 64, 0, 24)
            room.drawRandomDirtGrassL(71, 62, 0, 22)
            room.drawDirt(59, 61, 8, 2)
            room.drawRandomDirtGrassT(59, 64, 6, 0)
            room.drawRandomDirtGrassB(59, 60, 8, 0)
            room.drawRandomDirtGrassB(68, 61, 2, 0)
            room.drawDirt(67, 62, 3, 5)
            room.Add(TilesFactory.CreateHouse2(73, 87.5))
            room.Add(TilesFactory.CreateHouse1(62, 87.5))
            room.Add(TilesFactory.CreateBigOak(71, 57))
            room.Add(TilesFactory.CreateBigOak(71, 60))
            room.Add(TilesFactory.CreateBigOak(71, 64))
            room.Add(TilesFactory.CreateBigOak(71, 68))
            room.Add(TilesFactory.CreateBigOak(71, 72))
            room.Add(TilesFactory.CreateBigOak(71, 76))
            room.Add(TilesFactory.CreateBigOak(71, 80))
            room.Add(TilesFactory.CreateBigOak(74, 57))
            room.Add(TilesFactory.CreateBigBirch(73.5, 60.5))
            room.Add(TilesFactory.CreateBigBirch(73, 63))
            room.Add(TilesFactory.CreateBigOak(74.5, 65.5))
            room.Add(TilesFactory.CreateBigBirch(74, 68.4))
            room.Add(TilesFactory.CreateBigOak(74.5, 71))
            room.Add(TilesFactory.CreateBigOak(74, 74))
            room.Add(TilesFactory.CreateBigBirch(74.4, 80))
            room.Add(TilesFactory.CreateBigBirch(77.5, 81))
            room.Add(TilesFactory.CreateBigBirch(76.5, 54))
            room.Add(TilesFactory.CreateBigBirch(76.7, 56.8))
            room.Add(TilesFactory.CreateBigOak(76, 60))
            room.Add(TilesFactory.CreateBigBirch(75.5, 63))
            room.Add(TilesFactory.CreateBigBirch(77.7, 71.5))
            room.Add(TilesFactory.CreateBigBirch(77.2, 74))
            room.Add(TilesFactory.CreateBigBirch(76.4, 76.6))
            room.Add(TilesFactory.CreateBigOak(77, 68))
            room.drawBigForest(78, 59, 7, 20)
            //Trail
            room.drawDirt(58, 70, 1, 23)
            room.drawRandomDirtGrassR(57, 70, 0, 26)
            room.drawRandomDirtGrassB(58, 69, 7, 0)
            room.drawRandomDirtGrassT(60, 72, 6, 0)
            room.drawRandomDirtGrassL(60, 72, 0, 20)
            room.drawRandomDirtGrassB(60, 92, 5, 0)
            room.drawDirt(60, 70, 6, 1)
            room.drawDirt(58, 93, 32, 2)
            room.Add(TilesFactory.CreateTumbleTree1(64, 69.5))
            room.Add(TilesFactory.CreateTumbleTree2(60, 70))
            room.Add(TilesFactory.CreateTumbleTree4(63.5, 72.25))
            room.Add(TilesFactory.CreateTumbleTree3(63.5, 73))
            room.Add(TilesFactory.CreateTumbleTree4(60, 76))
            room.Add(TilesFactory.CreateTumbleTree4(65, 79))
            room.Add(TilesFactory.CreateTumbleTree4(65.5, 86))
            room.Add(TilesFactory.CreateTumbleTree3(60, 88))
            room.Add(TilesFactory.CreateTumbleTree2(60, 82.5))
            room.Add(TilesFactory.CreateTumbleTree3(60, 79))
            room.Add(TilesFactory.CreateTumbleTree2(61.5, 75))
            room.Add(TilesFactory.CreateTumbleTree2(62, 85))
            room.Add(TilesFactory.CreateTumbleTree2(63.5, 81))
            room.Add(TilesFactory.CreateTumbleTree2(71, 89))
            room.Add(TilesFactory.CreateTumbleTree2(81.5, 89))
            room.Add(TilesFactory.CreateTumbleTree4(84, 89))
            room.Add(TilesFactory.CreateTumbleTree2(79, 83))
            room.Add(TilesFactory.CreateTumbleTree3(85, 88))
            room.Add(TilesFactory.CreateTumbleTree2(89.5, 87.5))
            room.Add(TilesFactory.CreateBigOak(73, 78))
            room.Add(TilesFactory.CreateBigOak(77, 78))
            room.Add(TilesFactory.CreateBigOak(80.5, 78))
            room.Add(TilesFactory.CreateBigOak(80, 80))
            room.Add(TilesFactory.CreateBigOak(84, 78))
            room.Add(TilesFactory.CreateBigOak(88, 78))
            room.Add(TilesFactory.CreateBigOak(92, 78))
            room.Add(TilesFactory.CreateBigOak(96, 78))
            room.drawNecropolis(58, 63, 0, 0)
            room.drawNecropolis(58, 64, 8, 5)
            room.drawNecropolis(52, 63, 5, 32)
            room.drawNecropolis(79, 86, 11, 2)
            room.drawNecropolis(60, 72, 6, 20)
            room.drawNecropolis(60, 89, 30, 3)
            room.drawDirt(67, 55, 3, 8)
            room.drawDirt(64, 47, 9, 7)
            room.Add(TilesFactory.CreateFence5(64, 45))
            room.Add(TilesFactory.CreateFence5(70, 45))
            room.drawFen(67.5, 46, 2, 0)
            room.Add(TilesFactory.CreateFenOff(63.9, 45.6))
            room.Add(TilesFactory.CreateFenOff(73.5, 45.6))
            room.Add(TilesFactory.CreateFenOff(63.9, 53.6))
            room.Add(TilesFactory.CreateFenOff(73.5, 53.6))
            room.drawFence7(63.9, 45.6, 0 ,8)
            room.drawFence7(73.4, 45.6, 0 ,8)
            room.Add(TilesFactory.CreateFenOff(67.1, 53.6))
            room.Add(TilesFactory.CreateFenOff(70.6, 53.6))
            room.drawFence7(67, 53.6, 0 ,6)
            room.drawFence7(70.5, 53.6, 0 ,6)
            room.drawFen(63.9, 54, 2.5, 0)
            room.drawFen(70.1, 54, 2.5, 0)
            room.Add(TilesFactory.CreateBigOak(63, 41))
            room.Add(TilesFactory.CreateBigOak(67, 41))
            room.Add(TilesFactory.CreateBigOak(71, 41))
            room.Add(TilesFactory.CreateBigOak(63.5, 53))
            room.Add(TilesFactory.CreateBigOak(71, 54))
            room.Add(TilesFactory.CreateBigOak(61, 42))
            room.Add(TilesFactory.CreateBigOak(61, 46))
            room.Add(TilesFactory.CreateBigOak(61, 50))
            room.Add(TilesFactory.CreateBigOak(61, 54.5))
            room.Add(TilesFactory.CreateBigOak(73.5, 42))
            room.Add(TilesFactory.CreateBigOak(73.5, 46))
            room.Add(TilesFactory.CreateBigOak(73.5, 50))
            room.Add(TilesFactory.CreateBigOak(73.5, 54.5))
            room.Add(TilesFactory.CreateBigTent(64.7, 47))
            room.Add(TilesFactory.CreateCart5(70.5, 46))
            room.Add(TilesFactory.CreateCart(70.4, 49.3))
            room.Add(TilesFactory.CreateAngleTent2(71.5, 52))
            room.Add(TilesFactory.CreateCart2(67.4, 46))
            room.Add(TilesFactory.CreateWell(68.4, 49))
            room.Add(TilesFactory.CreateAngleTent1(64.7, 52))
            room.Add(TilesFactory.CreateAngleTent1(64.7, 49.8))
            room.Add(TilesFactory.CreateBigOak(51, 46))
            room.Add(TilesFactory.CreateBigOak(51, 50))
            room.Add(TilesFactory.CreateBigOak(51, 54))
            room.Add(TilesFactory.CreateBigOak(54, 54))
            room.Add(TilesFactory.CreateBigOak(57.5, 54.5))
            room.drawNecropolisDirt(67, 64, 0, 5)
            room.drawNecropolisDirt(67, 72, 0, 15)
            room.drawGrassDirt(67, 55, 0, 5)
            //Cementery
            room.drawNecropolis(48, 63, 3, 32)
            room.drawFence7(47.45, 63, 0, 32)
            room.Add(TilesFactory.CreateTumbleTree4(57.3, 62.6))
            room.Add(TilesFactory.CreateTumbleTree2(60.3, 60.9))
            room.Add(TilesFactory.CreateTumbleTree3(63.8, 62.2))
            room.Add(TilesFactory.CreateTumbleTree4(65.2, 66.7))
            room.Add(TilesFactory.CreateTumbleTree3(60, 65.3))
            room.Add(TilesFactory.CreateTumbleTree2(58, 62.9))
            room.Add(TilesFactory.CreateTumbleTree4(57, 66.7))
            room.Add(TilesFactory.CreateTumbleTree2(55, 65))
            room.Add(TilesFactory.CreateTumbleTree2(53, 60))
            room.Add(TilesFactory.CreateTumbleTree4(55, 64))
            room.Add(TilesFactory.CreateTumbleTree2(50, 62))
            room.Add(TilesFactory.CreateTumbleTree3(51, 65))
            room.Add(TilesFactory.CreateTumbleTree4(48.5, 64))
            room.Add(TilesFactory.CreateTumbleTree4(49.5, 67))
            room.Add(TilesFactory.CreateNecropolisTree2(30.6, 42))
            room.Add(TilesFactory.CreateNecropolisTree(48, 38))
            room.Add(TilesFactory.CreateTombstone6(47.4, 40.1))
            room.Add(TilesFactory.CreateTombstone5(49, 40.8))
            room.Add(TilesFactory.CreateTombstone4(37.9, 40))
            room.Add(TilesFactory.CreateTombstone7(45, 41.5))
            room.Add(TilesFactory.CreateTombstone9(39.8, 42.2))
            room.Add(TilesFactory.CreateTombstone10(36, 41.5))
            room.Add(TilesFactory.CreateTombstone11(42, 40.5))
            room.Add(TilesFactory.CreateTombstone8(34, 41))
            room.Add(TilesFactory.CreateDeadNpc2(32.3, 38.5))
            room.Add(TilesFactory.CreateDeadNpc1(46, 42.6))
            room.Add(TilesFactory.CreateTombstone7(36.5, 44.5))
            room.Add(TilesFactory.CreateTombstone10(42.5, 43.8))
            room.Add(TilesFactory.CreateTombstone8(44.5, 45))
            room.Add(TilesFactory.CreateTombstone11(47.9, 43.8))
            room.drawNecropolisFloor(30, 43, 19, 0)
            room.drawNecropolisFloor(39, 42, 2, 2)
            room.drawNecropolisFloor(49, 44, 0, 2)
            room.drawNecropolisFloor(40, 40, 0, 1)
            room.drawNecropolisFloor(40, 45, 0, 1)
            room.drawNecropolisFloor(30, 40, 0, 2)
            room.drawNecropolisFloor(31, 40, 0, 3)
            //Right village
            room.Add(TilesFactory.CreateBigOak(63, 31.5))
            room.Add(TilesFactory.CreateBigOak(59.5, 32.8))
            room.Add(TilesFactory.CreateBigOak(54.6, 32.8))
            room.Add(TilesFactory.CreateBigOak(67.5, 33))
            room.drawDirt(54, 38, 2, 0)
            room.drawDirt(54, 39, 44, 2)
            room.drawDirt(82, 40, 2, 10)
            room.drawFen(54, 41.5, 27, 0)
            room.drawFen(84.5, 41.5, 14, 0)
            room.Add(TilesFactory.CreateFenOff(53.7, 41.05))
            room.Add(TilesFactory.CreateFenOff(53.7, 48.55))
            room.drawFence7(53.7, 42, 0, 7)
            room.drawFen(51.5, 49, 2, 0)
            room.Add(TilesFactory.CreateBigOak(54, 41))
            room.Add(TilesFactory.CreateBigOak(58, 41))
            room.Add(TilesFactory.CreateBigOak(53, 45))
            room.Add(TilesFactory.CreateBigOak(56, 44))
            room.Add(TilesFactory.CreateBigOak(58, 46))
            room.Add(TilesFactory.CreateBigOak(53.5, 48))
            room.Add(TilesFactory.CreateBigOak(55.5, 50))
            room.Add(TilesFactory.CreateBigOak(58.5, 52))
            room.drawFen(51.5, 38, 19, 0)
            room.drawFence7(71.4, 32.3, 0, 5)
            room.Add(TilesFactory.CreateFenOff(71.5, 37.6))
            room.drawDirt(72, 32, 14, 6)
            room.Add(TilesFactory.CreateHouse4(85, 30))
            room.drawFence7(84.5, 20, 0, 17)
            room.drawFence7(81.5, 20, 0, 11)
            room.Add(TilesFactory.CreateFenOff(81.5, 30.7))
            room.drawFen(79.5, 31, 1, 0)
            room.drawRandomDirtGrassL(85, 32, 0, 6)
            room.drawRandomDirtGrassB(86, 38, 14, 0)
            room.drawDirt(99, 39, 0, 2)
            room.drawLineForest(98, 15, 0, 40)
            room.Add(TilesFactory.CreateFenOff(84.5, 37.6))
            room.Add(TilesFactory.CreateFenOff(84.5, 41.15))
            room.Add(TilesFactory.CreateGate(84.6, 38.15))
            room.Add(TilesFactory.CreateGate(84.6, 40.15))
            room.Add(TilesFactory.CreateHouse7(83.5, 38))
            room.drawRandomDirtGrassL(85, 45, 0, 3)
            room.drawRandomDirtGrassB(86, 48, 14, 0)
            room.drawDirt(82, 49, 18, 2)
            room.Add(TilesFactory.CreateFenOff(81.7, 41.15))
            room.Add(TilesFactory.CreateHouse8(77.5, 42))
            room.drawRandomDirtGrassR(81, 42, 0, 6)
            room.drawDirt(77, 49, 5, 2)
            room.drawFence7(84.5, 41.5, 0, 6)
            room.drawFence7(81.6, 42, 0, 6)
            room.Add(TilesFactory.CreateFenOff(84.5, 47.4))
            room.Add(TilesFactory.CreateFenOff(84.5, 51.2))
            room.Add(TilesFactory.CreateGate(84.6, 48.3))
            room.Add(TilesFactory.CreateGate(84.6, 50))
            room.Add(TilesFactory.CreateFenOff(81.5, 47.4))
            room.Add(TilesFactory.CreateFenOff(81.5, 51.2))
            room.Add(TilesFactory.CreateFenOff(76.8, 47.4))
            room.Add(TilesFactory.CreateFenOff(76.8, 51.2))
            room.drawDirt(77, 48, 4, 0)
            room.drawFen(77, 51.5, 21, 0)
            room.drawFence7(76.8, 42, 0, 10)
            room.Add(TilesFactory.CreateBigOak(76, 51))
            room.Add(TilesFactory.CreateBigOak(80, 51))
            room.Add(TilesFactory.CreateBigOak(84, 51))
            room.Add(TilesFactory.CreateBigOak(88, 51))
            room.Add(TilesFactory.CreateBigOak(92, 51))
            room.Add(TilesFactory.CreateBigOak(96, 51))
            room.Add(TilesFactory.CreateBigOak(79, 54))
            room.Add(TilesFactory.CreateBigBirch(81, 54))
            room.Add(TilesFactory.CreateBigOak(83, 54))
            room.Add(TilesFactory.CreateBigBirch(86, 54))
            room.Add(TilesFactory.CreateBigBirch(90, 54))
            room.Add(TilesFactory.CreateBigBirch(88, 55))
            room.Add(TilesFactory.CreateBigOak(94, 54))
            room.Add(TilesFactory.CreateBigBirch(98, 54))
            room.Add(TilesFactory.CreateBigOak(91, 79.5))
            room.Add(TilesFactory.CreateBigOak(93.5, 81))
            room.Add(TilesFactory.CreateBigOak(96, 80))
            room.drawDirt(82, 20, 2, 12)
            room.Add(TilesFactory.CreateHouse5(65.9, 22))
            room.Add(TilesFactory.CreateCastle(74, 5))
            room.drawDirt(76, 10, 12, 9)
            room.Add(TilesFactory.CreateCart3(79.8, 37.5))
            room.Add(TilesFactory.CreateTable(72.6, 33.5))
            room.Add(TilesFactory.CreateTable(72.6, 35.5))
            room.Add(TilesFactory.CreateTable(72.6, 37.5))
            room.Add(TilesFactory.CreateBarrels(76.3, 36.2))
            room.Add(TilesFactory.CreateTent3(76.3, 31))
            room.Add(TilesFactory.CreateTent4(79, 31))
            room.Add(TilesFactory.CreateTent1(76.3, 33.5))
            room.Add(TilesFactory.CreateTent2(79, 33.5))
            room.Add(TilesFactory.CreateShed(71.95, 31))
            room.Add(TilesFactory.CreateWell(78.3, 36))
            room.Add(TilesFactory.CreateBigOak(78.3, 22.5))
            room.Add(TilesFactory.CreateBigBirch(78.8, 27))
            room.Add(TilesFactory.CreateBigBirch(78.8, 19.5))
            room.Add(TilesFactory.CreateBigOak(84.3, 24.1))
            room.Add(TilesFactory.CreateBigBirch(84.2, 29))
            room.Add(TilesFactory.CreateBigOak(84.8, 19.7))
            room.Add(TilesFactory.CreateBigBirch(87.2, 22.8))
            room.Add(TilesFactory.CreateBigBirch(87.6, 25.1))
            room.Add(TilesFactory.CreateBigBirch(87.05, 27.65))
            room.Add(TilesFactory.CreateBigOak(87.8, 19.7))
            room.Add(TilesFactory.CreateBigBirch(90.2, 21.8))
            room.Add(TilesFactory.CreateBigOak(90.15, 23.4))
            room.Add(TilesFactory.CreateBigBirch(90.05, 27))
            room.Add(TilesFactory.CreateBigOak(92.85, 26.5))
            room.Add(TilesFactory.CreateBigOak(92.85, 18.5))
            room.Add(TilesFactory.CreateBigBirch(92.85, 22))
            room.Add(TilesFactory.CreateBigBirch(92.85, 24))
            room.Add(TilesFactory.CreateBigBirch(94.85, 29.5))
            room.Add(TilesFactory.CreateBigOak(94.85, 18.5))
            room.Add(TilesFactory.CreateBigOak(94.85, 22))
            room.Add(TilesFactory.CreateBigBirch(94.85, 26))
            room.Add(TilesFactory.CreateBigOak(93.85, 10.5))
            room.Add(TilesFactory.CreateBigOak(93.85, 14))
            room.Add(TilesFactory.CreateBigOak(90.85, 10.5))
            room.Add(TilesFactory.CreateBigBirch(90.85, 14))
            room.Add(TilesFactory.CreateBigBirch(75.95, 21.5))
            room.Add(TilesFactory.CreateBigOak(72.8, 21.5))
            room.Add(TilesFactory.CreateBigOak(72, 10.5))
            room.Add(TilesFactory.CreateBigBirch(72, 14.5))
            room.Add(TilesFactory.CreateBigOak(72, 17))
            room.Add(TilesFactory.CreateBigBirch(72, 20))
            room.Add(TilesFactory.CreateBigBirch(70, 12))
            room.Add(TilesFactory.CreateBigOak(69, 15))
            room.Add(TilesFactory.CreateBigOak(69, 19))
            room.Add(TilesFactory.CreateBigOak(67, 12))
            room.Add(TilesFactory.CreateBigBirch(66.8, 16.7))
            room.Add(TilesFactory.CreateBigOak(66, 20))
            room.Add(TilesFactory.CreateBigBirch(51.8, 34.5))
            room.Add(TilesFactory.CreateBigBirch(65, 34.5))
            room.Add(TilesFactory.CreateBigBirch(61.3, 31))
            room.Add(TilesFactory.CreateBigBirch(62.5, 33.5))
            room.Add(TilesFactory.CreateBigOak(57.5, 32))
            room.Add(TilesFactory.CreateHouse6(16.2, 49.3))
            room.Add(TilesFactory.CreateHouse2(36.25, 49))
            //Left area from dungeon
            room.drawNecropolis(16, 50, 31, 49)
            room.drawDirt(30, 49, 0, 3)
            room.drawDirt(29, 53, 2, 0)
            room.drawDirt(28, 54, 0, 0)
            room.drawDirt(32, 54, 0, 0)
            room.drawDirt(27, 55, 0, 2)
            room.drawDirt(33, 55, 0, 2)
            room.drawDirt(28, 58, 0, 0)
            room.drawDirt(32, 58, 0, 0)
            room.drawDirt(29, 59, 2, 0)
            room.drawDirt(30, 60, 0, 2)
            room.drawDirt(16, 62, 31, 0)
            room.drawFence7(33, 49.5, 0, 3)
            room.drawFen(16, 61.9, 31, 0)
            room.drawFen(33, 49, 1, 0)
            room.Add(TilesFactory.CreateFenOff(33, 48.8))
            room.Add(TilesFactory.CreateFenOff(33, 52.5))
            room.Add(TilesFactory.CreateFenOff(27.3, 48.8))
            room.Add(TilesFactory.CreateFenOff(27.3, 52.5))
            room.drawFence7(27.3, 49.5, 0, 3)
            room.drawFen(33, 49, 13.8, 0)
            room.Add(TilesFactory.CreateFenOff(15.9, 48.7))
            room.Add(TilesFactory.CreateFenOff(15.9, 61.5))
            room.drawFen(0.5, 49, 26, 0)
            room.drawFence7(15.9, 46.5, 0, 2)
            room.drawFence7(15.9, 49.5, 0, 12)
            room.drawDirt(34, 56, 8, 0)
            room.drawDirt(42, 55, 0, 0)
            room.drawDirt(23, 56, 3, 0)
            room.drawDirt(23, 54, 0, 1)
            room.Add(TilesFactory.CreateColumn(16, 45))
            room.Add(TilesFactory.CreateDungeonEnter(16.4, 45.37))
            room.drawNecropolis(0, 50, 15, 49)
            //Forrest surrounding the dungeon
            room.drawBigForest(4, 24, 8, 17)
            room.drawLineForest(13, 24, 0, 17)
            room.drawBigForest(3, 3, 6, 22)
            room.drawLineForest(12, 2, 0, 26)
            room.drawLineForest(13, 5, 50, 0)
            room.drawBigForest(13, 1, 50, 3)
            room.drawLineForest(56, 6, 0, 6)
            room.drawBigForest(58, 6, 6, 6)
            room.drawLineForest(58, 14, 6, 0)
            room.drawLineForest(63.5, 17, 0, 12)
            room.Add(TilesFactory.CreateBigOak(0, 43.5))
            room.Add(TilesFactory.CreateBigOak(4, 43.5))
            room.Add(TilesFactory.CreateBigOak(8, 43.5))
            room.Add(TilesFactory.CreateBigOak(12, 43.5))
            //Lower area from spawn
            room.drawNecropolis(48, 96, 51, 3)
            room.drawNecropolis(91, 86, 8, 9)
            room.drawDirt(91, 93, 9, 2)
            room.Add(TilesFactory.CreateTumbleTree2(81, 95))
            room.Add(TilesFactory.CreateTumbleTree3(75, 94))
            room.Add(TilesFactory.CreateTumbleTree4(87, 97))
            room.Add(TilesFactory.CreateTumbleTree3(60, 94))
            room.Add(TilesFactory.CreateTumbleTree2(66, 95))
            room.Add(TilesFactory.CreateTumbleTree4(72, 97))
            room.Add(TilesFactory.CreateTumbleTree2(91, 95))
            room.Add(TilesFactory.CreateTumbleTree2(94, 88))
            room.Add(TilesFactory.CreateTumbleTree2(96, 95))
            room.Add(TilesFactory.CreateTumbleTree2(97, 85))
            room.Add(TilesFactory.CreateTumbleTree4(93, 86))
            //Forest to the left of the trail
            room.Add(TilesFactory.CreateTumbleTree2(54, 69))
            room.Add(TilesFactory.CreateTumbleTree4(56, 74))
            room.Add(TilesFactory.CreateTumbleTree2(54, 75))
            room.Add(TilesFactory.CreateTumbleTree3(55, 80))
            room.Add(TilesFactory.CreateTumbleTree4(56, 86))
            room.Add(TilesFactory.CreateTumbleTree2(54.5, 88))
            room.Add(TilesFactory.CreateTumbleTree2(55, 92))
            room.Add(TilesFactory.CreateTumbleTree4(50, 69))
            room.Add(TilesFactory.CreateTumbleTree2(49.5, 71))
            room.Add(TilesFactory.CreateTumbleTree3(50, 75))
            room.Add(TilesFactory.CreateTumbleTree2(49, 80))
            room.Add(TilesFactory.CreateTumbleTree3(50.5, 85))
            room.Add(TilesFactory.CreateTumbleTree4(49, 90))
            room.Add(TilesFactory.CreateTumbleTree3(50.5, 90))
            room.Add(TilesFactory.CreateTumbleTree2(52, 93.5))
            //Forest in the ruined village
            room.Add(TilesFactory.CreateTumbleTree2(17, 57.5))
            room.Add(TilesFactory.CreateTumbleTree4(19, 55.5))
            room.Add(TilesFactory.CreateTumbleTree3(21, 57))
            room.Add(TilesFactory.CreateTumbleTree4(28, 60.3))
            room.Add(TilesFactory.CreateTumbleTree4(26, 51))
            room.Add(TilesFactory.CreateTumbleTree2(24.5, 56))
            room.Add(TilesFactory.CreateTumbleTree2(32, 57.2))
            room.Add(TilesFactory.CreateTumbleTree3(33.6, 49.8))
            room.Add(TilesFactory.CreateTumbleTree4(35, 54))
            room.Add(TilesFactory.CreateTumbleTree4(37, 57))
            room.Add(TilesFactory.CreateTumbleTree3(38, 57))
            room.Add(TilesFactory.CreateTumbleTree2(41.5, 58))
            room.Add(TilesFactory.CreateTumbleTree4(45, 58.5))
            room.Add(TilesFactory.CreateTumbleTree2(45.3, 53))
            room.Add(TilesFactory.CreateTumbleTree4(0, 50.5))
            room.Add(TilesFactory.CreateTumbleTree3(4, 49.5))
            room.Add(TilesFactory.CreateTumbleTree2(8, 50.5))
            room.Add(TilesFactory.CreateTumbleTree4(12, 50.5))
            room.Add(TilesFactory.CreateTumbleTree2(10.5, 52.8))
            room.Add(TilesFactory.CreateTumbleTree4(3, 54.5))
            room.Add(TilesFactory.CreateTumbleTree2(5.5, 53.5))
            room.Add(TilesFactory.CreateTumbleTree3(13, 55))
            room.Add(TilesFactory.CreateTumbleTree4(14, 54))
            room.Add(TilesFactory.CreateTumbleTree2(1.5, 55))
            room.Add(TilesFactory.CreateTumbleTree3(8, 57))
            room.Add(TilesFactory.CreateTumbleTree2(12.6, 58.5))
            room.Add(TilesFactory.CreateTumbleTree4(3, 61))
            room.Add(TilesFactory.CreateTumbleTree2(6, 61))
            room.Add(TilesFactory.CreateTumbleTree3(1, 63))
            room.Add(TilesFactory.CreateTumbleTree4(9, 65))
            room.Add(TilesFactory.CreateTumbleTree3(11.3, 63.5))
            room.Add(TilesFactory.CreateTumbleTree2(6.7, 65.8))
            room.Add(TilesFactory.CreateTumbleTree4(4, 68))
            room.Add(TilesFactory.CreateTumbleTree2(18, 62))
            room.Add(TilesFactory.CreateTumbleTree4(16, 64))
            room.Add(TilesFactory.CreateTumbleTree3(15, 66))
            room.Add(TilesFactory.CreateTumbleTree3(20, 65))
            room.Add(TilesFactory.CreateTumbleTree4(22, 63))
            room.Add(TilesFactory.CreateTumbleTree2(24, 61))
            room.Add(TilesFactory.CreateTumbleTree2(26, 65))
            room.Add(TilesFactory.CreateTumbleTree3(28, 61.5))
            room.Add(TilesFactory.CreateTumbleTree2(30.5, 66))
            room.Add(TilesFactory.CreateTumbleTree4(32, 64.5))
            room.Add(TilesFactory.CreateTumbleTree3(34, 63.5))
            room.Add(TilesFactory.CreateTumbleTree4(34, 63.5))
            room.Add(TilesFactory.CreateTumbleTree2(38, 60.5))
            room.Add(TilesFactory.CreateTumbleTree4(38, 66.5))
            room.Add(TilesFactory.CreateTumbleTree3(40, 66.5))
            room.Add(TilesFactory.CreateTumbleTree2(44, 61.5))
            room.Add(TilesFactory.CreateTumbleTree4(45, 65.5))
            room.Add(TilesFactory.CreateDrunkHuman(72, 31.8))
            //Dungeon
            room.Add(TilesFactory.CreateLattice2(29.5, 16.5))
            room.Add(TilesFactory.CreateLattice(30.8, 16.5))
            room.Add(TilesFactory.CreateLattice(32.8, 16.5))
            room.Add(TilesFactory.CreateLattice(34.71, 16.5))
            room.Add(TilesFactory.CreateMetalDoor(36.72, 16.77))
            room.Add(TilesFactory.CreateSkeleton1(33.5, 16))
            room.Add(TilesFactory.CreateTomb1(19, 16.2))
            room.Add(TilesFactory.CreateTomb2(23.3, 16))
            room.Add(TilesFactory.CreateSkeleton2(26, 39))
            room.Add(TilesFactory.CreateWardrobe(20.6, 38))
            room.Add(TilesFactory.CreateWardrobe2(27.5, 22))
            room.Add(TilesFactory.CreateTrap(41, 15.5))
            room.Add(TilesFactory.CreateTrap2(44, 16))
            room.Add(TilesFactory.CreateTrap2(47, 16))
            room.Add(TilesFactory.CreateBlood1(41, 16.5))
            room.Add(TilesFactory.CreateBlood1(42, 21.5))
            room.Add(TilesFactory.CreateState(39, 30))
            room.Add(TilesFactory.CreateGarbage1(35.5, 34))
            room.Add(TilesFactory.CreateGarbage2(42.5, 29.5))
            room.Add(TilesFactory.CreateBlood1(24, 38))
            room.Add(TilesFactory.CreateBlood1(22, 33.7))
            room.Add(TilesFactory.CreateBlood1(26, 29))
            room.Add(TilesFactory.CreateBlood1(30, 23.4))
            room.Add(TilesFactory.CreateBlood1(35, 24))
            room.Add(TilesFactory.CreateWardrobe2(32, 29))
            room.Add(TilesFactory.CreateWardrobe(34, 29))
            room.Add(TilesFactory.CreateWardrobe2(36, 29))
            room.Add(TilesFactory.CreateWardrobe2(52, 21))
            room.Add(TilesFactory.CreateGarbage1(58, 24))
            room.Add(TilesFactory.CreateGarbage2(52, 32))
            room.Add(TilesFactory.CreateSkeleton2(55.5, 27))
            room.Add(TilesFactory.CreateGarbage1(19, 32.5))
            room.Add(TilesFactory.CreateWardrobe(20, 22))
            room.Add(TilesFactory.CreateGarbage3(28, 38))
            room.Add(TilesFactory.CreateGarbage4(27.2, 32.5))
            room.Add(TilesFactory.CreateGarbage4(55, 22))
            room.Add(TilesFactory.CreateBench(35, 34.4))
            room.Add(TilesFactory.CreateBench(45.1, 34.4))
            room.Add(TilesFactory.CreateBench(45.1, 36.4))
            room.Add(TilesFactory.CreateSkeleton4(30, 16))
            room.Add(TilesFactory.CreateGarbage5(61.3, 25))
            room.Add(TilesFactory.CreateDeadPeople(50.3, 28))
            room.Add(TilesFactory.CreateBlood1(46.5, 25))
            room.Add(TilesFactory.CreateTrap4(49.8, 15))
            room.Add(TilesFactory.CreateTrap3(48, 18.5))
            room.Add(TilesFactory.CreateTrap5(44.4, 18.5))
            room.Add(TilesFactory.CreateBlood1(46.6, 18.3))
            room.Add(TilesFactory.CreateSkeleton3(22, 15.5))
            room.Add(TilesFactory.CreateLukeTile2(54.98, 26.8))

            room.Add(TilesFactory.CreateHPBottle(1300,1250))
            room.Add(TilesFactory.CreateManaBottle(1300,1200))
            room.Add(TilesFactory.CreateAttackBonus(1400,1250))

            room.type = "roundedRoom"
            let player = TilesFactory.CreatePlayer(3925, 4450)

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
            'a        a  d       a  d          1e                                                         \n' +
            'a        a  d       a  d           1e                                             \n' +
            'a        a  d       a  d           qx                                                       \n' +
            'a        a  d       a  d          q2                                                          \n' +
            'zsssse qs2  1sse qss2  1e qsssssssx                                                                               \n' +
            'a    d a       d a      d a       1wwe                                                                      \n' +
            'zqwwwx zwwwwe  d a      d a       d  1wwe                                                                       \n' +
            ' a          1wwx zwwwwwwx zwwwwwwwx     1wwe                                                                              \n' +
            ' a                                         1we                                                        \n' +
            ' a                                           1e                                                       \n' +
            ' a          qsssssssse qssssssssse    35      d                                                                   \n' +
            ' zse qsse qs2        d a         d            d                                                               \n' +
            '   d a  d a          d a         d            d                                                      \n' +
            '   d a  d a   qwwwwwwx zwwwwwwwwwx    35      d                                                        \n' +
            '   d a  d a   a                  d           qx                                                         \n' +
            '   d a  d a   a                  d         qs2                                                     \n' +
            ' qsx zwwx zse a   qe        qe   1e     qss2                                            \n' +
            ' a          d a   zx        zx    d  qss2                                                     \n' +
            ' a          d a                   1ss2                                                        \n' +
            ' a          d a                   d                                          \n' +
            ' zssse  qsssx a                   d                                                                               \n' +
            ' a   d  a     a                   d                                                              \n' +
            ' qsssx  zssse zsssssssssssssssssssx                                                                                         \n' +
            ' a          d                                                                                     \n' +
            ' a          d                                                                                     \n' +
            ' a          35                                                                                   \n' +
            ' a    35                                                                                           \n' +
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
        room.addMap(17, 13,
            '         9999       9999                         \n' +
            '999999999999999999999999999999999999                                    \n' +
            '9                                 99                                   \n' +
            '9666666666  666666666  666666666666999\n' +
            '9666666666  666666666  666666666666699\n' +
            '9666666666  666666666  660666666606699\n' +
            '9666666666  666666666  666666666666699\n' +
            '9666666666  666666666  666666666669999\n' +
            '9    666       666      666       99999999\n' +
            '9 6666666666   666      666       6669999999\n' +
            '99666666666666666666666666666666666666669999999\n' +
            ' 9606666660666660666666660666666666666666669999\n' +
            ' 96666666666666666666666666666666666666666666999\n' +
            ' 96666666666666666666666666666666666666666666699\n' +
            ' 96666666669999999999666         666666666666699\n' +
            ' 99666  6669999999999666         666666666666699\n' +
            ' 99666  66699996666666666666666666666666666666999\n' +
            ' 99666  66699996666666666666666666666666666666999\n' +
            ' 99666  66699996066666666666666066666666666666999\n' +
            ' 99666  6666999666666666666666666666666666669             \n' +
            ' 96666666666999666666666666666666666666669                \n' +
            ' 96066666606999666666666666666666666669                   \n' +
            ' 9666666666699966666666666666666669                       \n' +
            ' 9666666666699960666666666666660669                       \n' +
            ' 9999666699999966666666666666666669                       \n' +
            ' 9666666666699966666666666666666669                       \n' +
            ' 9666666666699\n' +
            ' 9606666660699\n' +
            ' 966666666666\n' +
            ' 966666666666\n' +
            ' 966666666666\n' +
            ' 960666666069\n' +
            ' 966666666669\n' +
            ' 966666666669\n' +
            ' 999999999999\n' +
            '  99999999999\n' +
            '  99999999999\n' +
            '             ')
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
            1408, 1737, 1484, 1740, 1484, 1874, 1314, 1859, 1304, 2060, 1484, 2052, 1486, 2196, 1490, 2271, 1484, 2394, 1012, 2394, 1012, 2052, 1190, 2052, 1189, 1866, 1012, 1874, 1012, 1740, 1084, 1739, 1151, 1739, 1347, 1738,
            1620,2209,1615,2142,1793,2136,1948,2136,1948,2192,2055,2197,2060,2136,2164,2136,2181,2188,2253,2182,2261,2136,2446,2136,2448,2209,2524,2215,2527,2245,2586,2256,2586,2406,
            2540,2297,2566,2334,2476,2356,2470,2307,2562,2408,2536,2402,2533,2379,2467,2380,2459,2410,2388,2410,2382,2369,2299,2366,2291,2410,
            2091,2410,2079,2245,2143,2253,2142,2312,2064,2298,2200,2306,2263,2306,2273,2368,2209,2388,1880,2337,1959,2334,1948,2391,1866,2381,1830,2410,1840,2330,1631,2316,1669,2136,1726,2162,1720,2199,1678,2206,1670,2155,1722,2164,1722,2207,1768,2225,1877,2187,1930,2188,1933,2263,1873,2252,2332,2175,2407,2185,2386,2235,2331,2237
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
        let data = '136 137\n' +
            '137 142\n' +
            '142 143\n' +
            '137 143\n' +
            '143 136\n' +
            '143 144\n' +
            '139 138\n' +
            '138 136\n' +
            '139 136\n' +
            '138 143\n' +
            '141 144\n' +
            '144 138\n' +
            '141 138\n' +
            '141 140\n' +
            '147 141\n' +
            '147 144\n' +
            '144 145\n' +
            '146 145\n' +
            '147 146\n' +
            '144 146\n' +
            '148 147\n' +
            '157 148\n' +
            '156 157\n' +
            '156 148\n' +
            '156 153\n' +
            '152 140\n' +
            '152 141\n' +
            '156 147\n' +
            '152 147\n' +
            '156 152\n' +
            '153 152\n' +
            '148 149\n' +
            '157 150\n' +
            '149 157\n' +
            '149 150\n' +
            '150 158\n' +
            '157 158\n' +
            '150 168\n' +
            '165 150\n' +
            '165 158\n' +
            '166 150\n' +
            '165 166\n' +
            '167 168\n' +
            '155 158\n' +
            '161 165\n' +
            '161 158\n' +
            '161 155\n' +
            '162 164\n' +
            '164 165\n' +
            '166 168\n' +
            '166 167\n' +
            '163 166\n' +
            '163 164\n' +
            '167 170\n' +
            '163 179\n' +
            '163 167\n' +
            '167 179\n' +
            '170 179\n' +
            '159 162\n' +
            '162 163\n' +
            '159 163\n' +
            '163 177\n' +
            '159 177\n' +
            '177 179\n' +
            '177 178\n' +
            '178 179\n' +
            '178 173\n' +
            '173 179\n' +
            '173 174\n' +
            '174 179\n' +
            '174 121\n' +
            '121 179\n' +
            '155 156\n' +
            '153 155\n' +
            '153 161\n' +
            '160 161\n' +
            '159 160\n' +
            '130 161\n' +
            '130 153\n' +
            '130 154\n' +
            '153 154\n' +
            '130 160\n' +
            '129 160\n' +
            '129 130\n' +
            '125 177\n' +
            '125 159\n' +
            '125 126\n' +
            '126 159\n' +
            '161 162\n' +
            '161 164\n' +
            '129 159\n' +
            '126 129\n' +
            '176 177\n' +
            '175 176\n' +
            '175 178\n' +
            '173 175\n' +
            '172 173\n' +
            '172 175\n' +
            '125 176\n' +
            '123 176\n' +
            '123 175\n' +
            '123 172\n' +
            '124 176\n' +
            '123 124\n' +
            '124 125\n' +
            '123 171\n' +
            '171 172\n' +
            '171 174\n' +
            '121 171\n' +
            '121 122\n' +
            '122 171\n' +
            '122 123\n' +
            '126 127\n' +
            '127 129\n' +
            '127 128\n' +
            '128 129\n' +
            '130 131\n' +
            '151 154\n' +
            '151 152\n' +
            '131 154\n' +
            '135 139\n' +
            '139 140\n' +
            '135 136\n' +
            '135 140\n' +
            '135 152\n' +
            '133 135\n' +
            '133 152\n' +
            '134 135\n' +
            '133 134\n' +
            '133 151\n' +
            '132 133\n' +
            '132 151\n' +
            '132 154\n' +
            '131 132'
        data = data.split("\n")
        data.forEach((last) => {
            let las = last.split(" ").map((last222) => {
                return Number(last222)
            })
            //graph.addEdge(las[0], las[1])
        })
        console.log(data)
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
