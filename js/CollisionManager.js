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
     * @param {(NPC|StaticObject)} object
     * @param {Collision} collision 
     */
    solveCollision(object, collision) {
        collision.distance.round()
        object.hitbox.correctPosition(collision);
        object.actor.changePosition(collision.distance);
        object.hitbox.update()
        this.room.quadTree.update(object)
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
            collision,                           //Объект коллизии
            object,                              //Объект для которого проверяется наличие коллизий
            collideWith,
            next=[]

        for (let j = 0; j < this.room.movedObjects.length; j++) {
            object = this.room.movedObjects[j]
            if (!(object instanceof Spell))
                this.room.quadTree.update(object)
            objects = this.room.quadTree.retrieve([], object)
            console.log(objects.length)
            for (let i = 0; i < objects.length; i++) {
                collideWith = objects[i]
                if (object.collisonSolveStrategy === 'none' && collideWith.collisonSolveStrategy === 'none') {
                    continue
                }
                if (!objects[i].hitbox.equals(object.hitbox)) {
                    collision = getCollision(object.hitbox, collideWith.hitbox)
                    if (collision) {
                        collision.obstacleObject = collideWith
                        if (object.collisonSolveStrategy !== 'none') {
                            if (collideWith.collisonSolveStrategy === 'stay') {
                                if (object.collisonSolveStrategy==='hit'){
                                    Game.currentWorld.currentRoom.delete(object)
                                }else {
                                    this.solveCollision(object, collision)
                                    next.push(object)
                                }
                            }
                            else if (collideWith.collisonSolveStrategy === 'move') {
                                if (object.collisonSolveStrategy==='hit'){
                                    Game.currentWorld.currentRoom.delete(object)
                                }else {
                                    this.solveForBoth(object, objects[i], collision)
                                    next.push(object,objects[i])
                                }
                            }else if (collideWith.collisonSolveStrategy==='hit'){
                                Game.currentWorld.currentRoom.delete(collideWith)
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
        }
        this.room.movedObjects=next
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

    /**
     * @param {Number} angle
     * @param {Vector2d} dot
     */
    rotateRadian(angle,dot=undefined){
        this.hitbox.rotateRadian(angle,dot)
    }

    /**
     * @param {Number} angle
     * @param {Vector2d} dot
     */
    rotateDegrees(angle,dot=undefined){
        this.hitbox.rotateDegrees(angle,dot)
    }

    toJSON() {
        return {
            type: this.type,
            hitbox: this.hitbox,
            hitboxPrevState: this.hitboxPrevState
        }
    }

    /**
     * 
     * @param {Hitbox} obj 
     */
    static fromJSON(obj) {
        let h = new Hitbox(HITBOX_AABB,new Vector2d(0,0),[new Vector2d(0,0),
            new Vector2d(0,0),new Vector2d(0,0),new Vector2d(0,0)])
        if (obj.type === HITBOX_AABB) {
            h.hitboxPrevState = AABB.fromJSON(obj.hitboxPrevState)
            h.hitbox = AABB.fromJSON(obj.hitbox)
            h.type = obj.type
        }

        else {
            h.hitboxPrevState = CircleHitbox.fromJSON(obj.hitboxPrevState)
            h.hitbox = CircleHitbox.fromJSON(obj.hitbox)
            h.type = obj.type
        }
        return h
    }
}

