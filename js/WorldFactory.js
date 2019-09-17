class WorldFactory{
    static CreateTestWorld(){
        let world = new World("Test World")
        world.currentRoom = RoomFactory.CreateRoundedRoom()
        world.currentRoom.rnd = new RoomRenderer(6, world.currentRoom)
        return world
    }
}