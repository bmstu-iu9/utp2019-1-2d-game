'use strict'

/**
 *
 * @param i
 * @param object
 * @return {boolean}
 */
const arrange=(i, object)=>{
    if (i<object.length) {
        for (let j=i+1;j<object.length;j++) {
            object[j - 1] = object[j]
        }
        object.pop()
        return true
    }
    return false
}

/**
 * @param {AABB,CircleHitbox} object
 * @return {boolean}
 */
Array.prototype.removeHitbox=function(object){
    let i;
    for (i=0;i<this.length;i++)
        if (this[i].hitbox.equals(object)) break
    return arrange(i,this)
}

/**
 * @param {Number} index
 * @return {AABB,CircleHitbox}
 */
Array.prototype.indexOfHitbox=function(object){
    let i;
    for (i=0;i<this.length;i++)
        if (this[i].hitbox.equals(object)) break
    return i<this.length ? i : -1
}

Array.prototype.remove=function (object) {
    for (let i=0;i<this.length;i++){
        if (this[i].hitbox.equals(object)){
            this.splice(i,1)
            return true
        }
    }
}

