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
     * и перемещает их на тайловой карте,если нужно
     */
    Update() {
        this.managableObj.updatableObjects.forEach(element => {
            element.Update();
            if (element.drawable.placement === "middleground") {
                let prevI = ~~(element.actor.prevPosition.y / Game.tileHeight)
                let prevJ = ~~(element.actor.prevPosition.x / Game.tileWidth)
                let i = ~~(element.actor.position.y / Game.tileHeight)
                let j = ~~(element.actor.position.x / Game.tileWidth)
                if ((prevI !== i || prevJ !== j) && !this.managableObj.middlegroundTiles[i][j].hasId(element)) {
                    this.managableObj.middlegroundTiles[prevI][prevJ].delete(element)
                    this.managableObj.middlegroundTiles[i][j].set(element)
                }
            }
        });
    }


}