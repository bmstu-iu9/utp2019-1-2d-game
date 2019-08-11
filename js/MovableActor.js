class MovableActor extends Actor {
    /**
     * 
     * @param {Vector2d} [coords = new Vector2d(0,0)] 
     * @param {Vector2d} [centre = new Vector2d(0,0)]
     */
    constructor(coords = new Vector2d(0, 0), centre = new Vector2d(0, 0)) {
        super(coords, centre)
        this.offset = new Vector2d(0, 0)
        this.prevPosition = new Vector2d(0, 0)
    }

    /**
     * 
     * @param {Vector2d} arg 
     */
    changePosition(arg) {
        this.centre.add(arg);
        this.position.add(arg);
    }

    move(arg) {
        this.centre.add(arg);
        this.position.add(arg);
    }

    update() {
        this.prevPosition.set(this.position)
    }

    getOffset() {
        let offset = new Vector2d(0, 0)
        this.prevPosition.add(this.position, offset)
        return offset
    }

    toJSON() {
        let jsonObj = super.toJSON()
        jsonObj.offset = this.offset
        jsonObj.prevPosition = this.prevPosition
        return jsonObj
    }

    /**
     *
     * @param {MovableActor} object
     */

    static fromJSON(object){
        let movableActor = new MovableActor(Vector2d.fromJSON(object.position),Vector2d.fromJSON(object.centre))
        movableActor.offset = Vector2d.fromJSON(object.offset)
        movableActor.prevPosition = Vector2d.fromJSON(object.prevPosition)
    }
}