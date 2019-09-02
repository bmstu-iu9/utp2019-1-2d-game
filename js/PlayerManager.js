'use strict'

/**
 * Player control
 */
class PlayerManager {
    /**
     *
     * @param {NPC} player
     */
    constructor(player) {
        this.player = player
        this.Direction = new Vector2d(0, 0)
    }

    update() {
        let speed = this.player.statsManager.stats.speed
        let xDirection = 0
        let yDirection = 0
        if (keyboard.KeyW || keyboard.ArrowUp) {
            yDirection -= speed
        }
        if (keyboard.KeyS || keyboard.ArrowDown) {
            yDirection += speed
        }
        if (keyboard.KeyA || keyboard.ArrowLeft) {
            xDirection -= speed
        }
        if (keyboard.KeyD || keyboard.ArrowRight) {
            xDirection += speed
        }
        this.player.state=STATE.walk
        if (xDirection !== 0 && yDirection !== 0) {
            xDirection = ~~(xDirection / Math.sqrt(2))
            yDirection = ~~(yDirection / Math.sqrt(2))
        }
        if (xDirection === 0 && yDirection === 0) {
            this.player.state=STATE.idle
        } else {
            this.player.direction.x = xDirection
            this.player.direction.y = yDirection
        }
        this.Direction.set(xDirection, yDirection)
        if (keyboard.KeyF) {
            this.player.abilities[0].cast()
        }

        if (mouse.isRightClicked) {
            this.player.abilities[1].cast()
        }

        if (keyboard.Space){
            if (this.player.abilities[2].cast())
                this.player.state=STATE.attack
        }

        this.player.actor.update()
        this.player.actor.changePosition(this.Direction)
    }
}