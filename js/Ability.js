class Ability {
    /**
     *
     * @param {NPC} npc
     * @param {Number} manaCost
     * @param {Number} coolDown
     * @param {Number} castTime
     */
    constructor(npc, manaCost, coolDown, castTime) {
        this.npc = npc
        this.manaCost = manaCost
        this.coolDown = coolDown
        this.castTime = castTime
    }

    cast() {

    }
}