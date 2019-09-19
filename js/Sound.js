'use strict'
class Sound{
    /**
     *
     * @param {Audio} audio
     */
    constructor(audio){
        this.audio=new Audio(audio.src)
        this.audio.volume=audio.volume
        this.audio.playbackRate=audio.playbackRate
        this.volume=this.audio.volume
        this.playbackRate=this.audio.playbackRate
    }

    /**
     *
     * @param {Vector2d} start
     * @param {Vector2d} finish
     */
    play(start=undefined,finish=undefined){
        if (start!==undefined && finish!==undefined){
            const squaredDistance=finish.sub(start,new Vector2d()).lengthSquared()
            const vol=Math.min(7000/squaredDistance,this.volume)
            if (vol>=0.01) {
                this.audio.volume = vol
            }else return
        }
        this.audio.play().catch(_=>{})
    }

    update(){
        if (this.audio.currentTime===0){
            this.audio.volume=this.volume
        }
    }

}
