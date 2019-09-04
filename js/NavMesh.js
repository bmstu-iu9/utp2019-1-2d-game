'use strict'
class Triangle {
    constructor(a, b, c, index) {
        this.point = new Array()
        this.index = index
        this.point.push(a)
        this.point.push(b)
        this.edge = new HashMap()
        this.point.push(c)
        this.centre = new Vector2d(~~((a.x + b.x + c.x) / 3), ~~((a.y + b.y + c.y) / 3))
        this.id = this.centre.x.toString() + " " + this.centre.y.toString()
    }
    connect(triangle) {
        if (triangle == undefined) {
            return
        }
        if (this === triangle) {
            return
        }
        let u = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.point[i] == triangle.point[j]) {
                    u++
                }
            }
        }
        if (u < 2) {
            return
        }
        if (!this.edge.hasId(triangle.id)) {
            this.edge.set(triangle)
        }
        if (!triangle.edge.hasId(this.id)) {
            triangle.connect(this)
        }
    }
    getMinMaxX(){
        let min,max
        min=max=this.point[0].x
        for (let i=1;i<3;i++){
            if (this.point[i].x>max){
                max=this.point[i].x
            }
            if (this.point[i].x<min){
                min=this.point[i].x
            }
        }
        return {
            max:max,
            min:min
        }
    }
    getMinMaxY(){
        let min,max
        min=max=this.point[0].y
        for (let i=1;i<3;i++){
            if (this.point[i].y>max){
                max=this.point[i].y
            }
            if (this.point[i].y<min){
                min=this.point[i].y
            }
        }
        return {
            max:max,
            min:min
        }
    }
}
class Graph {
    constructor() {
        this.data = new Array()
        this.point = new Array()
    }
    add(x, y) {
        this.point.push(new Vector2d(x, y))
        this.data.push(new Array())
    }
    addEdge(a, b) {
        this.data[a].push(b)
        //this.data[b].push(a)
    }
    sortVert(vert) {
        this.data[vert].sort((fir, sec) => {
            let vertex = this.point[vert]
            let a = this.point[fir]
            let b = this.point[sec]
            let first = Math.atan2(a.y - vertex.y, a.x - vertex.x)
            let second = Math.atan2(b.y - vertex.y, b.x - vertex.x)
            first += first > 0 ? 0 : 2 * Math.PI
            second += second > 0 ? 0 : 2 * Math.PI
            return first > second ? 1 : -1
        })
    }
    sort() {
        for (let i = 0; i < this.data.length; i++) {
            this.sortVert(i)
        }
    }

