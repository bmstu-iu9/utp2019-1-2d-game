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

    constructor(hp = 100, mana = 50, strength = 1, agility = 1, intelligence = 1, speed = 30) {
        this.hp = hp
        this.mana = mana
        this.strenght = strength
        this.agility = agility
        this.intelligence = intelligence
        this.speed = speed
        this.type = "stats"
    }

    /**
     *
     * @param {Stats} stats
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

    toJSON() {
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {Stats} object
     */
    static fromJSON(object) {
        return new Stats(object.hp, object.mana, object.strenght, object.agility, object.intelligence, object.speed)
    }
}
