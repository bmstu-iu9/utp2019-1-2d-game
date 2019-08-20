class Spell {
    /**
     *
     * @param hitbox
     * @param {Modifier|Effect|Action} data
     * @param {DrawableObject} md
     * @param {MovableActor} actor
     */
    constructor(hitbox, data, md, actor) {
        this.hitbox = hitbox
        this.data = data
        this.md = md
        this.actor = actor
    }

    /**
     * moving spell object,updating properties etc
     */
    update() {

    }

}
