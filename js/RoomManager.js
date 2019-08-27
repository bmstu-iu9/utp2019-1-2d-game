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
        this.element
    }

    /**
     *Обновляет позицию объекта на тайловой карте
     * @param obj
     */
    refreshPosition(obj){
        if (obj.drawable.placement === "middleground") {
            let prevI = ~~(obj.actor.prevPosition.y / Game.tileHeight)
            let prevJ = ~~(obj.actor.prevPosition.x / Game.tileWidth)
            let i = ~~(obj.actor.position.y / Game.tileHeight)
            let j = ~~(obj.actor.position.x / Game.tileWidth)
            if ((prevI !== i || prevJ !== j) && !this.managableObj.middlegroundTiles[i][j].hasId(obj)) {
                this.managableObj.middlegroundTiles[prevI][prevJ].delete(obj)
                this.managableObj.middlegroundTiles[i][j].set(obj)
            }
        }
    }


    /**
     * Обновляет все игровые объекты внури managebleObj (Room)
     */
    Update() {
        this.managableObj.movedObjects.splice(0)
        
        for (let i = 0, n = this.managableObj.updatableObjects.length; i < n; i++) {
            this.element = this.managableObj.updatableObjects[i]
            this.refreshPosition(this.element)
            this.element.Update()
            //Проверяем, переместился ли объект
            if (this.element.hitbox !== undefined && this.element.actor.offset !== undefined && (this.element.actor.offset.x !== 0 || this.element.actor.offset.y !== 0)) { 
                this.managableObj.movedObjects.push(this.element)
            }
        }
    }
}