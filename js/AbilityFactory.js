class AbilityFactory {
    /**
     *
     * @param {NPC} npc
     */
    static createFireBallAbility(npc) {
        let fireBallAbility = new Ability(npc, 5, 1.5, 0.5)
        fireBallAbility.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                let vector = new Vector2d(canvas.clickPositionX, canvas.clickPositionY).add(Game.camera.position).sub(npc.actor.centre)
                this.npc.drawable.drowable.switch("cast", vector)
                this.npc.casting = 30
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.CreateFireBall(npc.actor.centre.x, npc.actor.centre.y, vector, npc)
                this.coolDownTime = this.coolDown
            }
        }
        return fireBallAbility
    }

    static createLigthningAbility(npc) {
        let lightning = new Ability(npc, 5, 1.5, 0.5)
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
        let hit=new Ability(npc,5,1.5,28)
        hit.cast=function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.Hit(npc)
                this.coolDownTime = this.coolDown
                this.npc.casting=25
                return true
            }
        }
        return hit
    }
}