'use strict'
class RoomRenderer {
    /**
     * @param {Number} margin 
     */
    constructor(margin) {
        this.camera = Game.camera;
        this.tileWidth = Game.tileWidth;
        this.tileHeight = Game.tileHeight;
        this.ledHeight = this.camera.getLedHeight();
        this.ledWidth = this.camera.getLedWidth();
        this.margin = margin;
        this.tileCount = [Math.ceil(this.ledWidth / this.tileWidth) + 2 * margin, Math.ceil(this.ledHeight / this.tileHeight) + 2 * margin];
        this.cameraVec = this.camera.getPosition();
    }

    /**
     * @param {Room} room 
     */
    render(room) {
        ctx.fillRect(0, 0, this.ledWidth, this.ledHeight);
        let leftTop = [~~(this.cameraVec.x / this.tileWidth) - this.margin, ~~(this.cameraVec.y / this.tileHeight) - this.margin];
        let rightBot = [Math.min(leftTop[0] + this.tileCount[0], room.width - 1), Math.min(leftTop[1] + this.tileCount[1], room.height - 1)];
        leftTop = [Math.max(leftTop[0], 0), Math.max(leftTop[1], 0)];
        let tile = 0;

        for (let i = leftTop[0]; i < rightBot[0]; i++) {
            for (let j = leftTop[1]; j < rightBot[1]; j++) {
                tile = room.backgroundTiles[j][i];
                if (tile != undefined) {
                    this.camera.setCanvasCoord(tile);
                    tile.render();
                }
            }
        }
        // Without sprites
        let sortArray = [];
        for (let i = leftTop[0]; i < rightBot[0]; i++) {
            for (let j = leftTop[1]; j < rightBot[1]; j++) {
                let drowableMap = room.middlegroundTiles[j][i];
                drowableMap.forEach((key) => {
                    sortArray.push(key);
                })
            }
        }
        sortArray.sort((a, b) => {
            return (a.actor.centre.y > b.actor.centre.y ? 1 : -1)
        });
        sortArray.forEach((key) => {
            this.camera.setCanvasCoord(key);
            key.render();
        })
        //room.nav.render()
    }
}

