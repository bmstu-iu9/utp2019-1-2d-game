'use strict'

class DrawableObject {
    constructor(x, y, placement, drowable) {
        this.gameCoord = new Vector2d(x, y);
        this.placement = placement;
        this.drowable = drowable
    }
    setCanvasCoord(arg) {
        this.canvasCoord = arg;
    }
    setGameCoord(x, y) {
        this.gameCoord.set(x, y);
    }
    render() {
        this.drowable.render(this.canvasCoord);
    }
}