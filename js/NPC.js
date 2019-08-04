class NPC extends GameObject {
    /**
     * 
     * @param {Vector2d} [coords = new Vector2d(0,0)] 
     * @param {Vector2d} [centre = new Vector2d(0,0)]
     */
    constructor(coords = new Vector2d(0, 0), centre = new Vector2d(0, 0), id = Game.getUniqId()) {
        super(id)
        this.actor = new MovableActor(coords, centre)
        this.drawable = new DrawableObject("middleground", SpriteFactory.CreateTestSprite())
    }
    render() {
        this.drawable.render()
    }

    Update() {
        let speed = 10
        if (keyboard.KeyW) {
            this.actor.changePosition(new Vector2d(0, -speed))
            //console.log(this.actor.position)
        }
        if (keyboard.KeyS) {
            this.actor.changePosition(new Vector2d(0, speed))
            //console.log(this.actor.position)
        }
        if (keyboard.KeyA) {
            this.actor.changePosition(new Vector2d(-speed, 0))
            //console.log(this.actor.position)
        }
        if (keyboard.KeyD) {
            this.actor.changePosition(new Vector2d(speed, 0))
            //console.log(this.actor.position)
        }
        Game.camera.focusOn(this.actor.position)
    }
}