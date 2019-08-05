'use strict';
class StaticObject extends GameObject {
    constructor(x, y, xcentre, ycentre, drawable, id = Game.getUniqId()) {
        super(id);
        this.actor = new Actor(new Vector2d(x, y), new Vector2d(xcentre, ycentre));
        this.drawable = drawable;
        this.hitbox=new AABB(new Vector2d(this.actor.centre),[
            new Vector2d(this.actor.position),
            this.actor.centre.add(25,-25,new Vector2d()),
            this.actor.centre.add(25,25,new Vector2d()),
            this.actor.centre.add(-25,25,new Vector2d())
        ])
        //this.hitbox=new CircleHitbox(new Vector2d(this.actor.centre),27);
    }

    render() {
        this.drawable.render()
    }

}


