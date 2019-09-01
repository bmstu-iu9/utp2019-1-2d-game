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
    if (pr1.max < pr2.max) {
        return  pr2.min-pr1.max
    } else {
        return  pr1.min-pr2.max
    }
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


const gramSchmidt=(axis,vector)=>{
    return vector.sub(axis.mul(vector.dotProduct(axis)/axis.dotProduct(axis)),new Vector2d())
}

const intersect=(A,B,C,D)=>{
    const x1=B.x,x0=A.x,y1=B.y,y0=A.y
    const a=C.x,b=C.y,c=D.x,d=D.y
    const l=c-a,q=d-b,n=x1-x0,m=y1-y0
    const t=(n*(y0-b)+m*(a-x0))/(q*n-m*l)
    const x=a+t*l,y=b+t*q
    return new Vector2d(x,y)
}

const findClosest=(box,dot)=>{
    let inter=calcLine(box.vertices[0],box.vertices[1],dot)
    let guid=inter.sub(dot,new Vector2d())
    for (let i=1;i<4;i++) {
        const inters = calcLine(box.vertices[i%4], box.vertices[(i + 1) % 4], dot)
        const guids=inters.sub(dot,new Vector2d())
        if (guid.lengthSquared()>guids.lengthSquared()){
            inter=inters
            guid=guids
        }
    }
    return inter
}

const determineLine=(ortho,point)=>{
    if (ortho.x===0){
        return new Vector2d(point.x,0)
    }
    if (ortho.y===0){
        return new Vector2d(0,point.y)
    }
    return new Vector2d(0,-ortho.y*point.x/ortho.x+point.y)
}

const calcLine=(a,b,point)=>{
    const vector=b.sub(a,new Vector2d())
    const ortho=gramSchmidt(vector,point.sub(a,new Vector2d()))
    const inter=intersect(a,b,point,determineLine(ortho,point))
    let minX,minY,maxX,maxY
    if (a.x<b.x){
        maxX=b.x
        minX=a.x
    }else {
        maxX=a.x
        minX=b.x
    }
    if (a.y<b.y){
        maxY=b.y
        minY=a.y
    }else {
        maxY=a.y
        minY=b.y
    }
    if (minX<=inter.x && inter.x<=maxX && inter.y<=maxY && inter.y>=minY){
        return inter
    }else {
        let q=point.sub(a,new Vector2d())
        let l=point.sub(b,new Vector2d())
        if (q.lengthSquared()<l.lengthSquared()){
            return a
        }else {
            return b
        }
    }
}

/**
 *
 * @param {AABB} object
 * @param {CircleHitbox} obstacle
 * @constructor
 */
const AABBvsCircle=(object,obstacle)=> {
    const intersectionPoint=findClosest(object,obstacle.centre)
    let axis=intersectionPoint.sub(obstacle.centre,new Vector2d())
    const distance=obstacle.radius-axis.length()
    if (distance>0)
        return new Collision(axis.normalize().mul(distance),obstacle)
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
        this.setNormals()
        this.id=id
        this.type = "AABB"
    }

    setNormals=()=>{
        const firstSide=this.vertices[1].sub(this.vertices[0],new Vector2d())
        const secondSide=this.vertices[2].sub(this.vertices[1],new Vector2d())
        this.firstAxis=firstSide.normal().normalize()
        this.secondAxis=secondSide.normal().normalize()
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

            return new Collision(res.axis.mul(res.depth), obstacle)
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

    toJSON() {
        return Serializations[this.type](this)
    }


    /**
     *
     * @param {AABB} object
     */
    static fromJSON(object){
        let vertices = []
        object.vertices.forEach(vertex => vertices.push(Vector2d.fromJSON(vertex)))
        return new AABB(Vector2d.fromJSON(object.centre),vertices,object.id)
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
            max: max,
            min: min
        }
    }

    getMinMaxY(){
        let min,max
        min=max=this.vertices[0].y
        for (let i=1;i<4;i++){
            if (this.vertices[i].y>max){
                max=this.vertices[i].y
            }
            if (this.vertices[i].y<min){
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

    /**
     * @param {Number} angle
     * @param {Vector2d} dot
     */
    rotate(angle,dot=undefined) {
        angle *= Math.PI / 180
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        if (dot === undefined) {
            dot = this.centre
        }
        for (let v of this.vertices) {
            v.set(dot.x + (v.x - dot.x) * cos - (v.y - dot.y) * sin, dot.y + (v.x - dot.x) * sin + (v.y - dot.y) * cos)
        }
        this.setNormals()
    }
}

class CircleHitbox {
    constructor(centre,radius,id=Game.getUniqId()){
        this.radius=radius
        this.centre=centre
        this.id=id
        this.type = "CircleHitbox"
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

    toJSON() {
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {CircleHitbox} object
     */
    static fromJSON(object){
        return new CircleHitbox(Vector2d.fromJSON(object.centre),object.radius,object.id)
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
        this.obstacleObject  = undefined
    }
}
