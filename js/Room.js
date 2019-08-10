'use strict'
/**
 * @clsass Класс игровой сцены
 */
class Room extends GameObject{
    /**
     * @param {String} id 
     * @param {Number} height 
     * @param {Number} width 
     */
    constructor(id = Game.getUniqId(), height = 10, width = 10){
        super(id)
        this.height = height
        this.width = width
        this.roomObjects = new Array()
        this.updatableObjects = new Array()
        this.backgroundTiles = new Array(height).fill().map(x => new Array(width))
        this.solidTiles = new Array(height).fill().map(x => new Array(width))
        this.middlegroundTiles = new Array(height).fill().map(x => new Array(width).fill().map(y=> new HashMap))
        //this.rndTiles = new Array(height).fill().map(x => new Array(width).fill().map(y=> new HashMap))
        this.foregroundTiles = new Array(height).fill().map(x => new Array(width))
        
        this.rnd = Game.roomRnd;
        this.manager = new RoomManager(this)
    }
    /**
     * 
     * @param {GameObject} obj 
     */
    Add(obj){
        this.roomObjects.push(obj)
        if(obj.Update !== undefined){
            this.updatableObjects.push(obj)
        }
        let i = 0
        let j = 0
        if(obj.drawable !== undefined){
            i = ~~(obj.actor.position.y / Game.tileHeight)
            j = ~~(obj.actor.position.x / Game.tileWidth)
        }
        switch(obj.drawable.placement){
            case undefined:
                break
            case "background":
                this.backgroundTiles[i][j] = obj
                break
            case "middleground":
                this.middlegroundTiles[i][j].set(obj)
                break
            case "foreground":
                this.foreground[i][j] = obj
                break
        }
        if(obj.hitbox !== undefined){
            this.solidTiles[i][j].set(obj.hitbox)
        }
    }

    /**
     * Обновление игровой логики Room 
     */
    Update(){
        this.manager.Update()
    }
}