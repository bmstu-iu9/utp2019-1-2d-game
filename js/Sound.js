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
    }

    play(){
        this.audio.play()
    }

    volume(){
        return this.audio.volume
    }

    playbackRate(){
        return this.audio.playbackRate
    }
}
