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
        this.managableObj.updatableObjects.forEach(element => {
            element.Update();
        });
    }


}