'use strict'

export default class GameObject{
    /**
     * 
     * @param {String} id Строковый идентификатор игрового объекта
     */
    constructor(id){
        this.id = id
    }
    /**
     * Строковое предствление игрового объекта, по умолчанию возвращает id
     */
    toString(){ 
        return this.id
    }
}