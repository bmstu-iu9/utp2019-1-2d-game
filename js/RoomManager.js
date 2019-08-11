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
     * и перемещает их на тайловой карте,если нужно
     */
    Update() {
        this.managableObj.updatableObjects.forEach(element => {
            this.refreshPosition(element)
            element.Update();
        });
    }


}