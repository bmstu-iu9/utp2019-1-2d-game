class WorldFactory{
    static CreateTestWorld(){
        let world = new World("Test World")
        world.currentRoom = RoomFactory.CreateRoundedRoom()
        return world
    }
}