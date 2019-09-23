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
        PlayerManager.progressHolder = class LevelManager {
            constructor(){
                this.level = 0
                this.experience = 0
                this.bound = 100
                this.bonuses=[0,0,0,0,0,0]
                this.type = "levelManager"
                LevelManager.descriptor = {
                    1:[150,150,1,1,1,3.5],
                    2:[175,200,1.2,1,1,3.75],
                    3:[175,225,1.5,1,1.1,3.75],
                    4:[225,270,2,1,1.5,5]
                }
                this.order={
                    0:'hp',
                    1:'mana',
                    2:'strenght',
                    3:'agility',
                    4:'intelligence',
                    5:'speed',
                }
            }

            /**
             *
             * @param {NPC} npc
             */
            update(npc){
                if (npc.type==='staticNpc') this.experience+=250
                else this.experience+=100
                if (this.bound<=this.experience){
                    TilesFactory.CreateLevelUpIcon(player)
                    this.experience%=this.bound
                    this.bound*=2
                    this.level++
                    for (let i=2;i<LevelManager.descriptor[this.level].length;i++){
                        player.statsManager.stats[this.order[i]]=LevelManager.descriptor[this.level][i]
                        player.statsManager.stats[this.order[i]]+=this.bonuses[i]
                    }
                    player.statsManager.changeLimits(LevelManager.descriptor[this.level][0]+this.bonuses[0],LevelManager.descriptor[this.level][1]+this.bonuses[0])
                }
            }

            toJSON(){
                return Serializations[this.type](this)
            }

            /**
             *
             * @param {LevelManager} object
             */

            static fromJSON(object){
                let levelManager = new LevelManager()
                levelManager.experience = object.experience
                levelManager.bonuses = object.bonuses
                levelManager.bound = object.bound
                levelManager.level = object.level
                return levelManager
            }
        }
        PlayerManager.levelManager=new PlayerManager.progressHolder()
    }

    update() {
        this.player.statsManager.stats.hp += 0.05*this.player.statsManager.stats.strenght;
        this.player.statsManager.stats.mana += 0.05*this.player.statsManager.stats.intelligence;
        let speed = this.player.statsManager.stats.speed
        let xDirection = 0
        let yDirection = 0
        let vector = new Vector2d(canvas.clickPositionX, canvas.clickPositionY).add(Game.camera.position).sub(this.player.actor.centre)
        if (this.player.casting > 0) {
            return
        }
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
        if (keyboard.KeyQ) {
            if (Game.result.length === 0 || Game.result[Game.result.length - 1][0] !== this.player.actor.centre.x || Game.result[Game.result.length - 1][1] !== this.player.actor.centre.y) {
                Game.result.push([this.player.actor.centre.x, this.player.actor.centre.y])
            }
        }
        if (keyboard.KeyE) {
            console.log(Game.result.toString())
        }
        if (keyboard.KeyF) {
            this.player.abilities[0].cast()
        }

        if (mouse.isRightClicked) {
            this.player.abilities[1].cast()
        }

        if (mouse.isLeftClicked) {
            if (this.player.abilities[2].cast(vector))
                this.player.state=STATE.attack
        }

        this.player.actor.update()
        this.player.actor.changePosition(this.Direction)
        this.player.soundBoard.update()
    }
}
