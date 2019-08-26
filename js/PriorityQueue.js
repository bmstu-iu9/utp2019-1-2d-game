'use strict'
class PriorityQueue {
    constructor(cmp = (a, b) => {return a > b  ? 1  : -1}) {
        this.data = new Array()
        this.data[0] = 2
        this.cmp = cmp
    }
    size() {
        return this.data.length
    }
    heapify(i) {
        let largest = i
        if (2 * i < this.data.length && this.cmp(this.data[2 * i], this.data[i]) == 1) {
            largest = 2 * i
        }
        if (2 * i + 1 < this.data.length && this.cmp(this.data[2 * i + 1], this.data[i]) == 1) {
            largest = 2 * i + 1
        }
        if (largest !== i) {
            [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]]
            this.heapify(largest)
        }
    }
    insert(key) {
        this.data.push(key)
        let i = this.data.length - 1
        while (i > 1 && this.cmp(this.data[~~(i / 2)], this.data[i]) == -1) {
            [this.data[i], this.data[~~(i / 2)]] = [this.data[~~(i / 2)], this.data[i]]
            i = ~~(i / 2)
        }
    }
    pop() {
        let result = this.data[1]
        this.data[1] = this.data[this.data.length - 1]
        this.data.pop()
        this.heapify(1)
        return result
    }
}