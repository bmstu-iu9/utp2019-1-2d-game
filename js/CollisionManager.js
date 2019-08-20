'use strict';
class CollisionManager {
    /**
     * @param {Room} room
     */
    constructor(room) {
        this.room = room;
    }

    collide() {
        const updateConfig=(object,collision)=>{
            object.hitbox.update()
            object.hitbox.correctPosition(collision)
            this.room.quadTree.update(object)
            object.actor.changePosition(collision.distance)
        }
        let objects,collision;
        this.room.solidTiles.forEach(object => {
            if (object.actor instanceof MovableActor) {
                this.room.quadTree.update(object)
                objects = this.room.quadTree.retrieve([], object)
                for (let i = 0; i < objects.length; i++) {
                    if (!objects[i].hitbox.equals(object.hitbox)) {
                        collision = getCollision(object.hitbox,objects[i].hitbox)
                        if (collision) {
                            collision.round()
                            if (objects[i].actor instanceof MovableActor){
                                collision.distance.mul(1/2)
                                collision.distance.set(Math.ceil(collision.distance.x), Math.ceil(collision.distance.y))
                                updateConfig(object,collision)
                                collision.distance.mul(-1)
                                updateConfig(objects[i],collision)
                            }else {
                                updateConfig(object,collision)
                            }

                        }
                    }
                }
            }
        })
    }
}


const HITBOX_AABB='AABB'
const HITBOX_CIRCLE='CircleHitbox'

class Hitbox{
    /**
     *
     * @param {String} type
     * @param {Vector2d} centre
     * @param {Vector2d[],Number} vertices_or_radius
     */
    constructor(type,centre,vertices_or_radius){
        const getCopy=(type,hitbox)=>{
            if (type===HITBOX_AABB) {
                return new AABB(new Vector2d(hitbox.centre), [
                    new Vector2d(hitbox.vertices[0]),
                    new Vector2d(hitbox.vertices[1]),
                    new Vector2d(hitbox.vertices[2]),
                    new Vector2d(hitbox.vertices[3]),
                ], undefined).setId(hitbox.id)
            }else if (type===HITBOX_CIRCLE) {
                return new CircleHitbox(new Vector2d(hitbox.centre), hitbox.radius, undefined)
                    .setId(hitbox.id);
            }
        }
        if (type===HITBOX_AABB){
            this.hitbox=new AABB(centre,vertices_or_radius)
        }else if (type===HITBOX_CIRCLE){
            this.hitbox=new CircleHitbox(centre,vertices_or_radius)
        }
        this.hitboxPrevState=getCopy(type,this.hitbox)

    }

    equals(arg){
        return this.hitbox.equals(arg.getHitbox())
    }

    /**
     *
     * @param {Vector2d} nextPosition
     */
    update(nextPosition=undefined){
        this.hitboxPrevState.changePosition(this.hitbox.centre)
        if (nextPosition!==undefined)
            this.hitbox.changePosition(nextPosition)
    }

    /**
     *
     * @param {AABB,CircleHitbox} hitbox
     * @return {Collision|null}
     */
    getCollision(hitbox){
        return this.hitbox.getCollision(hitbox)
    }

    getHitbox(){
        return this.hitbox
    }

    /**
     *
     * @param {Collision} collision
     */
    correctPosition(collision){
        this.hitbox.correctPosition(collision)
    }
}