    render() {
        let t
        let n = Game.camera.position
        for (let i = 0; i < this.point.length; i++) {
            t = this.point[i]
            ctx.fillRect(t.x - n.x, t.y - n.y, 10, 10)
        }
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                t = this.point[i]
                ctx.beginPath()
                ctx.moveTo(t.x - n.x, t.y - n.y)
                t = this.point[this.data[i][j]]
                ctx.lineTo(t.x - n.x, t.y - n.y)
                ctx.stroke()
            }
        }

    }
}
class NavMesh {
    constructor(graph, width, height) {
        this.graph = graph
        this.data = graph.data
        this.point = graph.point
        graph.sort()
        this.dataHash = new HashMap()
        this.triangle = new Array()
        this.tree = new QuadTree(new Rectangle(0, 0 , width * Game.tileWidth, height * Game.tileHeight), 16)
        let first
        let triangle
        let last
        let lasttriangle
        let firsttriangle
        let third
        this.data.forEach((element, index) => {
            if (element.length <= 2) {
                return
            }
            last = element[element.length - 1]
            lasttriangle = undefined
            firsttriangle = undefined
            first = this.point[index]
            for (let i = 0; i < element.length; i++) {
                for (let j = 0; j < this.data[element[i]].length; j++) {
                    if (this.data[element[i]][j] == last) {
                        third = element[i]
                        triangle = new Triangle(first, this.point[last], this.point[third], this.triangle.length)
                        if  (firsttriangle == undefined) {
                            firsttriangle = triangle
                        }
                        if (!this.dataHash.hasId(triangle.id)) {
                            this.triangle.push(triangle)
                            this.dataHash.set(triangle)
                            this.tree.add(triangle)
                        } else {
                            triangle = this.dataHash.get(triangle.id)
                        }
                      //  console.log(triangle)
                      //  console.log(lasttriangle)
                        //triangle.connect(lasttriangle)
                        last = element[i]
                        lasttriangle = triangle
                        break
                    } else if (j == this.data[element[i]].length - 1) {
                        lasttriangle = undefined
                    }
                }
                last = element[i]
            }
          //  console.log(this)
            //triangle.connect(firsttriangle)
        })
        for (let i = 0; i < this.triangle.length; i++) {
            this.triangle.forEach((element) => {
                this.triangle[i].connect(element)
            })
        }
    }
    h(first, last) {
        return Math.sqrt((first.centre.x - last.centre.x) ** 2 + (first.centre.y - last.centre.y) ** 2)
    }
    getPath(fir, las, ai) {
        ai.trianglePath = []
        let first = this.triangle[fir]
        let last = this.triangle[las]
        let g = new Array(this.triangle.length)
        g[first.index] = 0
        let f = new Array(this.triangle.length).fill()
        f[first.index] = g[first.index] + this.h(first, last)
        let q = new PriorityQueue((a, b) => {
            return f[a.index] < f[b.index] ?  1 : -1
        })
        let u = new HashMap()
        let parent = new Array()
        q.insert(first)
        let current
        let tentativeScore
        while (q.size() !== 0) {
            current =  q.pop()
            if (current == last) {
                let trian = last
                while (trian !== first) {
                    ai.trianglePath.push(trian)
                    trian = parent[trian.index]
                }
                ai.trianglePath.push(trian)
                ai.trianglePath.reverse()
                return true
            }
            u.set(current)
            current.edge.forEach((element) => {
                tentativeScore = g[current.index] + this.h(current, element)
                if (u.hasId(element.id) && tentativeScore >= g[element.index]) {
                    return true
                } else if (!u.hasId(element.id) || tentativeScore < g[element.index]) {
                    parent[element.index] = current
                    if (f[element.index] === undefined) {
                        g[element.index] = tentativeScore
                        f[element.index] = g[element.index] + this.h(element, last)
                        q.insert(element)
                    }
                    g[element.index] = tentativeScore
                    f[element.index] = g[element.index] + this.h(element, last)
                }

            })
        }
        return false
    }
    s(a, b, c) {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
    }
    cross2(a, b, c, d) {
        if (a > b) {
            [a, b] = [b, a]
        }
        if (c > d) {
            [c, d] = [d, c]
        }
        return Math.max(a, c)  <= Math.min(b, d)

    }
    cross(a, b, c, d) {
        return this.cross2(a.x, b.x, c.x, d.x) && this.cross2(a.y, b.y, c.y, d.y) &&this.s(a, b, c) *this.s(a, b, d) <= 0 &&this.s(c, d, a) *this.s(c, d, b) <= 0
    }
    getPath2(last, ai) {
        let trian = ai.trianglePath[0]
        ai.path = []
        let n
        let next
        let buffer
        for (let i = 1; i < ai.trianglePath.length; i++) {
            next = ai.trianglePath[i]
            buffer = []
            for (let j = 0; j < 3; j++) {
                for (let u = 0; u < 3; u++) {
                    if (trian.point[j] == next.point[u]) {
                        buffer.push(trian.point[j])

                    }

                }
            }
            n = ai.path.length
            if (n == 0) {
                ai.path.push(buffer[0], buffer[1])
            } else {
                if (n == 2) {

                    if (buffer[0] == ai.path[n - 2] || buffer[1] == ai.path[n - 2]) {
                        [ai.path[n - 1], ai.path[n - 2]] = [ai.path[n - 2], ai.path[n - 1]]
                    }
                } else {
                    if (buffer[0] == ai.path[n - 2] || buffer[1] == ai.path[n - 2]) {
                        ai.path.push(ai.path[n - 2])
                    }
                }
                if (buffer[0] !== ai.path[n - 1] && buffer[0] !== ai.path[n - 2]) {
                    ai.path.push(buffer[0])
                }
                if (buffer[1] !== ai.path[n - 1] && buffer[1] !== ai.path[n - 2]) {
                    ai.path.push(buffer[1])
                }
            }
            trian = next
        }
        ai.path.push(last)
        ai.path.push(last)
    }
    findTriangle(vector) {
        return this.tree.getElement(this.tree, vector)
    }
    savePath(fir, las, ai) {
        let first = this.findTriangle(fir)
        let last = this.findTriangle(las)
        if (last == undefined || first == undefined) {
            return
        }
        this.getPath(first.index, last.index, ai)
        this.getPath2(las, ai)
        this.funnel(fir, las, ai)
    }
    funnel(first, last, ai) {
        let left
        let right

        let current = first
        let delta = 0
        ai.resultPath = []
        if (ai.trianglePath.length < 2) {
            ai.resultPath = [last]
            return
        }
        if (this.s(first, ai.path[0], ai.path[1]) <= 0) {
            delta = 1
        }
        left = delta
        right = 1 - delta
        let portalRight
        let portalLeft
        let t
        let las = 0
        while (ai.resultPath.length == 0 || ai.resultPath[ai.resultPath.length - 1] != last) {
            if (ai.path[right] == last || ai.path[left] == last) {
                ai.resultPath.push(ai.path[ai.path.length - 1])
                break
            }
            if (las == 100) {
                throw Error()
                return
            }
            las++
            t = false
            if (right + 2 < ai.path.length) {
                portalRight = ai.path[right + 2]
                if (this.s(current, portalRight, ai.path[right]) >= 0) {
                    if (this.s(current, portalRight, ai.path[left]) < 0) {
                        right += 2
                    } else {
                        ai.resultPath.push(ai.path[left])
                        current = ai.path[left]
                        right = left + 1
                        left += 2
                        continue
                    }
                } else {
                    t = true
                }
            }
            if (left + 2 < ai.path.length) {
                portalLeft = ai.path[left + 2]
                if (this.s(current, portalLeft, ai.path[left]) <= 0) {
                    if (this.s(current, portalLeft, ai.path[right]) > 0) {
                        left += 2
                    } else {
                        ai.resultPath.push(ai.path[right])
                        current = ai.path[right]
                        left = right + 1
                        right += 2
                        continue
                    }
                } else {
                    t = true
                }
            }
            if (t) {
                current = new Vector2d(~~((ai.path[left].x + ai.path[right].x) / 2), ~~((ai.path[left].y + ai.path[right].y) / 2))
                ai.resultPath.push(current)

            }
        }
       // console.log(222)
    }

    render() {
        this.graph.render()
    }
}
