'use strict'
class StaticObject extends GameObject{
    constructor(x, y, drawable, id = Game.getUniqId()) {
        super(id)
        this.position = new  Vector2d(x, y)
        this.drawable = drawable;
    }
    render() {
        this.drawable.render()
    }


}


