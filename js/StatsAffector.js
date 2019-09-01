'use strict'

/**
 * Gives effects
 */
class StatsAffector {
    /**
     *
     * @param {StatsManager} target
     */
    constructor(target = undefined) {
        this.target = target
        this.type = "statsAffector"
    }

    /**
     *
     * @param {Effect} effect
     * @param {StatsManager} target
     */
    toDealEffect(effect, target) {
        target.gainEffect(effect)
    }

    /**
     *
     * @param {Modifier} modifier
     * @param {StatsManager} target
     */
    toAddModifier(modifier, target) {
        target.gainModifier(modifier)
    }

    /**
     *
     * @param {String} id
     * @param {StatsManager} target
     */
    toDelModifier(id, target) {
        target.delModifier(id)
    }

    /**
     *
     * @param {Action} action
     * @param {StatsManager} target
     */
    toDoAction(action, target) {
        target.gainAction(action)
    }

    toJSON() {
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {StatsAffector}object
     */

    static fromJSON(object) {
        return new StatsAffector(StatsManager.fromJSON(object.target))
    }
}