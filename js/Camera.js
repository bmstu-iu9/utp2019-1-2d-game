'use strict';
class Camera {
    constructor(ledwidth, ledheight) {
        this.position = new Vector2d(-25, -25);
        this.focusObject = null
        this.ledWidth = ledwidth;
        this.ledHeight = ledheight;
    }
    Update(){
        this.position.set(this.focusObject.position.x,
                          this.focusObject.position.y)
        this.position.x -= ~~(canvas.width / 2)
        this.position.y -= ~~(canvas.height / 2)
    }

    setPosition(x, y) {
        this.position.set(x, y);
    }
    /**
     * Задает фокус камеры на объект
     * @param {Actor} actor
     */
    focusOn(actor) {
        this.focusObject = actor
    }
    /**
     * Возвращает координаты объекта на Canvas
     * @param {GameObject} tile
     */
    setCanvasCoord(tile) {
        tile.actor.position.sub(this.position, tile.drawable.canvasCoord)
    }

    setGameCoord(vector){
        vector.add(this.position)
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
