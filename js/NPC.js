'use strict'

/**
 * Game Player
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
        this.manager = manager//new PlayerManager(this)
        this.hitbox=new Hitbox(HITBOX_CIRCLE,new Vector2d(centre),26);
    }

    render() {
        this.drawable.render();
    }

    Update() {
        this.manager.update()
        this.hitbox.update(this.actor.centre)
    }
}