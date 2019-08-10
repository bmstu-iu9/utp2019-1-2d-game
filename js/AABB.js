'use strict';
class AABB {
    constructor(centre, vertices) {
        this.centre = centre;
        this.vertices = vertices;
        let firstSide = this.vertices[1].sub(this.vertices[0], new Vector2d());
        let secondSide = this.vertices[2].sub(this.vertices[1], new Vector2d());
        this.firstAxis = firstSide.normal();
        this.secondAxis = secondSide.normal();
    }

    getCollision(object) {
        const minMaxProjection = (axis, object) => {
            let minPr, maxPr;
            minPr = maxPr = object.vertices[0].vectorProjection(axis);
            for (let i = 1; i < 4; i++) {
                let projection = object.vertices[i].vectorProjection(axis);
                if (projection > maxPr) {
                    maxPr = projection;
                } else if (projection < minPr) {
                    minPr = projection;
                }
            }
            return {
                min: minPr,
                max: maxPr
            };
        };

        const overlap = (pr1, pr2) => {
            let max, min;

            if (pr1.max < pr2.max) {
                max = pr1.max;
                min = pr2.min;
            } else {
                max = pr2.max;
                min = pr1.min;
            }
            return min - max;
        };

        if (object instanceof AABB) {

            let thisPr1 = minMaxProjection(this.firstAxis, this);
            let thisPr2 = minMaxProjection(this.secondAxis, this);
            let objPr1 = minMaxProjection(this.firstAxis, object);
            let objPr2 = minMaxProjection(this.secondAxis, object);

            let secThisPr1 = minMaxProjection(object.firstAxis, this);
            let secThisPr2 = minMaxProjection(object.secondAxis, this);
            let secObjPr1 = minMaxProjection(object.firstAxis, object);
            let secObjPr2 = minMaxProjection(object.secondAxis, object);

            let dx, dy, dX, dY;

            if ((dx = overlap(thisPr1, objPr1)) < 0 && (dy = overlap(thisPr2, objPr2)) < 0
                && (dX = overlap(secThisPr1, secObjPr1)) < 0 && (dY = overlap(secThisPr2, secObjPr2)) < 0) {

                const getMin = (dx, dy, firstAxis, secondAxis) => {
                    let depth, axis;
                    if (dx < dy) {
                        depth = dy;
                        axis = new Vector2d(secondAxis);
                    } else {
                        depth = dx;
                        axis = new Vector2d(firstAxis);
                    }
                    return {
                        depth: depth,
                        axis: axis
                    };
                };

                let thisMin = getMin(dx, dy, this.firstAxis, this.secondAxis);
                let objMin = getMin(dX, dY, object.firstAxis, object.secondAxis);
                let res = getMin(thisMin.depth, objMin.depth, thisMin.axis, objMin.axis);

                let centre_to_centre = object.centre.sub(this.centre, new Vector2d());

                if (centre_to_centre.vectorProjection(res.axis) < 0) res.axis.mul(-1);

                return new Collision(res.axis.normalize().mul(res.depth));
            }
        } else {
            let axis = object.centre.sub(this.centre, new Vector2d());
            let thisProjection = minMaxProjection(axis, this);

            let centreProjection = object.centre.vectorProjection(axis);

            let struct = {
                min: centreProjection - object.radius,
                max: centreProjection + object.radius
            };

            let depth;

            if ((depth = overlap(thisProjection, struct)) < 0) {
                return new Collision(axis.normalize().mul(depth));
            }
        }
        return null;
    }

    changePosition(newCentre) {
        let delta = newCentre.sub(this.centre, new Vector2d());
        this.centre.set(newCentre);
        for (let vertex of this.vertices) {
            vertex.add(delta);
        }
    }

    correctPosition(collision) {
        this.changePosition(this.centre.add(collision.distance, new Vector2d()));
    }

    toJSON() {
        return {
            centre: this.centre,
            vertices: this.vertices,
            firstAxis: this.firstAxis,
            secondAxis: this.secondAxis
        }
    }
    getMinMax(x_or_y) {
        let min, max;
        min = max = this.vertices[0][x_or_y];
        for (let i = 1; i < 4; i++) {
            if (this.vertices[i][x_or_y] > max) {
                max = this.vertices[i][x_or_y]
            }
            if (this.vertices[i][x_or_y] < min) {
                min = this.vertices[i][x_or_y];
            }
        }
        return {
            max: max,
            min: min
        }
    }
}

class CircleHitbox {
    constructor(centre, radius) {
        this.radius = radius;
        this.centre = centre;
    }

    getCollision(object) {
        if (object instanceof AABB) {
            let collision = object.getCollision(this);
            if (collision) {
                collision.distance.mul(-1);
                return collision;
            }
        } else {
            let axis = this.centre.sub(object.centre, new Vector2d());
            let dist = axis.length();
            if (this.radius + object.radius > dist) {
                return new Collision(axis.normalize().mul(object.radius + this.radius - dist));
            }
        }
        return null;
    }

    changePosition(newCentre) {
        this.centre.set(newCentre);
    }
    correctPosition(collision) {
        this.changePosition(this.centre.add(collision.distance, new Vector2d()));
    }

    toJSON() {
        return {
            radius: this.radius,
            centre: this.centre
        }
    }
    
    getMinMax(x_or_y) {
        return {
            max: this.centre[x_or_y] + this.radius,
            min: this.centre[x_or_y] - this.radius
        }
    }
}

class Collision {
    constructor(dist) {
        this.distance = dist;
    }
}