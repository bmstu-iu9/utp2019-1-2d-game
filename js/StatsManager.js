'use strict'

/**
 * Gets,contains and manage effects
 */
class StatsManager {
    /**
     *
     * @param {Stats} stats
     */
    constructor(stats = new Stats()) {
        this.stats = stats
        this.hpLimit = stats.hp
        this.manaLimit = stats.mana
        this.effectsContainer = []
        this.modifiersContainer = new Map()
        this.type = "statsManager"
    }

    /**
     *
     * @param {Modifier} modifier
     */
    gainModifier(modifier) {
        if (!this.modifiersContainer.has(modifier.id)) {
            this.modifiersContainer.set(modifier.id, modifier)
            this.stats.add(modifier.stats)
        }
    }

    /**
     *
     * @param {String} id
     */
    delModifier(id) {
        if (this.modifiersContainer.has(id)) {
            let mod = this.modifiersContainer.get(id)
            this.stats.add(mod.stats.inverse())
            this.modifiersContainer.delete(id)
        }
    }

    /**
     *
     * @param {Effect} effect
     */
    gainEffect(effect) {
        this.effectsContainer.push(effect)
    }

    /**
     *
     * @param {Action} action
     */

    gainAction(action) {
        action.apply(this)
    }

    /**
     * correct hp and mana if it's necessary
     */
    correctStats() {
        if (this.stats.hp > this.hpLimit) {
            this.stats.hp = this.hpLimit
        }
        if (this.stats.mana > this.manaLimit) {
            this.stats.mana = this.manaLimit
        }
        if (this.stats.hp < 0) {
            this.stats.hp = 0
        }
    }

    /**
     *
     * @param {Number} dt
     */
    update(dt) {
        this.effectsContainer.forEach(effect => effect.update(this, dt))
        this.effectsContainer = this.effectsContainer.filter(effect => effect.remainTime > 0)
    }

    toJSON() {
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {StatsManager}object
     */
    static fromJSON(object) {
        let statsManager = new StatsManager(Stats.fromJSON(object.stats))
        statsManager.hpLimit = object.hpLimit
        statsManager.manaLimit = object.manaLimit
        object.effectsContainer.forEach((obj) => statsManager.effectsContainer.push(obj))
        object.modifiersContainer.forEach(obj => statsManager.modifiersContainer.set(Modifier.fromJSON(obj),obj.id))
        return statsManager
    }
}

