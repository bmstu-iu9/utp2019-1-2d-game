'use strict'

class BarControler {
    /**
     *
     * @param {NPC} player
     */
    constructor(player) {
        this.hpBar = document.getElementById("hpBar")
        this.manaBar = document.getElementById("manaBar")
        this.player = player
        this.hp = player.statsManager.hpLimit
        this.mana = player.statsManager.manaLimit
        this.hpCount = document.getElementById("hp")
        this.manaCount = document.getElementById("mana")
        this.hpBar.setAttribute("data-total", String(this.player.statsManager.hpLimit))
        this.manaBar.setAttribute("data-total", String(this.player.statsManager.manaLimit))
        this.hpCount.innerText = ~~(this.hp) + "/" + this.player.statsManager.hpLimit
        this.manaCount.innerText = ~~(this.mana) + "/" + this.player.statsManager.manaLimit
    }

    /**
     * @return {Number}
     */
    getHp() {
        return Number(this.hpBar.getAttribute("data-value"))
    }

    /**
     * @return {Number}
     */
    getMana() {
        return Number(this.manaBar.getAttribute("data-value"))
    }

    /**
     *
     * @param {Number} hp
     */
    setHp(hp) {
        this.hpBar.setAttribute("data-value", String(hp))
        this.hpBar.style["width"] = String(~~(hp / this.hpLimit * 100)) + "%"
    }

    /**
     *
     * @param {Number} mana
     */
    setMana(mana) {
        this.manaBar.setAttribute("data-value", String(mana))
        this.manaBar.style["width"] = String(~~(mana / this.manaLimit * 100)) + "%"
    }

    update() {
        if (this.player.statsManager.hpLimit !== this.hpLimit){
            this.hpLimit = this.player.statsManager.hpLimit
            this.hpBar.setAttribute("data-total", this.hpLimit)
        }
        if (this.player.statsManager.manaLimit !== this.manaLimit){
            this.manaLimit = this.player.statsManager.manaLimit
            this.manaBar.setAttribute("data-total", this.manaLimit)
        }
        if (this.hp !== this.player.statsManager.stats.hp) {
            this.hp = this.player.statsManager.stats.hp
            this.setHp(this.player.statsManager.stats.hp)
            this.hpCount.innerText = ~~(this.hp) + "/" + this.player.statsManager.hpLimit
        }
        if (this.mana !== this.player.statsManager.stats.mana) {
            this.mana = this.player.statsManager.stats.mana
            this.setMana(this.player.statsManager.stats.mana)
            this.manaCount.innerText = ~~(this.mana) + "/" + this.player.statsManager.manaLimit
        }
    }
}

