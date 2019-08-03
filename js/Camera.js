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
     * @param {Vector2d} elementCoord 
     */
    getCanvasCoord(elementCoord) {
        return elementCoord.sub(this.position,new Vector2d());
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
