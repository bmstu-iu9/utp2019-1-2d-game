'use strict'

class RoomRenderer {
    /**
     * @param {Number} margin
     * @param {Room} room
     */
    constructor(margin, room) {
        this.camera = Game.camera;
        this.tileWidth = Game.tileWidth;
        this.tileHeight = Game.tileHeight;
        this.ledHeight = this.camera.getLedHeight();
        this.ledWidth = this.camera.getLedWidth();
        this.margin = margin;
        this.tileCount = [Math.ceil(this.ledWidth / this.tileWidth) + 2 * margin, Math.ceil(this.ledHeight / this.tileHeight) + 2 * margin];
        this.cameraVec = this.camera.getPosition();
        this.backgroundCanvas = document.createElement('canvas');
        this.backgroundCanvasCtx = this.backgroundCanvas.getContext('2d');
        this.middlegroundCanvas = document.createElement('canvas');
        this.middlegroundCanvasCtx = this.middlegroundCanvas.getContext('2d');
        this.a = {};
        this.b = {};
        this.sortArray = new SortedSet([], this.compareByY, (a, b) => { return a.id === b.id });
        this.room = room;
        this.bgPreRender(this.room);
        this.mPreRender(this.room);
    }

    reRender(){
        this.bgPreRender(this.room);
        this.mPreRender(this.room);
        this.render();
    }

    /**
     * Пререндеринг background
     * @param {Room} room
     */
    bgPreRender(room) {
        this.backgroundCanvas.width = room.width * Game.tileWidth;
        this.backgroundCanvas.height = room.height * Game.tileHeight;
        for (let i = 0; i < room.width; i++) {
            for (let j = 0; j < room.height; j++) {
                const tile = room.backgroundTiles[j][i];
                if (tile != undefined) {
                    this.backgroundCanvasCtx.drawImage(tile.drawable.drowable.img,
                        i * Game.tileWidth,
                        j * Game.tileHeight);
                }
            }
        }
    }

    /**
     * Пререндеринг middleground
     * @param {Room} room
     */
    mPreRender(room) {
        this.sortArray.clear();
        this.middlegroundCanvas.width = room.width * Game.tileWidth;
        this.middlegroundCanvas.height = room.height * Game.tileHeight;
        for (let i = 0; i < room.width; i++) {
            for (let j = 0; j < room.height; j++) {
                const drowableMap = room.middlegroundTiles[j][i];
                drowableMap.forEach((key) => {
                    if (key instanceof StaticObject)
                        if (this.inCamera(key)) {
                            this.sortArray.add(key);
                        }
                });
            }
        }
        for (const item of this.sortArray) {
            this.middlegroundCanvasCtx.drawImage(item.drawable.drowable.img,
                item.actor.position.x,
                item.actor.position.y);
        }
    }

    inCamera(obj) {
        this.a.x = obj.actor.position.x;
        this.a.y = obj.actor.position.y;
        this.a.x1 = obj.actor.position.x + obj.drawable.drowable.width;
        this.a.y1 = obj.actor.position.y + obj.drawable.drowable.height;
        this.b.x = Game.camera.position.x;
        this.b.y = Game.camera.position.y;
        this.b.x1 = Game.camera.position.x + this.ledWidth;
        this.b.y1 = Game.camera.position.y + this.ledHeight;

        return (this.a.y < this.b.y1 ||
            this.a.y1 > this.b.y ||
            this.a.x1 < this.b.x ||
            this.a.x > this.b.x1);
    }

    isIntersect(obj, obj_b) {
        this.a.x = obj.actor.position.x;
        this.a.y = obj.actor.position.y;
        this.a.x1 = obj.actor.position.x + obj.drawable.drowable.width;
        this.a.y1 = obj.actor.position.y + obj.drawable.drowable.height;
        this.b.x = obj_b.actor.position.x;
        this.b.y = obj_b.actor.position.y;
        this.b.x1 = obj_b.actor.position.x + obj_b.drawable.drowable.width;
        this.b.y1 = obj_b.actor.position.y + obj_b.drawable.drowable.height;

        return !(this.a.y > this.b.y1 ||
            this.a.y1 < this.b.y ||
            this.a.x1 < this.b.x ||
            this.a.x > this.b.x1);
    }

