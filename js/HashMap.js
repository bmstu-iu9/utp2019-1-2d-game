'use strict'
class HashMap {
    constructor() {
        this.map = new Object();
    }

    /**
     * Присваивание ключу хеш карты key.id (id GameObject) значение
     * ссылки на объект key
     * @param {GameObject} : key
     */
    set(key) {
        if (this.hasId(key.id)) {
            throw Erorr("map has current id " + key.id)
        }
        this.map[key.id] = key
    }

    /**
     * Имеет ли карта объект с данным id
     * @param {String} : keyid
     * @returns {boolean}
     */
    hasId(keyid) {
        return this.map.hasOwnProperty(keyid)
    }

    /**
     * Возвращает оюъект с ключем keyid или кидает ошибку
     * если такого объекта нет
     * @param {String} : keyid
     * @returns {GameObject}
     */
    get(keyid) {
        if (this.hasId(keyid)) {
            return this.map[kayid]
        }

        throw Erorr("map has not current id " + keyid)

    }
    /**
     * Удаление из карты
     * @param {GameObject} : key
     */
    delete(key) {
        delete this.map[key.id]
    }
    /**
     * Проход по карте функцией functi
     * @param {Function} : functi
     */
    forEach(functi) {
        for (let key in this.map)
        {
            functi(this.map[key])
        }
    }
}
