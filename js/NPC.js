'use strict'

/**
 * Game Player
 */
class NPC extends GameObject {
    /**
     *
     * @param {Vector2d} [coords = new Vector2d(0,0)]
     * @param {Vector2d} [centre = new Vector2d(0,0)]
     */
    constructor(coords = new Vector2d(0, 0), centre = new Vector2d(0, 0), id = Game.getUniqId()) {
        super(id)
        this.actor = new MovableActor(coords, centre)
        this.drawable = new DrawableObject("middleground", SpriteFactory.CreateTestSprite())
        this.manager = new PlayerManager(this)
    }

    render() {
        this.drawable.render()
    }

    Update() {
        this.manager.update()
    }
}