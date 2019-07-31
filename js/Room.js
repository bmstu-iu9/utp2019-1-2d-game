'use strict'

class Room extends GameObject{
    /**
     * 
     * @param {String} id 
     * @param {Number} height 
     * @param {Number} width 
     */
    constructor(id = Game.getUniqId(), height = 10, width = 10){
        super(id)
        this.height = height
        this.width = width
        this.backgroundTiles = new Array(height).fill(new Array(width))
        this.solidTiles = new Array(height).fill(new Array(width))
        this.rndTiles = new Array(height).fill(new Array(width))
        this.middlegroundTiles = new Array(height).fill(new Array(width))
        this.rnd = {}
        this.manager = new RoomManager(this)
    }
     
    Render(){
        this.rnd.Render()
    }

    Update(){
        this.manager.Update()
    }
}