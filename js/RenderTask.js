class RenderTask {
    /**
     *
     * @param {*} object
     * @param {Rectangle} drawRectangle
     */
    constructor(object, drawRectangle) {
        this.id = Game.getUniqId();
        this.object = object;
        this.actor = object.actor;
        this.drawRectangle = drawRectangle;
    }
    render() {
        if (this.drawRectangle === undefined) {
            ctx.drawImage(this.object.drawable.drowable.img, 0, 0, this.object.drawable.drowable.width, this.object.drawable.drowable.height, this.object.drawable.canvasCoord.x, this.object.drawable.canvasCoord.y, this.object.drawable.drowable.width, this.object.drawable.drowable.height);
        }
        else {
            ctx.drawImage(this.object.drawable.drowable.img, this.drawRectangle.x - this.object.actor.position.x, this.drawRectangle.y - this.object.actor.position.y, this.drawRectangle.x1 - this.drawRectangle.x, this.drawRectangle.y1 - this.drawRectangle.y, this.drawRectangle.x - Game.camera.position.x, this.drawRectangle.y - Game.camera.position.y, this.drawRectangle.x1 - this.drawRectangle.x, this.drawRectangle.y1 - this.drawRectangle.y);
        }
    }
}
