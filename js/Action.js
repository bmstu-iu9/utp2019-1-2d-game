'use strict'

/**
 * Instant effect
 */

class Action {
    /**
     *
     * @param {Stats} stats
     */
    constructor(stats = new Stats()) {
        this.stats = stats
        this.type = "action"
    }

    /**
     *
     * @param {StatsManager} target
     */
    apply(target) {
        target.stats.add(this.stats)
    }

    toJSON(){
        return Serializations[this.type](this)
    }

    /**
     *
     * @param{Action} object
     */

    static fromJSON(object){
        return new Action(object.stats)
    }
}
