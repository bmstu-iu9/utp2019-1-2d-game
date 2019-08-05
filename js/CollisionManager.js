'use strict';
class CollisionManager {
    /**
     * @param {RoomManager} roomManager
     */
    constructor(roomManager){
        this.roomManager=roomManager;
    }

    collide(object){
        this.roomManager.middlegroundTiles.forEach(row => {
            row.forEach(col => {
                col.forEach(objectToCollideWith => {
                    if (objectToCollideWith.id!==object.id){
                        let collision=object.hitbox.getCollision(objectToCollideWith.hitbox);
                        if (collision){
                            object.hitbox.correctPosition(collision);
                            object.actor.changePosition(collision.distance);
                        }
                    }
                });
            });
        });
    }

}