'use strict';
class CollisionManager {
    /**
     * @param {Room} room
     */
    constructor(room){
        this.room=room;
    }

    collide(object){
        this.room.middlegroundTiles.forEach(row => {
            row.forEach(col => {
                col.forEach(objectToCollideWith => {
                    if (objectToCollideWith.id!==object.id){
                        let collision=object.hitbox.getCollision(objectToCollideWith.hitbox);
                        if (collision){
                            collision.distance.set(~~collision.distance.x,~~collision.distance.y);
                            object.hitbox.correctPosition(collision);
                            object.actor.changePosition(collision.distance);
                        }
                    }
                });
            });
        });
    }
}