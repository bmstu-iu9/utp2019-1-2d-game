'use strict';
class CollisionManager {
    /**
     * @param {Room} room
     */
    constructor(room) {
        this.room = room;
    }

    collide() {
        let objects;
        let collision;
        this.room.solidTiles.forEach(object => {
            if (object.manager instanceof PlayerManager) {
                this.room.quadTree.update([object])
                objects = this.room.quadTree.retrieve([], object.hitbox);
                for (let i = 0; i < objects.length; i++) {
                    if (objects[i] !== object.hitbox) {
                        collision = object.hitbox.getCollision(objects[i]);
                        if (collision) {
                            collision.distance.set(~~collision.distance.x, ~~collision.distance.y);
                            object.hitbox.correctPosition(collision);
                            object.actor.changePosition(collision.distance);
                        }
                    }
                }
            }
        })
    }
}
