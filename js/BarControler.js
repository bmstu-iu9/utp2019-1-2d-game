'use strict'

class BarControler {
    constructor() {
        this.hpBar = document.getElementById("hpBar")
        this.manaBar = document.getElementById("manaBar")
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
    }

    /**
     *
     * @param {Number} mana
     */
    setMana(mana) {
        this.manaBar.setAttribute("data-value", String(mana))
    }
}
