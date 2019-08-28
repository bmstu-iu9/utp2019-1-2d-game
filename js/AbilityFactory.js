class AbilityFactory {
    /**
     *
     * @param {NPC} npc
     */
    static createFireBallAbility(npc) {
        let fireBallAbility = new Ability(npc, 5, 1.5, 0.5)
        fireBallAbility.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
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
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.CastLightning(npc)
                this.coolDownTime = this.coolDown
            }
        }
        return lightning
    }
}