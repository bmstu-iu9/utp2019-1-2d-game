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
    }

    /**
     *
     * @param {StatsManager} target
     */
    apply(target) {
        target.stats.add(this.stats)
    }

    toJSON(){
        return {
            stats : this.stats
        }
    }

    /**
     *
     * @param{Action} object
     */

    static fromJSON(object){
        return new Action(object.stats)
    }
}
