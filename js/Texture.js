'use strict';

class Texture{
    constructor(filename,isPattern){
        this.image=new Image();
        this.image.src='images/'+filename;
        this.pattern=null;
        if (isPattern)
            this.pattern=context.createPattern(this.image,'repeat');
    }
    draw(x,y,w,h){
        if (this.pattern!=null){
            context.fillStyle=this.pattern;
            context.fillRect(x,y,w,h);
        }else
            if (w===undefined || h===undefined)
                context.drawImage(this.image,x,y);
            else
                context.drawImage(this.image,x,y,w,h);
    }

}