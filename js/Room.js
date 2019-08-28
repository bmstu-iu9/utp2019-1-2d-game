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
        this.roomObjects = new HashMap()
        this.updatableObjects = new HashMap()
        this.backgroundTiles = new Array(height).fill().map(x => new Array(width))
        this.movedObjects = []
        this.middlegroundTiles = new Array(height).fill().map(() => new Array(width).fill().map(y => new HashMap))
        this.foregroundTiles = new Array(height).fill().map(() => new Array(width))
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
        this.roomObjects.set(obj)
        if (obj.Update !== undefined) {
            this.updatableObjects.set(obj)
        }
        if (obj.actor === undefined) {
            console.log("PANIC")
            return
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
            this.quadTree.add(obj)
        }
    }

    delete(obj) {
        this.roomObjects.delete(obj)
        if (obj.Update !== undefined) {
            this.updatableObjects.delete(obj)
        }
        let i = 0
        let j = 0
        if (obj.drawable !== undefined) {
            if (obj.actor instanceof MovableActor) this.manager.refreshPosition(obj)
            i = ~~(obj.actor.position.y / Game.tileHeight)
            j = ~~(obj.actor.position.x / Game.tileWidth)
        }
        switch (obj.drawable.placement) {
            case undefined:
                break
            case "background":
                this.backgroundTiles[i][j] = undefined
                break
            case "middleground":
                this.middlegroundTiles[i][j].delete(obj)
                break
            case "foreground":
                this.foreground[i][j] = undefined
                break
        }

        if (obj.hitbox !== undefined) {
            this.quadTree.delete(obj.hitbox)
        }

    }

    addMap(x, y, map) {
        map = map.split('\n')
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                this.addChar(j + x, i + y, map[i][j])
            }
        }
    }

    addChar(x, y, data) {
        x = x * Game.tileWidth
        y = y * Game.tileWidth
        let ty
        let t
        switch (data) {
            case 'z':
                t = TilesFactory.CreateDungeonWallSW(x + 17, y)
                break
            case 'a':
                t = TilesFactory.CreateDungeonWallRight(x, y)
                break
            case 's':
                t = TilesFactory.CreateDungeonWall(x, y)
                break
            case 'd':
                t = TilesFactory.CreateDungeonWallLeft(x, y)
                break
            case 'w':
                t = TilesFactory.CreateDungeonWall(x, y)
                break
            case 'x':
                t = TilesFactory.CreateDungeonWallSE(x - 17, y)
                break
            case 'q':
                t = TilesFactory.CreateDungeonWallNW(x, y)
                break
            case 'e':
                t = TilesFactory.CreateDungeonWallNE(x, y)
                //ty = TilesFactory.CreateDungeonWallLeft(x, y)
                break
            case '1':
                t = TilesFactory.CreateDungeonWallSW(x, y)
                break
            case '2':
                t = TilesFactory.CreateDungeonWallSE(x, y)
                break
        }
        if (t != undefined) {
            this.Add(t)
        }
        if (ty != undefined) {
            this.Add(ty)
        }
    }

    /**
     * Обновление игровой логики Room
     */
    Update() {
        this.manager.Update()
    }

    toJSON() {

        return {
            id: this.id,
            height: this.height,
            width: this.width,
            roomObjects: this.roomObjects
        };
    }

    /**
     *
     * @param {Room} object
     */
    static fromJSON(object) {
        let room = new Room(object.id, object.height, object.width)
        for (let i = 0; i < object.roomObjects.length; i++) {
            if ("hitbox" in object.roomObjects[i]) {
                room.Add(NPC.fromJSON(object.roomObjects[i]))
            } else {
                room.Add(StaticObject.fromJSON(object.roomObjects[i]))
            }
        }
        return room
    }

    /**
     * Обработка коллизий
     */
    collide() {
        this.collisionManager.collide();
    }

    /**
     * @param {Vector2d} clickCoords
     */
    getElementByClick(clickCoords) {
        const point = clickCoords.add(this.rnd.camera.position, new Vector2d())
        return this.quadTree.getElement(this.quadTree, point)
    }


}