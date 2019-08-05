'use strict';
class NPC extends GameObject {
    /**
     *
     * @param {Vector2d} [coords = new Vector2d(0,0)]
     * @param {Vector2d} [centre = new Vector2d(0,0)]
     * @param id
     */
    constructor(coords = new Vector2d(0, 0), centre = new Vector2d(0, 0), id = Game.getUniqId()) {
        super(id);
        this.actor = new MovableActor(coords, centre);
        this.drawable = new DrawableObject("middleground", SpriteFactory.CreateTestSprite());
        // this.hitbox=new AABB(new Vector2d(centre),[
        //     centre.add(-25,-25,new Vector2d()),
        //     centre.add(25,-25,new Vector2d()),
        //     centre.add(25,40,new Vector2d()),
        //     centre.add(-25,40,new Vector2d())
        // ]);
        this.hitbox=new CircleHitbox(new Vector2d(centre),26);

    }
    render() {
        this.drawable.render();
    }

    Update() {
        let speed = 5;
        if (keyboard.KeyW) {
            this.actor.changePosition(new Vector2d(0, -speed))
        }
        if (keyboard.KeyS) {
            this.actor.changePosition(new Vector2d(0, speed))
        }
        if (keyboard.KeyA) {
            this.actor.changePosition(new Vector2d(-speed, 0))
        }
        if (keyboard.KeyD) {
            this.actor.changePosition(new Vector2d(speed, 0))
        }
        //Game.camera.focusOn(this.actor.position);
        this.hitbox.changePosition(this.actor.centre);
    }
}