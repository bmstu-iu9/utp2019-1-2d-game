'use strict'
class SpriteBox {
    constructor() {
        this.data = new HashMap()
        this.current = undefined
    }
    add(pattern) {
        this.data.set(pattern)
        this.switch(pattern.id)
    }
    switch(id) {
        this.current = this.data.get(id)
    }
}