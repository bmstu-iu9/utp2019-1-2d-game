'use strict'

/**
 * Lasting effect
 */

class Effect {
    /**
     *
     * @param {Number} remainTime
     */
    constructor(remainTime) {
        this.remainTime = remainTime
        this.type = "effect"
    }

    /**
     *
     * @param {StatsManager} target
     * @param {Number} dt
     */

    update(target, dt) {
        this.remainTime -= dt
    }

    toJSON(){
        return Serializations[this.type](this)
    }

    /**
     *
     * @param  {Effect} object
     */
    static fromJSON(object){
        return new Effect(object.remainTime)
    }
}
