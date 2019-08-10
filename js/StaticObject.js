'use strict'
class StaticObject extends GameObject {
    constructor(x, y, xcentre, ycentre, drawable, id = Game.getUniqId()) {
        super(id)
        this.actor = new Actor(new Vector2d(x, y), new Vector2d(xcentre, ycentre))
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
}


