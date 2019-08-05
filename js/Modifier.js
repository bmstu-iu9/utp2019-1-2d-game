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
    }
}