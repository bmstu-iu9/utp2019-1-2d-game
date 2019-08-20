'use strict'

class RoomManager {
    /**
     * 
     * @param {Room} room 
     */
    constructor(room) {
        if (room === undefined) {
            throw "managableObj can not be undefined"
        }
        this.managableObj = room
    }

    /**
     * Обновляет все игровые объекты внури managebleObj (Room)
     */
    Update() {
        this.managableObj.movedObjects.splice(0)
        let element
        for (let i = 0, n = this.managableObj.updatableObjects.length; i < n; i++) {
            element = this.managableObj.updatableObjects[i]
            element.Update()
            //Проверяем, переместился ли объект
            if (element.actor.offset !== undefined && (element.actor.offset.x !== 0 || element.actor.offset.y !== 0)) { 
                this.managableObj.movedObjects.push(element)
            }
        }
    }
}