'use strict'

class WorldManager{
        /**
         * 
         * @param {World} world 
         */
        constructor(world){
            if(world === undefined){
                throw "managableObj can not be undefined"
            }
            this.managableObj = world
        }

        /**
         * Обновляет все игровые объекты внури managebleObj (Room)
         */
        Update(){
            this.managableObj.roomContaier.forEach((element) => {
                if (element.Update !== undefined)
                    element.Update();
            }); 
        }
}