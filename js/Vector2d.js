'use strict';
/*
Конструктор принимает либо вектор,либо -- два числа.
Если не передать ни одного параметра,
то поля будут инициализированы нулями.
*/
class Vector2d{
    x;
    y;

    constructor(vector2d_or_x,y){
        if (arguments.length===0){
            this.x=this.y=0;
        }else {
            this.set(vector2d_or_x,y);
        }
    }

    /*
     Сложение. Метод может принимать либо вектор,либо -- два числа.
     В каждом случае возможна передача вектора-"контейнера"
     в качестве последнего параметра, тогда
     вектор-"контейнер" будет возвращен как результат,а
     вектор ,метод которого был вызван, не изменится.
     */
    add(vector2d_or_x,y_or_res,res){
        if (vector2d_or_x instanceof Vector2d){
            if (y_or_res===undefined){
                this.x+=vector2d_or_x.x;
                this.y+=vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d){
                y_or_res.set(this.x,this.y);
                return y_or_res.add(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)){
            if (res===undefined){
                this.x+=vector2d_or_x;
                this.y+=y_or_res;
                return this;
            }
            if (res instanceof Vector2d){
                res.set(this.x,this.y);
                return res.add(vector2d_or_x,y_or_res);
            }
        }
    }

    /*
     Разность. Метод может принимать либо вектор,либо -- два числа.
     В каждом случае возможна передача вектора-"контейнера"
     в качестве последнего параметра, тогда
     вектор-"контейнер" будет возвращен как результат,а
     вектор ,метод которого был вызван, не изменится.
     */
    sub(vector2d_or_x,y_or_res,res){
        if (vector2d_or_x instanceof Vector2d){
            if (y_or_res===undefined){
                this.x-=vector2d_or_x.x;
                this.y-=vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d){
                y_or_res.set(this.x,this.y);
                return y_or_res.sub(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)){
            if (res===undefined){
                this.x-=vector2d_or_x;
                this.y-=y_or_res;
                return this;
            }
            if (res instanceof Vector2d){
                res.set(this.x,this.y);
                return res.sub(vector2d_or_x,y_or_res);
            }
        }
    }

    /*
     Умножение на число.
     Кроме числа,метод своим последним параметром
     может принимать вектор-"контейнер",который
     и будет возвращен как результат;вектор,
     метод которого был вызван, при этом не изменится.
     */
    mul(number,res){
        if (res===undefined){
            this.x*=number;
            this.y*=number;
            return this;
        }
        if (res instanceof Vector2d){
            res.set(this.x,this.y);
            return res.mul(number);
        }
    }

    /*
    Присваивание. Принимает либо вектор,либо -- два числа.
     */
    set(vector2d_or_x,y){
        if (y===undefined){
            this.x=vector2d_or_x.x;
            this.y=vector2d_or_x.y;
        }else {
            this.x=vector2d_or_x;
            this.y=y;
        }
    }

    /*
    Скалярное произведение. Принимает вектор в качестве параметра.
     */
    dotProduct(vector2d){
        return this.x*vector2d.x+this.y*vector2d.y;
    }

    /*
    Квадрат длины вектора.
     */
    lengthSquared(){
        return this.x*this.x+this.y*this.y;
    }

    /*
    Длина вектора.
     */
    length(){
        return Math.sqrt(this.lengthSquared());
    }

    /*
    Метод выполняет нормирование вектора.
     */
    normalize(){
        return this.mul(1.0/this.length());
    }

    /*
    Проекция на вектор. Метод в какчестве параметра принмает вектор,
    на который нужно спроецировать.
     */
    vectorProjection(vector_to_project_on){
        return this.dotProduct(vector_to_project_on.normalize());
    }

    /*
    Получение нормали к данному вектору.
     */
    normal(){
        return new Vector2d(-this.y,this.x);
    }
}

