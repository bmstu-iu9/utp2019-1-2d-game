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

    play(){
        this.audio.play()
    }

}
