'use strict';
class StaticObject extends GameObject {
    constructor(x, y, xcentre, ycentre, drawable, id = Game.getUniqId()) {
        super(id);
        this.actor = new Actor(new Vector2d(x, y), new Vector2d(xcentre, ycentre));
        this.drawable = drawable;
    }

    render() {
        this.drawable.render()
    }

    toJSON(){
        return {
            id : this.id,
            actor : this.actor,
            drawable : this.drawable // возможно нужен будет id
        }
    }

    /**
     *
     * @param {StaticObject} object
     */

    static fromJSON(object){
        return new StaticObject(object.actor.position.x,object.actor.position.y,
            object.actor.centre.x,object.actor.centre.y,
            DrawableObject.fromJSON(object.drawable),object.id)
    }
}


