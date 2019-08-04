'use strict'

class DrawableObject {
    constructor(placement, drowable) {
        this.placement = placement;
        this.drowable = drowable
        this.canvasCoord = new Vector2d(0, 0)
    }
    render() {
        this.drowable.render(this.canvasCoord);
    }
}