'use strict'

/**
 * Player control
 */
class PlayerManager{
    /**
     *
     * @param {NPC} player
     */
    constructor(player){
        this.player=player
    }

    update(){
        let speed = 10
        if (keyboard.KeyW) {
            this.player.actor.changePosition(new Vector2d(0, -speed))
            //console.log(this.actor.position)
        }
        if (keyboard.KeyS) {
            this.player.actor.changePosition(new Vector2d(0, speed))
            //console.log(this.actor.position)
        }
        if (keyboard.KeyA) {
            this.player.actor.changePosition(new Vector2d(-speed, 0))
            //console.log(this.actor.position)
        }
        if (keyboard.KeyD) {
            this.player.actor.changePosition(new Vector2d(speed, 0))
            //console.log(this.actor.position)
        }
        Game.camera.focusOn(this.player.actor.position)
    }
}