'use strict';
class HashMap {
    constructor() {
        this.map = {}
    }

    /**
     * Присваивание ключу хеш карты key.id (id GameObject) значение
     * ссылки на объект key
     * @param {Object}  key
     */
    set(key) {
        if (this.hasId(key.id)) {
            throw Error("map has current id " + key.id)
        }
        this.map[key.id] = key
    }

    /**
     * Имеет ли карта объект с данным id
     * @param {String}  keyid
     * @returns {boolean}
     */
    hasId(keyid) {
        return this.map.hasOwnProperty(keyid)
    }

    /**
     * Возвращает объект с ключем keyid или кидает ошибку
     * если такого объекта нет
     * @param {String}  keyid
     * @returns {Object}
     */
    get(keyid) {
        if (this.hasId(keyid)) {
            return this.map[keyid]
        }

        throw Error("map has not current id " + keyid)

    }
    /**
     * Удаление из карты
     * @param {Object}  key
     */
    delete(key) {
        delete this.map[key.id]
    }
    /**
     * Проход по карте функцией functi
     * @param {Function}  functi
     */
    forEach(functi) {
        for (let key in this.map)
        {
            functi(this.map[key])
        }
    }
}
