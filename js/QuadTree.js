'use strict';
class Rectangle{
    constructor(a,b,width,height){
        this.x=a;
        this.y=b;
        this.width=width;
        this.height=height;
    }
}


class QuadTree{
    constructor(bounds,capacity,parent){
        this.bounds=bounds;
        this.next=new Array(4).fill(null);
        this.objects=[];
        this.capacity=capacity||4;
        this.parent=parent||this;
    }

    divide(){
        const halfHeight=~~this.bounds.height/2;
        const halfWidth=~~this.bounds.width/2;

        this.next[0]=new QuadTree(new Rectangle(this.bounds.x+halfWidth,this.bounds.y,halfWidth,halfHeight),this.capacity,this);
        this.next[1]=new QuadTree(new Rectangle(this.bounds.x,this.bounds.y,halfWidth,halfHeight),this.capacity,this);
        this.next[2]=new QuadTree(new Rectangle(this.bounds.x,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity,this);
        this.next[3]=new QuadTree(new Rectangle(this.bounds.x+halfWidth,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity,this);
    }

    /**
     *
     * @param {AABB,CircleHitbox} object
     * @returns {{left: boolean, right: boolean, up: boolean, down: boolean}}
     */
    getEstimation(object){
        const minMaxY=object.getMinMax('y');
        const minMaxX=object.getMinMax('x');

        const xCentre=this.bounds.x+(~~this.bounds.width/2);
        const yCentre=this.bounds.y+(~~this.bounds.height/2);
        return{
            right:minMaxX.min>xCentre,
            left:minMaxX.max<xCentre,
            up:minMaxY.max<yCentre,
            down:minMaxY.min>yCentre
        }
    }

    /**
     * @param {AABB,CircleHitbox} object
     */
    getIndex(object){
        let index;

        const estimation=this.getEstimation(object);

        if (estimation.right){
            if (estimation.up){
                index=0;
            }
            if (estimation.down){
                index=3;
            }
        }else if (estimation.left){
            if (estimation.up){
                index=1;
            }
            if (estimation.down){
                index=2;
            }
        }
        return {
            index:index,
            estimation:estimation
        };
    }

    /**
     *
     * @param {AABB,CircleHitbox} object
     */
    add(object){
        if (this.next[0]!=null){
            const index=this.getIndex(object);
            if (index.index!==undefined){
                this.next[index.index].add(object);
            }
            else this.objects.push(object);
        }else {
            this.objects.push(object);
            if (this.objects.length>this.capacity){
                this.divide();
                for (let i=0;i<this.objects.length;){
                    const index=this.getIndex(this.objects[i]);
                    if (index.index!==undefined){
                        this.next[index.index].add(this.objects.removeHitboxByIndex(i));
                    }else {
                        i++;
                    }
                }
            }
        }
    }


    static getIndexes(estimation){
        if (!estimation.up && !estimation.down){
            if (!estimation.right && !estimation.left){
                return [0,1,2,3]
            }
            if (estimation.right) return [0,3]
            if (estimation.left) return [1,2]
        }else if (!estimation.right && !estimation.left){
            if (estimation.up) return [0,1]
            if (estimation.down) return [2,3]
        }
        return [0,1,2,3]
    }

    /**
     * @param {[]} objects
     * @param {AABB,CircleHitbox} object
     */
    retrieve(objects,object){
        if (this.next[0]!=null){
            const index=this.getIndex(object);
            if (index.index!==undefined){
                this.next[index.index].retrieve(objects,object);
            }else {
                const indices=QuadTree.getIndexes(index.estimation)
                for (let i of indices){
                    this.next[i].retrieve(objects,object);
                }
            }
        }
        [].push.apply(objects,this.objects);
        return objects;
    }

    /**
     * @param {AABB,CircleHitbox} object
     */
    delete(object){
        if (this.next[0]!=null){
            const index=this.getIndex(object);
            if (index.index!==undefined){
                this.next[index.index].delete(object);
            }else {
                if (this.objects.removeHitbox(object)) {
                    let amount = this.objects.length
                    for (let n of this.next)
                        amount += n.objects.length
                    if (amount <= this.capacity) {
                        for (let i = 0; i < 4; i++) {
                            [].push.apply(this.objects, this.next[i].objects);
                            this.next[i] = null;
                        }
                    }
                }
            }
        }else {
            if (this.objects.removeHitbox(object)) {
                let amount = this.parent.objects.length;
                for (const n of this.parent.next) {
                    amount += n.objects.length;
                }
                if (amount <= this.capacity) {
                    for (let i = 0; i < 4; i++) {
                        [].push.apply(this.parent.objects, this.parent.next[i].objects);
                        this.parent.next[i] = null;
                    }
                }
            }
        }
    }

    clear(){
        this.objects=[];
        for (let i=0;i<4;i++){
            if (this.next[i]!=null){
                this.next[i].clear();
                this.next[i]=null;
            }
        }
    }

    /**
     *
     * @param {NPC} object
     */
    update(object) {
        this.delete(object.hitboxManager.hitboxPrevState);
        this.add(object.hitboxManager.hitbox);
    }
}