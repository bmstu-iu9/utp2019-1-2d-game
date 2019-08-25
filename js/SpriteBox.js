'use strict'
class SpriteBox {
    constructor() {
        this.data = new HashMap()
    }
    add(name, pattern) {
        if (this.data.hasId(name)) {
            console.log(this.data)
            this.data.map[name].push(pattern)
        } else {
            this.data.map[name] = new Array()
            this.data.map[name].push(pattern)
        }
    }
}