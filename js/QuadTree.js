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
    constructor(bounds,capacity){
        this.bounds=bounds;
        this.next=new Array(4).fill(null);
        this.objects=[];
        this.capacity=capacity;
    }

    divide(){
        const halfHeight=~~this.bounds.height/2;
        const halfWidth=~~this.bounds.width/2;

        this.next[0]=new QuadTree(new Rectangle(this.bounds.x+halfWidth,this.bounds.y,halfWidth,halfHeight),this.capacity);
        this.next[1]=new QuadTree(new Rectangle(this.bounds.x,this.bounds.y,halfWidth,halfHeight),this.capacity);
        this.next[2]=new QuadTree(new Rectangle(this.bounds.x,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity);
        this.next[3]=new QuadTree(new Rectangle(this.bounds.x+halfWidth,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity);
    }

    /**
     * @param {AABB,CircleHitbox} object
     */
    getIndex(object){
        let index;

        const minMaxY=object.getMinMax('y');
        const minMaxX=object.getMinMax('x');

        const xCentre=this.bounds.x+(~~this.bounds.width/2);
        const yCentre=this.bounds.y+(~~this.bounds.height/2);

        const right=minMaxX.min>xCentre;
        const left=minMaxX.max<xCentre;
        const up=minMaxY.max<yCentre;
        const down=minMaxY.min>yCentre;
        if (right){
            if (up){
                index=0;
            }
            if (down){
                index=3;
            }
        }else if (left){
            if (up){
                index=1;
            }
            if (down){
                index=2;
            }
        }
        return index;
    }

    add(object){
        if (this.next[0]!=null){
            const index=this.getIndex(object);
            if (index!==undefined)
                this.next[index].add(object);
            else this.objects.push(object);
        }else {
            this.objects.push(object);
            if (this.objects.length>this.capacity){
                this.divide();
                for (let i=0;i<this.objects.length;){
                    const index=this.getIndex(this.objects[i]);
                    if (index!==undefined){
                        this.next[index].add(this.objects.splice(i,1)[0]);
                    }else {
                        i++;
                    }
                }
            }
        }
    }

    /**
     * @param {[]} objects
     * @param {AABB,CircleHitbox} object
     */
    retrieve(objects,object){
        if (this.next[0]!=null){
            const index=this.getIndex(object);
            if (index!==undefined){
                this.next[index].retrieve(objects,object);
            }else {
                for (let n of this.next){
                    n.retrieve(objects,object);
                }
            }
        }
        [].push.apply(objects,this.objects);
        return objects;
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

}