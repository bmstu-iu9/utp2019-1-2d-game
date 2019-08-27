'use strict';
class CollisionManager {
    /**
     * @param {Room} room
     */
    constructor(room) {
        this.room = room;
    }

    /**
     * Разрешает коллизию, обновляет элементы в QuadTree
     * @param {(NPC\|StaticObject)} object 
     * @param {Collision} collision 
     */
    solveCollision(object, collision) {
        collision.distance.round()
        object.hitbox.correctPosition(collision);
        object.actor.changePosition(collision.distance);
        object.hitbox.update()
        this.room.quadTree.update(object)
        collision.distance.round()
    }

    solveForBoth(a, b, collision) {
        collision.distance.mul(1 / 1.5)
        collision.distance.round()
        a.hitbox.correctPosition(collision);
        a.actor.changePosition(collision.distance);
        a.hitbox.update()
        this.room.quadTree.update(a)
        collision.distance.mul(-1)
        collision.distance.round()
        b.hitbox.correctPosition(collision);
        b.actor.changePosition(collision.distance);
        b.hitbox.update()
        this.room.quadTree.update(b)
    }

    collide() {
        let objects, collision, object
        for (let j = 0; j < this.room.movedObjects.length; j++) {
            object = this.room.movedObjects[j]
            this.room.quadTree.update(object)
            objects = this.room.quadTree.retrieve([], object)
            for (let i = 0; i < objects.length; i++) {
                if (object.collisonSolveStrategy === 'none' && objects[i].collisonSolveStrategy === 'none') {
                    continue
                }
                if (!objects[i].hitbox.equals(object.hitbox)) {
                    collision = getCollision(object.hitbox, objects[i].hitbox)
                    if (collision) {
                        collision.obstacleObject = objects[i]
                        if (objects[i].collisonSolveStrategy === 'stay') {
                            this.solveCollision(object, collision)
                            this.room.movedObjects.push(object)
                        } 
                        else if (objects[i].collisonSolveStrategy === 'move') {
                            this.solveForBoth(object, objects[i], collision)
                            this.room.movedObjects.push(object)
                            this.room.movedObjects.push(objects[i])
                        }
                        if (object.onCollide) {
                            object.onCollide(collision)
                        }
                        if (objects[i].onCollide) {
                            objects[i].onCollide(collision)
                        }
                    }
                }
            }
        }
    }
}


const HITBOX_AABB = 'AABB'
const HITBOX_CIRCLE = 'CircleHitbox'

class Hitbox {
    /**
     *
     * @param {String} type
     * @param {Vector2d} centre
     * @param {Vector2d[],Number} vertices_or_radius
     */
    constructor(type, centre, vertices_or_radius) {
        const getCopy = (type, hitbox) => {
            if (type === HITBOX_AABB) {
                return new AABB(new Vector2d(hitbox.centre), [
                    new Vector2d(hitbox.vertices[0]),
                    new Vector2d(hitbox.vertices[1]),
                    new Vector2d(hitbox.vertices[2]),
                    new Vector2d(hitbox.vertices[3]),
                ], undefined).setId(hitbox.id)
            } else if (type === HITBOX_CIRCLE) {
                return new CircleHitbox(new Vector2d(hitbox.centre), hitbox.radius, undefined)
                    .setId(hitbox.id);
            }
        }
        if (type === HITBOX_AABB) {
            this.hitbox = new AABB(centre, vertices_or_radius)
        } else if (type === HITBOX_CIRCLE) {
            this.hitbox = new CircleHitbox(centre, vertices_or_radius)
        }
        this.hitboxPrevState = getCopy(type, this.hitbox)

    }

    equals(arg) {
        return this.hitbox.equals(arg.getHitbox())
    }

    /**
     *
     * @param {Vector2d} nextPosition
     */
    update(nextPosition = undefined) {
        this.hitboxPrevState.changePosition(this.hitbox.centre)
        if (nextPosition !== undefined)
            this.hitbox.changePosition(nextPosition)
    }

    /**
     *
     * @param {AABB,CircleHitbox} hitbox
     * @return {Collision|null}
     */
    getCollision(hitbox) {
        return this.hitbox.getCollision(hitbox)
    }

    getHitbox() {
        return this.hitbox
    }

    /**
     *
     * @param {Collision} collision
     */
    correctPosition(collision) {
        this.hitbox.correctPosition(collision)
    }
}

