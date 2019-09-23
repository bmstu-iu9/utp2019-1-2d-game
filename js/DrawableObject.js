'use strict'

class DrawableObject {
    constructor(placement, drowable) {
        this.placement = placement;
        this.drowable = drowable
        this.canvasCoord = new Vector2d(0, 0)
        this.type = "drawableObject"
    }

    render() {
        this.drowable.render(this.canvasCoord);
    }

    toJSON() {
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {DrawableObject} object
     */
    static fromJSON(object) {
        let drawableObj = !("speed" in object) ? new DrawableObject(object.placement, Texture.fromJSON(object.drowable)) :
            ("hitbox" in object.drowable) ? new DrawableObject(object.placement, SpriteFactory.CreateFireBallSprite())
                : new DrawableObject(object.placement, SpriteFactory.CreateLightningSprite())
        drawableObj.canvasCoord = Vector2d.fromJSON(object.canvasCoord)
        return drawableObj
    }
}
