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
        super(id)
        this.actor = new MovableActor(coords, centre)
        this.drawable = new DrawableObject("middleground", SpriteFactory.CreateTestSprite());
        this.manager = manager
        this.hitbox = new Hitbox(HITBOX_CIRCLE, new Vector2d(centre), 26)
    }

    render() {
        this.drawable.render();
    }

    Update() {
        this.actor.update()
        if (this.manager !== undefined) {
            this.manager.update()
        }
        this.hitbox.update(this.actor.centre)
    }

    onCollide(collision){
       this.hitbox.correctPosition(collision);
       this.actor.changePosition(collision.distance);
    }

    toJSON(){
        return {
            id : this.id,
            actor : this.actor,
            drawable : this.drawable,
            hitbox : this.hitbox,
            manager : this.manager !== undefined
        }
    }

    /**
     *
     * @param {NPC} object
     */
    static fromJSON(object){
        let npc
        if (object.manager === true){
            npc = TilesFactory.CreatePlayer()
            npc.id = object.id
            npc.actor = MovableActor.fromJSON(object.actor)
            npc.hitbox = Hitbox.fromJSON(object.hitbox)
            Game.camera.focusOn(npc.actor)
        }
        else {
            npc = TilesFactory.CreateStaticNPC(0,0)
            npc.id = object.id
            npc.actor = MovableActor.fromJSON(object.actor)
            npc.hitbox = Hitbox.fromJSON(object.hitbox)
        }

        return npc
    }
}