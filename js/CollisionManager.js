'use strict';
class CollisionManager {
    /**
     * @param {Room} room
     */
    constructor(room) {
        this.room = room;
    }

    collide() {
        let objects,collision;
        this.room.solidTiles.forEach(object => {
            if (object.manager instanceof PlayerManager) {
                this.room.quadTree.update(object)
                objects = this.room.quadTree.retrieve([], object.hitboxManager.hitbox);
                for (let i = 0; i < objects.length; i++) {
                    if (objects[i] !== object.hitboxManager.hitbox) {
                        collision = object.hitboxManager.hitbox.getCollision(objects[i]);
                        if (collision) {
                            collision.distance.set(Math.ceil(collision.distance.x), Math.ceil(collision.distance.y));
                            object.hitboxManager.hitbox.correctPosition(collision);
                            object.actor.changePosition(collision.distance);
                        }
                    }
                }
            }
        })
    }
}