    calcIntersection(obj, obj_b) {
        const res = {};
        res.y = Math.max(obj.y, obj_b.y);
        res.x = Math.max(obj.x, obj_b.x);
        res.y1 = Math.min(obj.y1, obj_b.y1);
        res.x1 = Math.min(obj.x1, obj_b.x1);
        if (Math.abs(res.y - res.y1) === 0 ||
            Math.abs(res.x - res.x1) === 0)
            return undefined
        return res;
    }

    compareByY(a, b) {
        if (a.actor.centre.y === b.actor.centre.y) return 0
        return a.actor.centre.y > b.actor.centre.y ? 1 : -1
    }

    /**
     * @param {Room} room
     */
    render(room) {
        this.sortArray.clear();
        ctx.fillRect(0, 0, this.ledWidth, this.ledHeight);
        let leftTop = [~~(this.cameraVec.x / this.tileWidth) - this.margin, ~~(this.cameraVec.y / this.tileHeight) - this.margin];
        let rightBot = [Math.min(leftTop[0] + this.tileCount[0], room.width - 1), Math.min(leftTop[1] + this.tileCount[1], room.height - 1)];
        leftTop = [Math.max(leftTop[0], 0), Math.max(leftTop[1], 0)];

        //background render
        ctx.drawImage(this.backgroundCanvas,
            Game.camera.position.x,
            Game.camera.position.y,
            this.ledWidth,
            this.ledHeight,
            0,
            0,
            this.ledWidth,
            this.ledHeight)

        //middleground render
        ctx.drawImage(this.middlegroundCanvas,
            Game.camera.position.x,
            Game.camera.position.y,
            this.ledWidth,
            this.ledHeight,
            0,
            0,
            this.ledWidth,
            this.ledHeight)

        // non StaticObjects rendering
        for (let i = leftTop[0]; i < rightBot[0]; i++) {
            for (let j = leftTop[1]; j < rightBot[1]; j++) {
                const drowableMap = room.middlegroundTiles[j][i];
                drowableMap.forEach((key) => {
                    if (!(key instanceof StaticObject)) {
                        if (this.inCamera(key)) {
                            this.sortArray.add(key);
                            for (let u = Math.max(i - ~~(this.margin), 0); u < i + ~~(this.margin / 2) + 1; u++) {
                                for (let v = j - this.margin; v < j + this.margin + 1; v++) {
                                    const drMap = room.middlegroundTiles[v][u];
                                    drMap.forEach((key1) => {
                                        if (key1 instanceof StaticObject && this.isIntersect(key, key1)) {
                                            const drawRect = this.calcIntersection(
                                                {
                                                    x: key.actor.position.x,
                                                    y: key.actor.position.y,
                                                    x1: key.actor.position.x + key.drawable.drowable.width,
                                                    y1: key.actor.position.y + key.drawable.drowable.height,
                                                },
                                                {
                                                    x: key1.actor.position.x,
                                                    y: key1.actor.position.y,
                                                    x1: key1.actor.position.x + key1.drawable.drowable.width,
                                                    y1: key1.actor.position.y + key1.drawable.drowable.height,
                                                });
                                            if (drawRect)
                                                this.sortArray.add(new RenderTask(key1, drawRect));
                                        }
                                    });
                                }
                            }
                        }
                    }
                })
            }
        }

        for (const item of this.sortArray) {
            if (item instanceof RenderTask) {
                this.camera.setCanvasCoord(item.object);
                item.render();
            } else {
                this.camera.setCanvasCoord(item);
                item.render();
            }
        }
    }
}
