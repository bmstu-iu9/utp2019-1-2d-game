class AbilityFactory {
    /**
     *
     * @param {NPC} npc
     */
    static createFireBallAbility(npc) {
        let fireBallAbility = new Ability(npc, 5, 2, 0.5)
        fireBallAbility.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost && this.coolDownTime === 0) {
                this.npc.statsManager.stats.mana -= this.manaCost
                SpellFactory.CreateFireBall(npc.actor.centre.x, npc.actor.centre.y, npc.direction)
                this.coolDownTime = this.coolDown
            }
        }
        return fireBallAbility
    }
}