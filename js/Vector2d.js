'use strict';

/**
 * Конструктор принимает либо вектор,либо -- два числа.
 * Если не передать ни одного параметра,
 * (то поля будут инициализированы нулями.
 */
class Vector2d {
    /**
     * @param {Vector2d,Number,undefined} vector2d_or_x
     * @param {Number,undefined} y
     */
    constructor(vector2d_or_x = undefined, y = undefined) {
        if (arguments.length === 0) {
            this.y = this.x = 0;
        } else {
            this.set(vector2d_or_x, y);
        }
        this.type = "vector2D"
    }

    /**
     * @param {Vector2d,Number} vector2d_or_x
     * @param {Vector2d,Number,undefined} y_or_res
     * @param {Vector2d ,undefined} res
     *Сложение. Метод может принимать либо вектор,либо -- два числа.
     *В каждом случае возможна передача вектора-"контейнера"
     *в качестве последнего параметра, тогда
     *вектор-"контейнер" будет возвращен как результат,а
     *вектор ,метод которого был вызван, не изменится.
     */
    add(vector2d_or_x, y_or_res = undefined, res = undefined) {
        if (vector2d_or_x instanceof Vector2d) {
            if (y_or_res === undefined) {
                this.x += vector2d_or_x.x;
                this.y += vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d) {
                y_or_res.set(this.x, this.y);
                return y_or_res.add(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)) {
            if (res === undefined) {
                this.x += vector2d_or_x;
                this.y += y_or_res;
                return this;
            }
            if (res instanceof Vector2d) {
                res.set(this.x, this.y);
                return res.add(vector2d_or_x, y_or_res);
            }
        }
    }

    /**
     * @param {Vector2d,Number} vector2d_or_x
     * @param {Vector2d,Number,undefined} y_or_res
     * @param {Vector2d ,undefined} res
     *Разность. Метод может принимать либо вектор,либо -- два числа.
     *В каждом случае возможна передача вектора-"контейнера"
     *в качестве последнего параметра, тогда
     *вектор-"контейнер" будет возвращен как результат,а
     *вектор ,метод которого был вызван, не изменится.
     */
    sub(vector2d_or_x, y_or_res = undefined, res = undefined) {
        if (vector2d_or_x instanceof Vector2d) {
            if (y_or_res === undefined) {
                this.x -= vector2d_or_x.x;
                this.y -= vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d) {
                y_or_res.set(this.x, this.y);
                return y_or_res.sub(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)) {
            if (res === undefined) {
                this.x -= vector2d_or_x;
                this.y -= y_or_res;
                return this;
            }
            if (res instanceof Vector2d) {
                res.set(this.x, this.y);
                return res.sub(vector2d_or_x, y_or_res);
            }
        }
    }

    /**
     * @param {Number} number
     * @param {Vector2d ,undefined} res
     *Умножение на число.
     *Кроме числа,метод своим последним параметром
     *может принимать вектор-"контейнер",который
     *и будет возвращен как результат;вектор,
     *метод которого был вызван, при этом не изменится.
     */
    mul(number, res = undefined) {
        if (res === undefined) {
            this.x *= number;
            this.y *= number;
            return this;
        }
        if (res instanceof Vector2d) {
            res.set(this.x, this.y);
            return res.mul(number);
        }
    }

    /**
     * @param {Vector2d,Number} vector2d_or_x
     * @param {Number,undefined} y
     Присваивание. Принимает либо вектор,либо -- два числа.
     */
    set(vector2d_or_x, y = undefined) {
        if (y === undefined) {
            this.x = vector2d_or_x.x;
            this.y = vector2d_or_x.y;
        } else {
            this.x = vector2d_or_x;
            this.y = y;
        }
    }


    /**
     * @param {Vector2d} vector2d
     Скалярное произведение. Принимает вектор в качестве параметра.
     */
    dotProduct(vector2d) {
        return this.x * vector2d.x + this.y * vector2d.y;
    }

    /**
     Квадрат длины вектора.
     */
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     Длина вектора.
     */
    length() {
        return Math.sqrt(this.lengthSquared());
    }

    /**
     Метод выполняет нормирование вектора.
     */
    normalize() {
        return this.mul(1.0 / this.length());
    }

    /**
     * Возвращает орт вектора
     * @return {*|undefined}
     */
    ort() {
        return this.mul(1.0 / this.length(), new Vector2d())
    }

    /**
     * @param {Vector2d} vector_to_project_on
     Проекция на вектор. Метод в какчестве параметра принмает вектор,
     на который нужно спроецировать.
     */
    vectorProjection(vector_to_project_on) {
        const len = vector_to_project_on.lengthSquared()
        if (0.99 <= len && len <= 1) return this.dotProduct(vector_to_project_on)
        return this.dotProduct(vector_to_project_on.ort());
    }

    /**
     Получение нормали к данному вектору.
     */
    normal() {
        return new Vector2d(-this.y, this.x);
    }

    toJSON() {
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {Vector2d} object
     */
    static fromJSON(object) {
        return new Vector2d(object)
    }

    /**
     * Округление вектора.
     * Осторожно, после применения метода может 
     * измениться угол вектора относительно оси координат
     */
    round() {
        if (this.x >= 0) {
            this.x = Math.ceil(this.x)
        } else {
            this.x = Math.floor(this.x)
        }

        if (this.y >= 0) {
            this.y = Math.ceil(this.y)
        } else {
            this.y = Math.floor(this.y)
        }
    }

    isNullVector() {
        return this.x === 0 && this.y === 0
    }
}