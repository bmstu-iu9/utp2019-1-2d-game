class AbilityFactory {
    /**
     *
     * @param {NPC} npc
     */
    static createFireBallAbility(npc) {
        let fireBallAbility = new Ability(npc, 45, 2, 0.5)
        fireBallAbility.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime <= 0) {
                let vector = new Vector2d(canvas.clickPositionX, canvas.clickPositionY + 50).add(Game.camera.position).sub(npc.actor.centre)
                this.npc.drawable.drowable.reset()
                this.npc.drawable.drowable.switch("cast", vector)
                this.npc.soundBoard.fireballCastSound.play()
                this.npc.casting = 30
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.CreateFireBall(npc.actor.centre.x, npc.actor.centre.y, vector, npc)
                this.coolDownTime = this.coolDown
            }
        }
        return fireBallAbility
    }

    static createLigthningAbility(npc) {
        let lightning = new Ability(npc, 100, 7, 0.5)
        lightning.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                let vector = new Vector2d(canvas.clickPositionX, canvas.clickPositionY).add(Game.camera.position).sub(npc.actor.centre)
                this.npc.drawable.drowable.switch("cast", vector)
                this.npc.casting = 30
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.CastLightning(npc)
                this.coolDownTime = this.coolDown
            }
        }
        return lightning
    }

    static Hit(npc){
        let hit = new Ability(npc, 0, 1.2, 31)
        hit.cast = function (vector) {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                this.npc.drawable.drowable.reset()
                this.npc.drawable.drowable.switch('beat', vector)
                this.npc.soundBoard.hitSound.play()
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.Hit(npc, vector)
                this.coolDownTime = this.coolDown
                this.npc.casting=28
                return true
            }
        }
        return hit
    }
}