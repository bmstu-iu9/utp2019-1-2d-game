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
}
