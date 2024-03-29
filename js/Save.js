"use strict"

let db
const SaveLoad = {
    init() {
        let openRequest = indexedDB.open("saveFile", 2)
        openRequest.onupgradeneeded = () => {
            db = openRequest.result;
            if (!db.objectStoreNames.contains('file')) {
                db.createObjectStore('file', {autoIncrement: true});
            }
        };
        openRequest.onerror = () => {
            console.error("Error", openRequest.error);
            alert("Сохранение невозможно")
        };
        openRequest.onsuccess = () => {
            db = openRequest.result;
        };
    },
    save() {
        let transaction = db.transaction('file', "readwrite")
        let storage = transaction.objectStore("file")
        let js = JSON.stringify(Game.currentWorld)
        let request = storage.put(js, 1)
        request.onsuccess = () => {
            console.log("Игра Сохранена", request.result);

            request.onerror = () => {
                console.log("Ошибка", request.error);
                alert("Игра не сохранилась")
            };
        }
    },

    load() {
        let transaction = db.transaction('file', "readwrite")
        let storage = transaction.objectStore("file")
        let obj = storage.get(1)
            obj.onsuccess = () => {
                if (obj.result !== undefined) {
                    Game.currentWorld = World.fromJSON(JSON.parse(obj.result))
                    requestAnimationFrame(Game.Loop);
                }

                else startGame()
            }

    }

}

 let Serializations = {
     "world": (obj) => {
         return {
             id: obj.id,
             roomContaier: obj.roomContaier,
             currentRoom: obj.currentRoom,
             type: obj.type
         }
     },

     "roundedRoom": (obj) => {
         return {
             id: obj.id,
             height: obj.height,
             width: obj.width,
             roomObjects: obj.roomObjects,
             type: obj.type
         }
     },

     "testRoom": (obj) => {
         return {
             id: obj.id,
             height: obj.height,
             width: obj.width,
             roomObjects: obj.roomObjects,
             type: obj.type
         }
     },

     "staticNpc": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             drawable: obj.drawable,
             hitbox: obj.hitbox,
             direction: obj.direction,
             collisonSolveStrategy: obj.collisonSolveStrategy,
             walking: obj.walking,
             type: obj.type,
             statsManager: obj.statsManager,
             manager: obj.manager
         }
     },

     "staticNpc2": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             drawable: obj.drawable,
             hitbox: obj.hitbox,
             direction: obj.direction,
             collisonSolveStrategy: obj.collisonSolveStrategy,
             walking: obj.walking,
             type: obj.type,
             statsManager: obj.statsManager,
             manager: obj.manager
         }
     },

     "player": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             drawable: obj.drawable,
             hitbox: obj.hitbox,
             direction: obj.direction,
             collisonSolveStrategy: obj.collisonSolveStrategy,
             walking: obj.walking,
             type: obj.type,
             statsManager: obj.statsManager
         }
     },

     "npc": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             drawable: obj.drawable,
             hitbox: obj.hitbox,
             direction: obj.direction,
             collisonSolveStrategy: obj.collisonSolveStrategy,
             walking: obj.walking,
             type: obj.type,
         }
     },

     "actor": (obj) => {
         return {
             position: obj.position,
             centre: obj.centre,
             type: obj.type
         }
     },

     "movableActor": (obj) => {
         return {
             position: obj.position,
             centre: obj.centre,
             offset: obj.offset,
             prevPosition: obj.prevPosition,
             type: obj.type
         }
     },

     "AABB": (obj) => {
         return {
             centre: obj.centre,
             vertices: obj.vertices,
             id: obj.id,
             type: obj.type
         }
     },

     "CircleHitbox": (obj) => {
         return {
             radius: obj.radius,
             centre: obj.centre,
             id: obj.id,
             type: obj.type
         }
     },

     "Hitbox": (obj) => {

         return {
             type: obj.type,
             hitbox: obj.hitbox,
             hitboxPrevState: obj.hitboxPrevState,
             name: obj.name
         }
     },

     "action": (obj) => {
         return {
             stats: obj.stats,
             type: obj.type
         }
     },

     "drawableObject": (obj) => {
         return {
             placement: obj.placement,
             drowable: obj.drowable, //Нужно поменять на id
             canvasCoord: obj.canvasCoord,
             type: obj.type
         }
     },

     "effect": (obj) => {
         return {
             type: obj.type,
             remainTime: obj.remainTime
         }
     },

     "modifier": (obj) => {
         return {
             stats: obj.stats,
             id: obj.id,
             type: obj.type
         }
     },

     "staticObject": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             drawable: obj.drawable, // возможно нужен будет id
             collisonSolveStrategy: obj.collisonSolveStrategy,
             hitbox: obj.hitbox,
             type: obj.type
         }
     },
     "movableObject": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             drawable: obj.drawable, // возможно нужен будет id
             collisonSolveStrategy: obj.collisonSolveStrategy,
             hitbox: obj.hitbox,
             type: obj.type,
         }
     },

     "hpBottle": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             type: obj.type
         }
     },
     "manaBottle": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             type: obj.type
         }
     },
     "sword": (obj) => {
         return {
             id: obj.id,
             actor: obj.actor,
             type: obj.type
         }
     },

     "stats": (obj) => {
         return {
             hp: obj.hp,
             mana: obj.mana,
             strenght: obj.strenght,
             agility: obj.agility,
             intelligence: obj.intelligence,
             speed: obj.speed,
             type: obj.type
         }
     },
     "statsManager": (obj) => {
         let arr = []
         obj.modifiersContainer.forEach(elem => arr.push(elem))
         return {
             stats: obj.stats,
             hpLimit: obj.hpLimit,
             manaLimit: obj.manaLimit,
             effectsContainer: obj.effectsContainer,
             modifiersContainer: arr,
             type: obj.type
         }
     },

     "texture": (obj) => {
         return {
             src: obj.img.src,
             type: obj.type
         }
     },

     "vector2D": (obj) => {
         return {
             x: obj.x,
             y: obj.y
         }
     },

     "AIManager": (obj) => {
         return {
             resultPath : obj.resultPath,
             agro : obj.agro,
             path : obj.path,
         }
     },

     "triangle": (obj) => {
         return {
             point: obj.point,
             index: obj.index,
             edge: obj.edge.map,
             id: obj.id
         }
     },

     "levelManager" : (obj) => {
        return {
            experience : obj.experience,
            level : obj.level,
            bound : obj.bound,
            bonuses : obj.bonuses,
            type : obj.type
        }
     }
 }

let initialize = async () => {
    await SaveLoad.init()
}
initialize()
