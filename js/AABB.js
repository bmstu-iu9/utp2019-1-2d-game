'use strict'

const minMaxProjection = (axis, object) => {
    let minPr, maxPr
    minPr = maxPr = object.vertices[0].vectorProjection(axis)
    for (let i = 1; i < 4; i++) {
        let projection = object.vertices[i].vectorProjection(axis)
        if (projection > maxPr) {
            maxPr = projection
        } else if (projection < minPr) {
            minPr = projection
        }
    }
    return {
        min: minPr,
        max: maxPr
    }
}

const overlap = (pr1, pr2) => {
    let max, min

    if (pr1.max < pr2.max) {
        max = pr1.max
        min = pr2.min
    } else {
        max = pr2.max
        min = pr1.min
    }
    return min - max
}

const getMin = (dx, dy, firstAxis, secondAxis) => {
    let depth, axis
    if (dx < dy) {
        depth = dy
        axis = new Vector2d(secondAxis)
    } else {
        depth = dx
        axis = new Vector2d(firstAxis)
    }
    return {
        depth: depth,
        axis: axis
    }
}

const circleProjection=(axis,circle)=>{
    const centreProjection=circle.centre.vectorProjection(axis)
    return {
        min:centreProjection-circle.radius,
        max:centreProjection+circle.radius
    }
}


/**
 *
 * @param {AABB} object
 * @param {CircleHitbox} obstacle
 * @constructor
 */
const AABBvsCircle=(object,obstacle)=> {
    let thisPr1=minMaxProjection(object.firstAxis,object)
    let thisPr2=minMaxProjection(object.secondAxis,object)

    let circlePr1=circleProjection(object.firstAxis,obstacle)
    let circlePr2=circleProjection(object.secondAxis,obstacle)

    let dx,dy;
    if ((dx=overlap(thisPr1,circlePr1))<0 && (dy=overlap(thisPr2,circlePr2))<0){
        const res=getMin(dx,dy,object.firstAxis,object.secondAxis)

        const centre_to_centre=obstacle.centre.sub(object.centre,new Vector2d())
        if (centre_to_centre.vectorProjection(res.axis)<0) res.axis.mul(-1)
        //hotfix
        return new Collision(centre_to_centre.normalize().mul(res.depth),obstacle)
    }
    return null
}

const getCollision=(objectCommon,obstacleCommon)=>{
    let object,obstacle

    object=objectCommon.getHitbox()
    obstacle=obstacleCommon.getHitbox()

    if (object instanceof AABB) {
        if (obstacle instanceof AABB) {
            return object.getCollision(obstacle)
        }else if (obstacle instanceof CircleHitbox){
            return AABBvsCircle(object,obstacle)
        }
    }else if (object instanceof CircleHitbox){
        if (obstacle instanceof AABB){
            let collision=AABBvsCircle(obstacle,object)
            if (collision){
                collision.distance.mul(-1)
                collision.obstacle=obstacle
            }
            return collision
        }else if (obstacle instanceof CircleHitbox){
            return object.getCollision(obstacle)
        }
    }
    return null
}

class AABB {
    constructor(centre,vertices,id=Game.getUniqId()){
        this.centre=centre
        this.vertices=vertices
        let firstSide=this.vertices[1].sub(this.vertices[0],new Vector2d())
        let secondSide=this.vertices[2].sub(this.vertices[1],new Vector2d())
        this.firstAxis=firstSide.normal()
        this.secondAxis=secondSide.normal()
        this.id=id
    }

    getCollision(obstacle) {
        let thisPr1 = minMaxProjection(this.firstAxis, this)
        let thisPr2 = minMaxProjection(this.secondAxis, this)
        let objPr1 = minMaxProjection(this.firstAxis, obstacle)
        let objPr2 = minMaxProjection(this.secondAxis, obstacle)

        let secThisPr1 = minMaxProjection(obstacle.firstAxis, this)
        let secThisPr2 = minMaxProjection(obstacle.secondAxis, this)
        let secObjPr1 = minMaxProjection(obstacle.firstAxis, obstacle)
        let secObjPr2 = minMaxProjection(obstacle.secondAxis, obstacle)

        let dx, dy, dX, dY

        if ((dx = overlap(thisPr1, objPr1)) < 0 && (dy = overlap(thisPr2, objPr2)) < 0
            && (dX = overlap(secThisPr1, secObjPr1)) < 0 && (dY = overlap(secThisPr2, secObjPr2)) < 0) {


            let thisMin = getMin(dx, dy, this.firstAxis, this.secondAxis)
            let objMin = getMin(dX, dY, obstacle.firstAxis, obstacle.secondAxis)
            let res = getMin(thisMin.depth, objMin.depth, thisMin.axis, objMin.axis)

            let centre_to_centre = obstacle.centre.sub(this.centre, new Vector2d())

            if (centre_to_centre.vectorProjection(res.axis) < 0) res.axis.mul(-1)

            return new Collision(res.axis.normalize().mul(res.depth), obstacle)
        }
        return null
    }

    changePosition(newCentre){
        let delta=newCentre.sub(this.centre,new Vector2d())
        this.centre.set(newCentre)
        for (let vertex of this.vertices){
            vertex.add(delta)
        }
    }

    correctPosition(collision){
        this.changePosition(this.centre.add(collision.distance,new Vector2d()))
    }

    getMinMaxX(){
        let min,max
        min=max=this.vertices[0].x
        for (let i=1;i<4;i++){
            if (this.vertices[i].x>max){
                max=this.vertices[i].x
            }
            if (this.vertices[i].x<min){
                min=this.vertices[i].x
            }
        }
        return {
            max:max,
            min:min
        }
    }

    getMinMaxY(){
        let min,max
        min=max=this.vertices[0].y
        for (let i=1;i<4;i++){
            if (this.vertices[i].x>max){
                max=this.vertices[i].y
            }
            if (this.vertices[i].x<min){
                min=this.vertices[i].y
            }
        }
        return {
            max:max,
            min:min
        }
    }

    /**
     * @param {AABB} object
     * @return {boolean}
     */
    equals(object){
        return object instanceof AABB && this.id===object.id
    }

    setId(id){
        this.id=id
        return this
    }

    getHitbox(){
        return this
    }
}

class CircleHitbox {
    constructor(centre,radius,id=Game.getUniqId()){
        this.radius=radius
        this.centre=centre
        this.id=id
    }

    getCollision(obstacle) {
        let axis = this.centre.sub(obstacle.centre, new Vector2d())
        let dist = axis.length()
        if (this.radius + obstacle.radius > dist) {
            return new Collision(axis.normalize().mul(obstacle.radius + this.radius - dist), obstacle)
        }
        return null
    }

    changePosition(newCentre){
        this.centre.set(newCentre)
    }
    correctPosition(collision){
        this.changePosition(this.centre.add(collision.distance,new Vector2d()))
    }

    getMinMaxX(){
        return {
            max:this.centre.x+this.radius,
            min:this.centre.x-this.radius
        }
    }

    getMinMaxY(){
        return {
            max:this.centre.y+this.radius,
            min:this.centre.y-this.radius
        }
    }

    /**
     * @param {CircleHitbox} object
     * @return {boolean}
     */
    equals(object){
        return object instanceof CircleHitbox
            && this.id===object.id
    }

    setId(id){
        this.id=id
        return this
    }

    getHitbox(){
        return this
    }
}

class Collision{
    constructor(dist,obstacle){
        this.distance=dist
        this.obstacle=obstacle
    }
}


