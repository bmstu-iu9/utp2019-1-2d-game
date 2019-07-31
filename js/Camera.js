'use strict'
class Camera {
    position;
    ledwidth;
    ledheight;
    constructor(ledwidth, ledheight) {
        this.position = new Vector2d(0, 0);
        this.ledwidth = ledwidth;
        this.ledheight = ledheight;
    }
    setPosition(x, y) {
        this.position.set(x, y);
    }
    getCanvasCoord(elementCoord) {
        return elementCoord.sub(this.postion);
    }
    getPosition() {
        return this.position;
    }
}