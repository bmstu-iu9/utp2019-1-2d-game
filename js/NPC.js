'use strict'

/**
 * @class
 */
class NPC extends GameObject {
    /**
     *
     * @param {Vector2d} [coords = new Vector2d(0,0)]
     * @param {Vector2d} [centre = new Vector2d(0,0)]
     * @param manager
     * @param id
     */
    constructor(coords = new Vector2d(0, 0), centre = new Vector2d(0, 0), manager = undefined, id = Game.getUniqId()) {
        super(id);
        this.actor = new MovableActor(coords, centre);
        this.drawable = new DrawableObject("middleground", SpriteFactory.CreateTestSprite());
        this.manager = manager
        this.hitbox = new Hitbox(HITBOX_CIRCLE, new Vector2d(centre), 26);
        this.direction = new Vector2d(0, 0)
        this.walking = false
        this.collisonSolveStrategy = "stay"
    }

    render() {
        this.drawable.render();
    }

    Update() {
        this.actor.update()
        if (this.manager !== undefined) {
            this.manager.update()

        }
        if (this.walking === false)
            this.drawable.drowable.switch("idle", this.direction)
        else
            this.drawable.drowable.switch("go", this.direction)
        this.hitbox.update(this.actor.centre)
    }
}