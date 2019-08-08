'use strict';
class CollisionManager {
    /**
     * @param {Room} room
     */
    constructor(room){
        this.room=room;
    }

    collide(){
        this.room.quadTree.clear();
        this.room.middlegroundTiles.forEach(row=>{
            row.forEach(col=>{
                col.forEach(object=>{
                    if (object!==undefined && object!=null){
                        this.room.quadTree.add(object.hitbox);
                    }
                })
            })
        });
        let objects;
        this.room.middlegroundTiles.forEach(row=>{
            row.forEach(col=>{
                col.forEach(object=>{
                    if (!(object instanceof StaticObject)){
                        objects=this.room.quadTree.retrieve([],object.hitbox);
                        for (let objectToCollideWith of objects){
                            if (objectToCollideWith!==object.hitbox){
                                let collision=object.hitbox.getCollision(objectToCollideWith);
                                if (collision){
                                    collision.distance.set(~~collision.distance.x,~~collision.distance.y);
                                    object.hitbox.correctPosition(collision);
                                    object.actor.changePosition(collision.distance);
                                }
                            }
                        }
                    }
                })
            })
        });
    }
}
