class Spell extends GameObject{
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

    render(){
        this.drawable.render()
    }
}
