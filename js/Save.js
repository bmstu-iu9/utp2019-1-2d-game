"use strict"
console.log(Game.currentWorld)

let save = JSON.stringify(Game.currentWorld)
console.log(save)
console.log(JSON.parse(save))
