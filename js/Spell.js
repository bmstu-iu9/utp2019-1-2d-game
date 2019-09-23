class Spell extends GameObject {
    /**
     *
     * @param hitbox
     * @param {Modifier|Effect|Action} data
     * @param {DrawableObject} drawable
     * @param {MovableActor} actor
     */
    constructor(hitbox, data, drawable, actor) {
        super(Game.getUniqId())
        this.hitbox = hitbox
        this.data = data
        this.drawable = drawable
        this.actor = actor
    }

    /**
     * moving spell object,updating properties etc
     */
    Update() {

    }

    render() {
        this.drawable.render()
    }

    toJSON() {
        return {
            id: this.id,
            hitbox: this.hitbox,
            data: this.data,
            drawable: this.drawable,
            actor: this.actor
        }
    }

    /**
     *
     * @param {Spell} object
     */

    static fromJSON(object) {
        let actor = ("offset" in object.actor) ? MovableActor.fromJSON(object.actor) : Actor.fromJSON(object.actor)
        let hitbox = undefined
        let drawable
        if ("hitbox" in object)
            hitbox = ("type" in object.hitbox) ? Hitbox.fromJSON(object.hitbox) : ("radius" in object.hitbox)
                ? CircleHitbox.fromJSON(object.hitbox) : AABB.fromJSON(object.hitbox)
        drawable = DrawableObject.fromJSON(object.drawable)
        let data = ("remainTime" in object.data) ? Effect.fromJSON(object.data) : ("id" in object.data) ?
            Modifier.fromJSON(object.data) : Action.fromJSON(object.data)
        let spell = new Spell(hitbox, data, drawable, actor)
        spell.id = object.id
        spell.collisonSolveStrategy = object.collisonSolveStrategy
        return spell
    }
}
