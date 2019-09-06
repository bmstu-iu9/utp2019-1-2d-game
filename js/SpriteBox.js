'use strict'
class SpriteBox {
    constructor() {
        this.data = new HashMap()
    }
    add(name, pattern) {
        if (this.data.hasId(name)) {
            this.data.map[name].push(pattern)
        } else {
            this.data.map[name] = []
            this.data.map[name].push(pattern)
        }
    }
}