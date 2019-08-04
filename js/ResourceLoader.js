'use strict'
let loaded = 0
let callback

class ResourceLoader {

    /**
     * 
     * @param {*} dest 
     * @param {String} src путь к файлу формата jpg, png, svg
     */
    static loadImage(src, width, height) {
        let img = new Image()
        loaded++
        img.onload = ResourceLoader.onLoad
        img.src = src
        img.width = width
        img.height = height
        return img
    }

    /**
     * 
     * @param {Object} dest 
     * @param {string} path путь к папке с ресурсами
     * @param {string[]} srcArray имя файла формата jpg, png, svg
     */
    static InitResourceRep(dest, path, srcArray) {
        srcArray.forEach(file => {
            let name = file.split('.')[0]
            dest[name] = ResourceLoader.loadImage(path + file, 50, 50)
        });
    }

    static onLoad() {
        loaded--
        if (loaded === 0) {
            callback()
        }
    }

    /**
     * 
     * @param {function} _callback 
     */
    static setCallback(_callback) {
        callback = _callback
    }
}