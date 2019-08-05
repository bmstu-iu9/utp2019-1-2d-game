'use strict';
/**
 * @class Класс игровой сцены
 */
class Room extends GameObject{
    /**
     * @param {String} id 
     * @param {Number} height 
     * @param {Number} width 
     */
    constructor(id = Game.getUniqId(), height = 10, width = 10){
        super(id);
        this.height = height;
        this.width = width;
        this.backgroundTiles = new Array(height).fill().map(x => new Array(width));
        this.solidTiles = new Array(height).fill().map(x => new Array(width));
        this.rndTiles = new Array(height).fill().map(x => new Array(width));
        this.middlegroundTiles = new Array(height).fill().map(x => new Array(width));
        this.rnd = Game.roomRnd;
        this.manager = new RoomManager(this);
        this.collisionManager=new CollisionManager(this.manager);
    }

    /**
     * Обновление игровой логики Room 
     */
    Update(){
        this.manager.Update()
    }

    /**
     * Предполагается,что здесь будет происходить обработка коллизий
     */
    collide(){

    }
}