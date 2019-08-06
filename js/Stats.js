'use strict'

/**
 * Represents NPCs' stats
 */

class Stats {
    /**
     *
     * @param {Number} hp
     * @param {Number} mana
     * @param {Number} strength
     * @param {Number} agility
     * @param {Number} intelligence
     * @param {Number} speed
     */

    constructor(hp, mana, strength, agility, intelligence, speed) {
        this.hp = hp
        this.mana = mana
        this.strenght = strength
        this.agility = agility
        this.intelligence = intelligence
        this.speed = speed
    }

    /**
     *
     * @param{Stats} stats
     */
    add(stats) {
        this.hp += stats.hp
        this.mana += stats.mana
        this.strenght += stats.strenght
        this.agility += stats.agility
        this.intelligence += stats.intelligence
        this.speed += stats.speed
    }

    inverse() {
        return new Stats(-this.hp, -this.mana, -this.strenght,
            -this.agility, -this.intelligence, -this.speed)
    }
}
