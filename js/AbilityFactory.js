class AbilityFactory {
    /**
     *
     * @param {NPC} npc
     */
    static createFireBallAbility(npc) {
        let fireBallAbility = new Ability(npc, 5, 1.5, 0.5)
        fireBallAbility.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                this.npc.drawable.drowable.switch("cast", this.npc.direction)
                this.npc.casting = 30
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.CreateFireBall(npc.actor.centre.x, npc.actor.centre.y, Object.create(npc.direction), npc)
                this.coolDownTime = this.coolDown
            }
        }
        return fireBallAbility
    }

    static createLigthningAbility(npc) {
        let lightning = new Ability(npc, 5, 1.5, 0.5)
        lightning.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                this.npc.drawable.drowable.switch("cast", this.npc.direction)
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
        hit.cast=function (vector) {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.Hit(npc,vector)
                this.coolDownTime = this.coolDown
                this.npc.casting=25
                return true
            }
        }
        return hit
    }
}