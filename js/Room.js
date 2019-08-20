'use strict';
/**
 * @class Класс игровой сцены
 */
class Room extends GameObject {
    /**
     * @param {String} id 
     * @param {Number} height 
     * @param {Number} width 
     */
    constructor(id = Game.getUniqId(), height = 10, width = 10) {
        super(id)
        this.height = height
        this.width = width
        this.roomObjects = []
        this.updatableObjects = []
        this.backgroundTiles = new Array(height).fill().map(x => new Array(width))
        this.solidTiles = []
        this.movedObjects = []
        this.middlegroundTiles = new Array(height).fill().map(x => new Array(width).fill().map(y => new HashMap))
        this.foregroundTiles = new Array(height).fill().map(x => new Array(width))
        this.rnd = Game.roomRnd;
        this.manager = new RoomManager(this);
        this.collisionManager = new CollisionManager(this);
        this.quadTree = new QuadTree(new Rectangle(0, 0, this.width * Game.tileWidth, this.height * Game.tileHeight), 16);
    }

    /**
     * Добавляет GameObject в Room, а также добавляет
     * ссылки во вспомогательные контейнеры
     * @param {GameObject} obj 
     */
    Add(obj) {
        this.roomObjects.push(obj)
        if (obj.Update !== undefined) {
            this.updatableObjects.push(obj)
        }
        let i = 0
        let j = 0
        if (obj.drawable !== undefined) {
            i = ~~(obj.actor.position.y / Game.tileHeight)
            j = ~~(obj.actor.position.x / Game.tileWidth)
        }
        switch (obj.drawable.placement) {
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
        if (obj.hitbox !== undefined) {
            this.solidTiles.push(obj)
        }
    }

    /**
     * Обновление игровой логики Room 
     */
    Update() {
        this.manager.Update()
    }

    /**
     * Обработка коллизий
     */
    collide() {
        this.collisionManager.collide();
    }
}