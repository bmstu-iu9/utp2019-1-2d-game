'use strict';

class VectorBuffer{
    constructor(capacity){
        this.buffer=[];
        this.inUse=[];
        if (capacity===undefined || capacity<0) capacity=4;
        for (let i=0;i<capacity;i++){
            this.buffer.push(new Vector2d());
        }
    }

    getFreeVector(){
        if (this.buffer.length===0){
            this.buffer.push(new Vector2d());
            console.log('it has happened');
        }
        let res=this.buffer.pop();
        this.inUse.push(res);
        return res;
    }

    flip(){
        while (this.inUse.length!==0){
            this.buffer.push(this.inUse.pop());
        }
    }

    decreaseTo(capacity){
        if (this.buffer.length>capacity){
            this.buffer.splice(capacity);
            return true;
        }
        return false;
    }
    flipAndDecreaseTo(capacity){
        if (!this.decreaseTo(capacity)){
            for (let i=0;i<this.inUse.length && this.buffer.length<capacity;i++){
                this.buffer.push(this.inUse[i]);
            }
        }
        this.inUse=[];
    }
}