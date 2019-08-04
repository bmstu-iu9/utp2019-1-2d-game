'use strict'
class StaticObject extends GameObject{
    constructor(x, y, xcentre, ycentre, drawable, id = Game.getUniqId()) {
        super(id)
        this.centre = new Vector2d(xcentre, ycentre)
        this.position = new  Vector2d(x, y)
        this.drawable = drawable;
    }
    render() {
        this.drawable.render()
    }


}


