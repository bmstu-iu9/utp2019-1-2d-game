class AbilityFactory {
    /**
     *
     * @param {NPC} npc
     */
    static createFireBall(npc) {
        let fireBall = new Ability(npc, 10, 2, 0.5)
        fireBall.cast = function () {
            if (this.npc.statsManager.stats.mana >= this.manaCost) {
                this.npc.statsManager.stats.mana -= this.manaCost

            }
        }
        return fireBall
    }
}