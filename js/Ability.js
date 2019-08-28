class Ability {
    /**
     *
     * @param {NPC} npc
     * @param {Number} manaCost
     * @param {Number} coolDown max cool down time
     * @param {Number} castTime
     */
    constructor(npc, manaCost, coolDown, castTime) {
        this.npc = npc
        this.manaCost = manaCost
        this.coolDown = coolDown
        this.coolDownTime = 0
        this.castTime = castTime
    }

    /**
     *
     * @param {Number} dt
     */
    update(dt) {
        this.coolDownTime -= dt
        if (this.coolDownTime < 0){
            this.coolDownTime = 0
        }
    }

    cast() {

    }
}