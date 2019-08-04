'use strict'

/**
 * Lasting effect
 */

class Effect{
    /**
     *
     * @param {Number} remainTime
     */
    constructor(remainTime) {
        this.remainTime = remainTime
    }

    /**
     *
     * @param {StatsManager} target
     * @param {Number} dt
     */

    update(target,dt){
        this.remainTime -= dt
    }
}
