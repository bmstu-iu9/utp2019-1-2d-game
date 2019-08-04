'use strict'
class Camera {
    constructor(ledwidth, ledheight) {
        this.position = new Vector2d(-25, -25);
        this.ledWidth = ledwidth;
        this.ledHeight = ledheight;
    }

    setPosition(x, y) {
        this.position.set(x, y);
    }
    /**
     * Возвращает координаты объекта на Canvas
     * @param {GameObject} tile
     */
    setCanvasCoord(tile) {
        tile.position.sub(this.position, tile.drawable.canvasCoord)
    }

    /**
     * Возвращает позицию камеры
     * @returns {Vector2d}
     */
    getPosition() {
        return this.position;
    }

    getLedWidth() {
        return this.ledWidth;
    }
    getLedHeight() {
        return this.ledHeight;
    }

}
