'use strict'

class DrawableObject {
    gameCoord;
    canvasCoord = 0;
    placement;
    drowable; // Sprite or Texture

    constructor(x, y, placement, drowable) {
        this.gameCoord = new Vector2d(x, y);
        this.placement = placement;
        this.drowable = drowable
    }
    setCanvasCoord(arg) {
        this.canvasCoord = arg;
    }
    render() {
        this.drowable.render(this.canvasCoord);
    }
}