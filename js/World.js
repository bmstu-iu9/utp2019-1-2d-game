'use strict'

class World extends GameObject{
    /**
     * 
     * @param {String} id 
     */
    constructor(id = Game.getUniqId()){
        super(id)
        this.roomContaier = new Array
        this.currentRoom = undefined
        this.manager = new WorldManager(this)
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
        this.currentRoom.render();
    }
    /**
     * Вызов обработки игровой логики
     */
    Update(){
        this.manager.Update()
    }
}