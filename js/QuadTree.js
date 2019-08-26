'use strict'
class Rectangle{
    constructor(a,b,width,height){
        this.x=a
        this.y=b
        this.width=width
        this.height=height
    }
}


class QuadTree{
    constructor(bounds,capacity,parent){
        this.bounds=bounds
        this.next=new Array(4).fill(null)
        this.objects=[]
        this.capacity=capacity||4
        this.parent=parent||this
    }

    divide(){
        const halfHeight=~~this.bounds.height/2
        const halfWidth=~~this.bounds.width/2

        this.next[0]=new QuadTree(new Rectangle(this.bounds.x+halfWidth,this.bounds.y,halfWidth,halfHeight),this.capacity,this)
        this.next[1]=new QuadTree(new Rectangle(this.bounds.x,this.bounds.y,halfWidth,halfHeight),this.capacity,this)
        this.next[2]=new QuadTree(new Rectangle(this.bounds.x,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity,this)
        this.next[3]=new QuadTree(new Rectangle(this.bounds.x+halfWidth,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity,this)
    }

    /**
     *
     * @param {AABB,CircleHitbox,Vector2d} object
     * @returns {{left: boolean, right: boolean, up: boolean, down: boolean}}
     */
    getEstimation(object){
        let minMaxX,minMaxY
        if (object instanceof Vector2d){
            minMaxX={
                min:object.x,
                max:object.x
            }
            minMaxY={
                min:object.y,
                max:object.y
            }
        }else {
            minMaxY=object.getMinMaxY()
            minMaxX=object.getMinMaxX()
        }

        const xCentre=this.bounds.x+(~~this.bounds.width/2)
        const yCentre=this.bounds.y+(~~this.bounds.height/2)
        return{
            right:minMaxX.min>xCentre,
            left:minMaxX.max<xCentre,
            up:minMaxY.max<yCentre,
            down:minMaxY.min>yCentre
        }
    }

    /**
     * @param {AABB,CircleHitbox,NPC,StaticObject} obj
     */
    getIndex(obj){
        let index

        let object
        if (obj.getHitbox!==undefined)
            object=obj.getHitbox()
        else  object=obj

        const estimation=this.getEstimation(object)

        if (estimation.right){
            if (estimation.up){
                index=0
            }
            if (estimation.down){
                index=3
            }
        }else if (estimation.left){
            if (estimation.up){
                index=1
            }
            if (estimation.down){
                index=2
            }
        }
        return {
            index:index,
            estimation:estimation
        };
    }

    /**
     *
     * @param {NPC,StaticObject} object
     */
    add(object){
        if (this.next[0]!=null){
            const index=this.getIndex(object.hitbox||object)
            if (index.index!==undefined){
                this.next[index.index].add(object)
            }
            else this.objects.push(object)
        }else {
            this.objects.push(object)
            if (this.objects.length>this.capacity){
                this.divide()
                for (let i=0;i<this.objects.length;){
                    const index=this.getIndex(this.objects[i].hitbox||this.objects[i])
                    if (index.index!==undefined){
                        this.next[index.index].add(this.objects.splice(i,1)[0])
                    }else {
                        i++
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
     * @param {NPC,StaticObject} object
     */
    retrieve(objects,object){
        if (this.next[0]!=null){
            const index=this.getIndex(object.hitbox);
            if (index.index!==undefined){
                this.next[index.index].retrieve(objects,object)
            }else {
                const indices=QuadTree.getIndexes(index.estimation)
                for (let i of indices){
                    this.next[i].retrieve(objects,object)
                }
            }
        }
        [].push.apply(objects,this.objects)
        return objects
    }

    /**
     *
     * @param {AABB,CircleHitbox} object
     * @return {boolean}
     */
    delete(object){
        if (this.next[0]!=null){
            const index=this.getIndex(object)
            if (index.index!==undefined){
                this.next[index.index].delete(object)
            }else {
                if(this.objects.removeHitbox(object)) {
                    QuadTree.rearrange(this,this.capacity)
                    return true
                }
            }
        }else {
            if (this.objects.removeHitbox(object) && this.parent!==this) {
                QuadTree.rearrange(this.parent,this.capacity)
                return true
            }
        }
    }

    static rearrange(node,capacity){
        let amount = 0
        const getAll = (node) => {
            if (node.next[0] != null) {
                for (let i = 0; i < 4; i++) {
                    getAll(node.next[i])
                }
            }
            amount += node.objects.length
        }
        getAll(node)
        if (amount <= capacity) {
            for (let i = 0; i < 4; i++) {
                [].push.apply(node.objects, node.next[i].objects)
                node.next[i] = null
            }
        }
    }

    clear(){
        this.objects=[];
        for (let i=0;i<4;i++){
            if (this.next[i]!=null){
                this.next[i].clear()
                this.next[i]=null
            }
        }
    }

    /**
     *
     * @param {NPC} object
     */
    update(object) {
        this.delete(object.hitbox.hitboxPrevState)
        this.add(object)
        object.hitbox.update()
    }

    getElement(node,point){
        if (node.next[0]!=null){
            const index=node.getIndex(point)
            if (index.index!==undefined){
                return this.getElement(node.next[index.index],point)
            }
        }
        return this.determineElement(node,point)
    }

    determineElement(node,point){
        for (const obj of node.objects){
            const object=obj.hitbox.getHitbox()||obj
            const minMaxX=object.getMinMaxX()
            const minMaxY=object.getMinMaxY()

            const xEstimation=minMaxX.min<point.x && minMaxX.max>point.x
            const yEstimation=minMaxY.min<point.y && minMaxY.max>point.y
            if (xEstimation && yEstimation){
                return obj
            }
        }
        if (node.parent!==node)
            return this.determineElement(node.parent,point)
    }
}