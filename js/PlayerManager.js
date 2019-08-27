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
        let speed = 4
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
        this.player.walking = true
        if (xDirection !== 0 && yDirection !== 0) {
            xDirection = ~~(xDirection / Math.sqrt(2))
            yDirection = ~~(yDirection / Math.sqrt(2))
        }
        if (xDirection == 0 && yDirection == 0) {
            this.player.walking = false
        } else {
            this.player.direction.x = xDirection
            this.player.direction.y = yDirection
        }
        this.Direction.set(xDirection, yDirection)
        if (keyboard.KeyF) {
            SpellFactory.CreateFireBall(this.player.actor.centre.x + xDirection * 20, this.player.actor.centre.y + yDirection * 20, new Vector2d(this.Direction))
        }

        if (this.Direction.x !== 0 || this.Direction.y !== 0) {
            this.player.collisonSolveStrategy = 'move'
        } else {
            this.player.collisonSolveStrategy = 'stay'
        }
        this.player.actor.update()
        this.player.actor.changePosition(this.Direction)
    }
}