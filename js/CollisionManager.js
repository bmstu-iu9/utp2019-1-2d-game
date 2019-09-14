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
        this.room.quadTree.update(object)
    }

    solveForBoth(a, b, collision) {
        collision.distance.mul(1 / 1.5)
        collision.distance.round()
        a.hitbox.correctPosition(collision);
        a.actor.changePosition(collision.distance);
        this.room.quadTree.update(a)
        collision.distance.mul(-1)
        collision.distance.round()
        b.hitbox.correctPosition(collision);
        b.actor.changePosition(collision.distance);
        this.room.quadTree.update(b)
    }
    
    /**
     * Needs refactoring
     */
    collide() {
        let objects,                             //Обекты проверяемые на наличие коллизии с object
            collision,                           //Объект коллизии
            object,                              //Объект для которого проверяется наличие коллизий
            next=new Set()

        while (this.room.movedObjects.length>0){
            object=this.room.movedObjects.pop()
            if (object.hitbox instanceof Hitbox)
                this.room.quadTree.update(object)
            objects=this.room.quadTree.retrieve([],object)
            for (let i=0;i<objects.length;i++){
                if (!object.hitbox.equals(objects[i].hitbox)){
                    collision=getCollision(object.hitbox,objects[i].hitbox)
                    if (collision){
                        collision.obstacleObject=objects[i]
                        if (object.collisonSolveStrategy!=='none' && object.collisonSolveStrategy!=='hit'){
                            if (objects[i].collisonSolveStrategy==='stay'){
                                this.solveCollision(object,collision)
                                next.add(object)
                            }else if (objects[i].collisonSolveStrategy==='move'){
                                this.solveForBoth(object,objects[i],collision)
                                next.add(object)
                                next.add(objects[i])
                            }
                        }
                        if (object.onCollide!==undefined){
                            object.onCollide(collision)
                        }
                        if (objects[i].onCollide!==undefined){
                            collision.obstacleObject=object;
                            objects[i].onCollide(collision)
                        }
                    }
                }
            }
        }
        for (let o of next)
            this.room.movedObjects.push(o)
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
            this.name = "Hitbox"
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
        return Serializations[this.name](this)
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

