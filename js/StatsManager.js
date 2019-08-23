'use strict'

/**
 * Gets,contains and manage effects
 */
class StatsManager {
    /**
     *
     * @param {Stats} stats
     */
    constructor(stats) {
        this.stats = stats
        this.effectsContainer = []
        this.modifiersContainer = new Map()
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
        this.stats.add(action.stats)
    }

    /**
     *
     * @param {Number} dt
     */
    update(dt) {
        this.effectsContainer.forEach(effect => effect.update(this, dt))
        this.effectsContainer = this.effectsContainer.filter(effect => effect.remainTime > 0)
    }

    /**
     *
     * @param {StatsManager}object
     */
    static fromJSON(object){
        return new StatsManager(Stats.fromJSON(object.stats))
    }
}

