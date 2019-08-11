'use strict'

const arrange=(i, object)=>{
    if (i>=0) {
        for (let j=i+1;j<object.length;j++) {
            object[j - 1] = object[j];
        }
        object.pop();
    }
}

Array.prototype.remove=function(object){
    let i=this.indexOf(object)
    arrange(i,this)
}

Array.prototype.removeByIndex=function(index){
    const res=this[index]
    arrange(index,this)
    return res
}

