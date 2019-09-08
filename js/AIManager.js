'use strict'
class AIManager {
    constructor(character, nav) {
        this.character = character
        this.trianglePath = []
        this.agrro = false
        this.resultPath = []
        this.path = []
        this.target = Game.player
        this.nav = nav
        this.type = "AIManager"
    }

    update() {
        let character = this.character.actor.centre
        let target = this.target.actor.centre
        if (!this.agrro) {
            this.nav.savePath(character, target, this)
        }
        let direction = new Vector2d(0, 0)
        target.sub(character, direction)
        if (direction.length() < 59) {
            if (this.character.abilities[2].cast(direction)) {
                this.character.state = STATE.attack
            } else {
                this.character.state = STATE.idle
            }
            return
        }
        //if (!this.agrro) {
        if (direction.length() > 500 || (!this.agrro && this.resultPath.length > 1)) {
            this.character.state = STATE.idle
            this.agrro = false
            return
        } else {
            this.agrro = true;
        }
        //}
        this.resultPath[0].sub(this.character.actor.centre, direction)
        if (direction.length() <= this.character.hitbox.hitbox.radius * 2 / 3) {
            this.resultPath.splice(0, 1)
        } else {
            this.nav.savePath(character, target, this)
        }
        this.resultPath[0].sub(this.character.actor.centre, direction)
        direction.normalize()
        direction.mul(3.)
       
        this.character.state= STATE.walk
        if (direction.x === 0 && direction.y === 0) {
            this.character.state = STATE.idle
        } else {
            this.character.direction.set(direction)
        }
        this.character.actor.update()
        this.character.actor.changePosition(direction)
    }

    toJSON(){
        return Serializations[this.type](this)
    }

}