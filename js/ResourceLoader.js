'use strict'
let loaded = 0
let callback
const soundPath='sounds/'

class ResourceLoader {

    /**
     *
     * @param {String} src путь к файлу формата jpg, png, svg
     */
    static loadImage(src) {
        let img = new Image()
        loaded++
        img.onload = ResourceLoader.onLoad
        img.src = src
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
            dest[name] = ResourceLoader.loadImage(path + file)
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

    /**
     *
     * @param {Object} dest
     * @param {[string]} sounds
     */
    static loadSounds(dest,sounds){
        for (let i=0;i<sounds.length;i++){
            dest[sounds[i].split('.')[0]]=new Audio(soundPath+sounds[i])
        }
    }
}