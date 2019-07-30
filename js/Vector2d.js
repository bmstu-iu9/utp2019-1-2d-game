'use strict';

//Конструктор класса может не принимать никаких параметров (в таком случае поля будут заполнены нулями),
//может принимать один параметр -- вектор
//(в этом случае в поля нового объекта будут записаны значения полей переданного вектора),
//а может два числа.
//В данном классе реализованы следующие методы : умножение вектора на число,сложение и вычитание (см ниже),
//скалярное произведение,проекция на вектор,получение длины и квадрата длины вектора,
//нормирование,метод присваивания -- set(...).
//Метод add(...) ,реализующий сложение, может работать с 3мя праметрами.
//Передав в качестве параметра только вектор,вы измените вектор,метод которого был вызван;
//также будет возвращен этот вектор. Если первым параметром передать вектор ,а вторым -- "контейнер",те другой вектор,
//то результат сложения будет записан в вектор-"контейнер",который и будет возвращен.
//Если передать в функцию два числа,то вектор,метод которого был вызван,будет изменен и возвращен как результат.
//Также можно передать два числа и "контейнер",то есть ,очевидно,результат будет записан в вектор-"котейнер",
//который и будет возвращен.Аналогично для sub(...)- метода,реализующего вычитание.
//Метод mul(),реализующий умножение на число, работает похожим образом : можно передать лишь число,а можно число и "контейнер",
//который и будет возвращен как результат. Очевидно, что ,передавая вектор-"контейнер", вы не изеняете вектор,
//метод которого был вызван. Метод set(...) работает очевидным образом. Он может принимать либо вектор,либо два числа.

//Добавлен метод получения нормали

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
    set(vector2d_or_x,y){
        if (y===undefined){
            this.x=vector2d_or_x.x;
            this.y=vector2d_or_x.y;
        }else {
            this.x=vector2d_or_x;
            this.y=y;
        }
    }
    dotProduct(vector2d){
        return this.x*vector2d.x+this.y*vector2d.y;
    }

    lengthSquared(){
        return this.x*this.x+this.y*this.y;
    }

    length(){
        return Math.sqrt(this.lengthSquared());
    }

    normalize(){
        return this.mul(1.0/this.length());
    }

    vectorProjection(vector_to_project_on){
        return this.dotProduct(vector_to_project_on.normalize());
    }
    normal(){
        return new Vector2d(-this.y,this.x);
    }
}

