'use strict'
class AIManager {
    constructor(character, nav) {
        this.character = character
        this.trianglePath = []
        this.resultPath = []
        this.path = []
        this.target = Game.player
        this.nav = nav
    }

    update() {
        let character = this.character.actor.centre
        let target = this.target.actor.centre
        this.nav.savePath(character, target, this)
        let direction = new Vector2d(0, 0)
        target.sub(character, direction)
        if (direction.length() < 90) {
            this.character.state=STATE.idle
            return
        }
        if (direction.length() > 350) {
            this.character.state = STATE.idle
            return
        }
        this.resultPath[0].sub(this.character.actor.centre, direction)
        if (direction.length() <= this.character.hitbox.hitbox.radius * 2 / 3) {
            this.resultPath.splice(0, 1)
        } else {
            this.nav.savePath(character, target, this)
        }
        this.resultPath[0].sub(this.character.actor.centre, direction)
        direction.normalize()
        direction.mul(2)
       
        this.character.state= STATE.walk
        if (direction.x === 0 && direction.y === 0) {
            this.character.state = STATE.idle
        } else {
            this.character.direction.set(direction)
        }
        this.character.actor.update()
        this.character.actor.changePosition(direction)
    }
}