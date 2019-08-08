'use strict';
class QuadTree{
    maxObjects=2;
    maxLevels=10;
    constructor(level,bounds){
        this.level=level;
        this.bounds=bounds;
        this.objects=[];
        this.nodes=new Array(4).fill(null);
    }

    clear(){
        this.objects=[];
        for (let i=0;i<this.nodes.length;i++){
            if (this.nodes[i]!=null){
                this.nodes[i].clear();
                this.nodes[i]=null;
            }
        }
    }

    split(){
        let subWidth=this.bounds.width/2;
        let subHeight=this.bounds.height/2;
        let x=this.bounds.point.x;
        let y=this.bounds.point.y;

        this.nodes[0] = new QuadTree(this.level+1, new Rectangle(x + subWidth, y, subWidth, subHeight));
        this.nodes[1] = new QuadTree(this.level+1, new Rectangle(x, y, subWidth, subHeight));
        this.nodes[2] = new QuadTree(this.level+1, new Rectangle(x, y + subHeight, subWidth, subHeight));
        this.nodes[3] = new QuadTree(this.level+1, new Rectangle(x + subWidth, y + subHeight, subWidth, subHeight));
    }

    /**
     * Определить,в какой из вершин находится
     * @param {AABB,CircleHitbox} object
     */
    getIndex(object){
        let index;
        const minMaxY=object.getMinMax('y');
        const minMaxX=object.getMinMax('x');
        const mid = new Vector2d(this.bounds.point.x+this.bounds.width/2,this.bounds.point.y+this.bounds.height/2);
        const top = minMaxY.max<=mid.y;
        const bottom = minMaxY.min>=mid.y;

        if (minMaxX.max<=mid.x){
            if (top){
                index=1;
            }
            if (bottom){
                index=2;
            }
        }else if (minMaxX.min>=mid.x){
            if (top){
                index=0;
            }
            if (bottom){
                index=3;
            }
        }
        return index;
    }

    /**
     * Добавление
     * @param {AABB,CircleHitbox} object
     */
    insert(object){
        if (this.nodes[0]!=null){
            let index=this.getIndex(object);
            if (index!==undefined){
                this.nodes[index].insert(object);
                return;
            }
        }
        this.objects.push(object);
        if (this.objects.length>this.maxObjects && this.level<this.maxLevels){
            if (this.nodes[0]==null){
                this.split();
            }
            for (let i=0;i<this.objects.length;){
                const ind=this.getIndex(this.objects[i]);
                if (ind!==undefined){
                    this.nodes[ind].insert(this.objects.splice(i,1)[0]);
                }else {
                    i++;
                }
            }
        }
    }

    /**
     * Возвращает массив объектов,с которыми нужно проверить коллизии
     * @param {Array} objects
     * @param {AABB,CircleHitbox} object
     */
    retrieve(objects,object){
        let index=this.getIndex(object);
        if (index!==undefined && this.nodes[0]!=null){
            this.nodes[index].retrieve(objects,object);
        }
        [].push.apply(objects,this.objects);
        return objects;
    }
}

class Rectangle{
    constructor(a,b,width,height){
        this.point=new Vector2d(a,b);
        this.width=width;
        this.height=height;
    }
}
