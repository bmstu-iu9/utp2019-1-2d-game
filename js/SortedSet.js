class SortedSet {
    constructor(array = [], compare = defaultCompare, equal = (a, b) => { return a === b; }) {
        this.equal = equal;
        this._array = [];
        this.compare = compare;
        const length = array.length;
        let index = 0;
        while (index < length) {
            this.add(array[index++]);
        }
    }
    get size() {
        return this._array.length;
    }
    [Symbol.iterator]() {
        return this._array[Symbol.iterator]();
    }
    clear() {
        this._array = [];
        return this;
    }
    add(element) {
        let high = this._array.length;
        let low = 0;
        while (high > low) {
            const index = Math.floor((high + low) / 2);
            const ordering = this.compare(this._array[index], element);
            if (this.equal(this._array[index], element)) {
                return this;
            }
            if (ordering <= 0) {
                low = index + 1;
            }
            else if (ordering > 0) {
                high = index;
            }
        }
        this._array.splice(low, 0, element);
        return this;
    }
    has(element) {
        return this.indexOf(element) !== -1;
    }
    indexOf(element) {
        let high = this._array.length;
        let low = 0;
        while (high > low) {
            const index = Math.floor((high + low) / 2);
            const ordering = this.compare(this._array[index], element);
            if (ordering < 0) {
                low = index + 1;
            }
            else if (ordering > 0) {
                high = index;
            }
            else {
                return index;
            }
        }
        return -1;
    }
    delete(element) {
        const index = this.indexOf(element);
        if (index === -1) {
            return;
        }
        const removed = this._array[index];
        this._array.splice(index, 1);
        return removed;
    }
}

const defaultCompare = (a, b) => {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}
