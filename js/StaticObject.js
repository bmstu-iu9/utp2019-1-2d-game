'use strict';
class StaticObject extends GameObject {
    constructor(x, y, xcentre, ycentre, drawable, id = Game.getUniqId()) {
        super(id)
        this.actor = new Actor(new Vector2d(x, y), new Vector2d(xcentre, ycentre))
        this.drawable = drawable
        this.collisonSolveStrategy = "stay"
        this.type = "staticObject"
    }

    render() {
        this.drawable.render()
    }

    toJSON(){
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {StaticObject} object
     */
    static fromJSON(object){
        let staticObject = new StaticObject(object.actor.position.x,object.actor.position.y,
            object.actor.centre.x,object.actor.centre.y,
            DrawableObject.fromJSON(object.drawable),object.id)
        staticObject.collisonSolveStrategy = object.collisonSolveStrategy
        if ("hitbox" in object) {
            staticObject.hitbox = ("name" in object.hitbox) ? Hitbox.fromJSON(object.hitbox) : ("radius" in object.hitbox)
                ? CircleHitbox.fromJSON(object.hitbox) : AABB.fromJSON(object.hitbox)
        }
        return staticObject
    }
}

class MovableObject extends GameObject {
    constructor(x, y, xcentre, ycentre, drawable, id = Game.getUniqId()) {
        super(id)
        this.actor = new Actor(new Vector2d(x, y), new Vector2d(xcentre, ycentre))
        this.drawable = drawable
        this.collisonSolveStrategy = "stay"
        this.type = "staticObject"
    }

    render() {
        this.drawable.render()
    }

    toJSON(){
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {StaticObject} object
     */
    static fromJSON(object){
        let staticObject = new StaticObject(object.actor.position.x,object.actor.position.y,
            object.actor.centre.x,object.actor.centre.y,
            DrawableObject.fromJSON(object.drawable),object.id)
        staticObject.collisonSolveStrategy = object.collisonSolveStrategy
        if ("hitbox" in object) {
            staticObject.hitbox = ("name" in object.hitbox) ? Hitbox.fromJSON(object.hitbox) : ("radius" in object.hitbox)
                ? CircleHitbox.fromJSON(object.hitbox) : AABB.fromJSON(object.hitbox)
        }
        return staticObject
    }
}


