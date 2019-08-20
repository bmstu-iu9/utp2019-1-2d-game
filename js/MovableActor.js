'use strict'
/**
 * @class
 * 
 */
class MovableActor extends Actor {
    /**
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
        this.position.sub(this.prevPosition, this.offset)
    }
    /**
     * 
     * @param {Vector2d} arg 
     */
    move(arg) {
        this.centre.add(arg);
        this.position.add(arg);
        this.position.sub(this.prevPosition, this.offset)
    }

    update() {
        this.prevPosition.set(this.position)
        this.offset.x = 0
        this.offset.y = 0
    }
}