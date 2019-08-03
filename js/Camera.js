'use strict'
class Camera {
    constructor(ledwidth, ledheight) {
        this.position = new Vector2d(0, 0);
        this.ledWidth = ledwidth;
        this.ledHeight = ledheight;
    }

    setPosition(x, y) {
        this.position.set(x, y);
    }
    /**
     * Возвращает координаты объекта на Canvas
     * @param {DrawableObject} drawable
     */
    setCanvasCoord(drawable) {
        drawable.canvasCoord = drawable.gameCoord.sub(this.position.x,  this.position.y, drawable.canvasCoord);
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
