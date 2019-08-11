"use strict"
/*console.log(Game.currentWorld)

let save = JSON.stringify(Game.currentWorld)
console.log(save)
console.log(JSON.parse(save))
*/

const SaveLoad = {
    save(){
        let json = JSON.stringify(Game.currentWorld)
        let w = JSON.parse(json)
        console.log(w)


    },

    load(){
    }
}

