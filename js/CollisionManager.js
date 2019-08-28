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
    
    /**
     * Needs refactoring
     */
    collide() {
        let objects,                             //Обекты проверяемые на наличие коллизии с object
            collision,                           //Объякт коллизии
            object,                              //Объект для которого проверяется наличие коллизий
            collideOffset = new Vector2d(0, 0),  //смещение объекта после разрешения коллизии
            isCollided                           //была ли коллизися хотя бы с одним объектом

        for (let j = 0; j < this.room.movedObjects.length; j++) {
            isCollided = false
            object = this.room.movedObjects[j]
            this.room.quadTree.update(object)
            objects = this.room.quadTree.retrieve([], object)
            collideOffset.set(0, 0)
            for (let i = 0; i < objects.length; i++) {
                if (object.collisonSolveStrategy === 'none' && objects[i].collisonSolveStrategy === 'none') {
                    continue
                }
                if (!objects[i].hitbox.equals(object.hitbox)) {
                    collision = getCollision(object.hitbox, objects[i].hitbox)
                    if (collision) {
                        isCollided = true && (object.collisonSolveStrategy === 'none' && objects[i].collisonSolveStrategy === 'none')
                        collision.obstacleObject = objects[i]
                        if (object.collisonSolveStrategy !== 'none') {
                            if (objects[i].collisonSolveStrategy === 'stay') {
                                collideOffset.add(object.actor.offset)
                                this.solveCollision(object, collision)
                                collideOffset.sub(object.actor.offset)
                                this.room.movedObjects.push(object)
                            }
                            else if (objects[i].collisonSolveStrategy === 'move') {
                                this.solveForBoth(object, objects[i], collision)
                                this.room.movedObjects.push(object)
                                this.room.movedObjects.push(objects[i])
                            }
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
            if (isCollided && collideOffset.isNullVector()) {
                throw "Collisions don't solved" // Если коллизии разрешить не удалось
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
        if (type !== undefined && centre !== undefined && vertices_or_radius !== undefined) {
            if (type === HITBOX_AABB) {
                this.hitbox = new AABB(centre, vertices_or_radius)
            } else if (type === HITBOX_CIRCLE) {
                this.hitbox = new CircleHitbox(centre, vertices_or_radius)
            }
            this.type = type
            this.hitboxPrevState = this.getCopy(type, this.hitbox)
        }
    }

    getCopy(type, hitbox) {
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

    toJSON() {
        return {
            type: this.type,
            current: this.hitbox,
            prev: this.hitboxPrevState
        }
    }

    /**
     * 
     * @param {Hitbox} obj 
     */
    static fromJSON(obj) {
        let h = new Hitbox()
        if (obj.type === HITBOX_AABB) {
            h.hitboxPrevState = AABB.fromJSON(obj.prev)
            h.hitbox = AABB.fromJSON(obj.current)
            h.type = obj.type
        }

        else if (obj.type === HITBOX_CIRCLE) {
            h.hitboxPrevState = CircleHitbox.fromJSON(obj.prev)
            h.hitbox = CircleHitbox.fromJSON(obj.current)
            h.type = obj.type
        }
        return h
    }
}

