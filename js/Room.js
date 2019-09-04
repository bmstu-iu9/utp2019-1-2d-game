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
        this.type = "room"
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

    drawGrass1(x, y, width, height) {
      x = x * Game.tileWidth
      y = y * Game.tileHeight
      // width = width * Game.tileWidth
      // height = height * Game.tileHeight
      for(let i = width; i >= 0; i--) {
          for(let j = height; j >= 0; j--) {
              this.Add(TilesFactory.CreateGrassTile1(x + (j * Game.tileWidth), y + (i * Game.tileWidth)))
          }
      }
    }

    drawGrass2(x, y, width, height, object) {
      x = x * Game.tileWidth
      y = y * Game.tileHeight
      for(let i = width; i >= 0; i--) {
          for(let j = height; j >= 0; j--) {
              this.Add(TilesFactory.CreateGrassTile2(x + (j * Game.tileWidth), y + (i * Game.tileWidth)))
          }
      }
    }

    drawGrass3(x, y, width, height) {
      x = x * Game.tileWidth
      y = y * Game.tileHeight
      for(let i = width; i >= 0; i--) {
          for(let j = height; j >= 0; j--) {
              this.Add(TilesFactory.CreateGrassTile3(x + (j * Game.tileWidth), y + (i * Game.tileWidth)))
          }
      }
    }

    drawDungeonFloor(x, y, width, height) {
      x = x * Game.tileWidth
      y = y * Game.tileHeight
      for(let i = width; i >= 0; i--) {
          for(let j = height; j >= 0; j--) {
              this.Add(TilesFactory.CreateDungeonFloor1(x + (j * Game.tileWidth), y + (i * Game.tileWidth)))
          }
      }
    }

    drawFloor(x, y, width, height) {
      x = x * Game.tileWidth
      y = y * Game.tileHeight
      for(let i = width; i >= 0; i--) {
          for(let j = height; j >= 0; j--) {
              this.Add(TilesFactory.CreateDungeonFloorBrick(x + (j * Game.tileWidth), y + (i * Game.tileWidth)))
          }
      }
    }

    drawGround(x, y, width, height) {
      x = x * Game.tileWidth
      y = y * Game.tileHeight
      for(let i = width; i >= 0; i--) {
          for(let j = height; j >= 0; j--) {
              this.Add(TilesFactory.CreateGroundTile(x + (j * Game.tileWidth), y + (i * Game.tileWidth)))
          }
      }
    }

    drawForest(x, y, width, height) {
      for(let i = 0; i < width; i++) {
          for(let j = 0; j < height; j++) {
            if (Math.random() < 0.8) {
              this.Add(TilesFactory.CreateForest(x + i * 130, y + j * 130))
            }
          }
      }
    }

    drawBigForest(x, y, width, height) {
      for(let i = 0; i < width; i++) {
          for(let j = 0; j < height; j++) {
            if (Math.random() < 0.8) {
              this.Add(TilesFactory.CreateBigForest(x + i * 90, y + j * 90))
            }
          }
      }
    }

    drawMediumForest(x, y, width, height) {
      for(let i = 0; i < width; i++) {
          for(let j = 0; j < height; j++) {
            if (Math.random() < 0.7) {
              this.Add(TilesFactory.CreateMediumForest(x + i * 70, y + j * 70))
            }
          }
      }
    }

    drawSmallForest(x, y, width, height) {
      for(let i = 0; i < width; i++) {
          for(let j = 0; j < height; j++) {
            if (Math.random() < 0.5) {
              this.Add(TilesFactory.CreateSmallForest(x + i * 50, y + j * 50))
            }
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
            case '3':
                t = TilesFactory.CreateDungeonColumnLeft(x, y)
                break
            case '4':
                t = TilesFactory.CreateDungeonColumnMiddle(x, y)
                break
            case '5':
                t = TilesFactory.CreateDungeonColumnRight(x, y)
                break
            case '6':
                t = TilesFactory.CreateDungeonFloor1(x, y)
                break
            case '7':
                t = TilesFactory.CreateGrassTile1(x, y)
                break
            case '8':
                t = TilesFactory.CreateGrassTile2(x, y)
                break
            case '9':
                t = TilesFactory.CreateGrassTile3(x, y)
                break
            case '0':
                t = TilesFactory.CreateLukeTiles(x, y)
                break
            case 'c':
                t = TilesFactory.CreateTree(x - 55, y - 140)
                break
            case 'v':
                t = TilesFactory.CreateBigOak(x - 20, y - 80)
                break
            case 'b':
                t = TilesFactory.CreateBigBirch(x - 20, y - 80)
                break
            case 'n':
                t = TilesFactory.CreateMediumOak(x - 15, y - 75)
                break
            case 'm':
                t = TilesFactory.CreateMediumBirch(x - 10, y - 55)
                break
            case '<':
                t = TilesFactory.CreateSmallOak(x - 5, y - 50)
                break
            case '>':
                t = TilesFactory.CreateSmallBirch(x - 5, y - 35)
                break
            case 'f':
                t = TilesFactory.CreateRocks1(x - 5, y)
                break
            case 'g':
                t = TilesFactory.CreateRocks2(x + 5, y + 10)
                break
            case 'h':
                t = TilesFactory.CreateRocks3(x, y + 5)
                break
            case 'j':
                t = TilesFactory.CreateRocks4(x, y + 5)
                break
            case 'k':
                t = TilesFactory.CreateBigTent(x - 15, y - 60)
                break
            case 'l':
                t = TilesFactory.CreateSmallTent(x, y - 20)
                break
            case 'r':
                t = TilesFactory.CreateBranchesTexture1(x + 10, y + 10)
                break
            case 't':
                t = TilesFactory.CreateBranchesTexture2(x + 10, y + 10)
                break
            case 'y':
                t = TilesFactory.CreateBush1(x + 7, y + 5)
                break
            case 'u':
                t = TilesFactory.CreateBush2(x + 7, y + 5)
                break
            case 'i':
                t = TilesFactory.CreateCross(x + 5, y - 5)
                break
            case 'o':
                t = TilesFactory.CreateDeadWood1(x, y + 5)
                break
            case 'p':
                t = TilesFactory.CreateDeadWood2(x + 7, y + 18)
                break
            case '[':
                t = TilesFactory.CreateDeadWood3(x, y + 10)
                break
            case ']':
                t = TilesFactory.CreateWell(x, y - 15)
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
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {Room} object
     */
    static fromJSON(object) {
        let room = new Room(object.id, object.height, object.width)
        for (let i in object.roomObjects.map) {
            if ("data" in object.roomObjects.map[i]) {
                //room.Add(Spell.fromJSON(object.roomObjects.map[i]))
                     } else if ("direction" in object.roomObjects.map[i])
                room.Add(NPC.fromJSON(object.roomObjects.map[i]))
            else {
                room.Add(StaticObject.fromJSON(object.roomObjects.map[i]))
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