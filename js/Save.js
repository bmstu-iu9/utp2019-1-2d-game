"use strict"

let db
const SaveLoad = {
    init() {
        let openRequest = indexedDB.open("saveFile", 2)
        openRequest.onupgradeneeded = () => {
            db = openRequest.result;
            if (!db.objectStoreNames.contains('file')) { // if there's no "file" store
                db.createObjectStore('file', {autoIncrement: true}); // create it
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
            save()
        {
            // продолжить работу с базой данных, используя объект db
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

        load()
        {
            let transaction = db.transaction('file',"readwrite")
            let storage = transaction.objectStore("file")
            let obj = storage.get(1)
            if (obj !== undefined)
                obj.onsuccess = () => {
                Game.currentWorld = World.fromJSON(JSON.parse(obj.result))
            }
            else {
                alert("У вас нет сохранений")
            }

        }

}

let initialize = async () => {
    await SaveLoad.init()
}
initialize()


