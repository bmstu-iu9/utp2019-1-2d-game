'use strict';
/**
 * @class
 */
class World extends GameObject{
    /**
     * @param {String} id 
     */
    constructor(id = Game.getUniqId()){
        super(id);
        this.roomContaier = [];
        this.currentRoom = undefined;
        this.manager = new WorldManager(this)
        this.type = "world"
    }
    /**
     * Добавляет комнату в World
     * @param {Room} obj
     */
    AddRoom(obj){
        this.roomContaier.push(obj)
    }

    /**
     * Отрисовка World
     */
    render(){
        this.currentRoom.rnd.render(this.currentRoom);
    }
    /**
     * Вызов обработки игровой логики
     */
    Update(){
        this.manager.Update()
    }

    toJSON(){
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {World} object
     */
    static fromJSON(object){
        let world = new World(object.id)
        object.roomContaier.forEach(room => world.AddRoom(Room.fromJSON(room)))
        world.currentRoom = world.roomContaier.find(room => room.id === object.id)
        world.currentRoom = Room.fromJSON(object.currentRoom)
        return world;
    }
}