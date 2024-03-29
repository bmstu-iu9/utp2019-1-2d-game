'use strict'

/**
 * Permanent effect
 */

class Modifier extends GameObject {
    /**
     *
     * @param {Stats} stats
     * @param {String} id
     */
    constructor(stats, id) {
        super(id)
        this.stats = stats
        this.type = "modifier"
    }

    toJSON(){
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {Modifier} object
     */
    static fromJSON(object){
        return new Modifier(Stats.fromJSON(object.stats),object.id)
    }
}