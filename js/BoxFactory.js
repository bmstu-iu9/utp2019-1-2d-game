'use strict'
class BoxFactory {
    static CreateGhostBox() {
        let data = [new SpritePattern("ghost", imagesStorage.ghost_shriek, [0, 1, 2, 3], "horizontal", 0, 0, 80, 64)]
        let result = new SpriteBox()
        data.forEach((u) => {
            result.add(u)
        })
        return result
    }
    static CreateKnightBox() {
        let idle = [new SpritePattern("knight_idle_right", imagesStorage.knight, [0], "horizontal", 0, 3, 84, 84, false, 1.85),
        new SpritePattern("knight_idle_top", imagesStorage.knight, [0], "horizontal", 9, 2, 84, 84, false, 1.85),
        new SpritePattern("knight_idle_left", imagesStorage.knight, [0], "horizontal", 0, 2, 84, 84, false, 1.85),
        new SpritePattern("knight_idle_bot", imagesStorage.knight, [0, 1, 2, 3], "horizontal", 0, 0, 84, 84, false, 1.85)]
        let beat = [new SpritePattern("knight_sword_right", imagesStorage.knight, [0, 1, 2], "horizontal", 4, 0, 84, 84, false, 5),
        new SpritePattern("knight_sword_top", imagesStorage.knight, [0, 1, 2], "horizontal", 6, 2, 84, 84, false, 5),
        new SpritePattern("knight_sword_left", imagesStorage.knight, [0, 1, 2], "horizontal", 7, 0, 84, 84, false, 5),
        new SpritePattern("knight_sword_bot", imagesStorage.knight, [0, 1, 2], "horizontal", 6, 3, 84, 84, false, 5)]
        let go = [new SpritePattern("knight_run_right", imagesStorage.knight, [5, 4, 2, 1], "horizontal", 0, 3, 84, 84, false, 7),
        new SpritePattern("knight_run_top", imagesStorage.knight, [0, 1, 2, 3, 4], "horizontal", 5, 1, 84, 84, false, 7),
        new SpritePattern("knight_run_left", imagesStorage.knight, [5, 4, 2, 1], "horizontal", 0, 2, 84, 84, false, 7),
        new SpritePattern("knight_run_bot", imagesStorage.knight, [0, 1, 2, 3, 4], "horizontal", 0, 1, 84, 84, false, 7)]
        let cast = [new SpritePattern("knight_cast_right", imagesStorage.knight, [0, 1, 2], "horizontal", 0, 4, 84, 84, false, 7),
        new SpritePattern("knight_cast_top", imagesStorage.knight, [0, 1, 2], "horizontal", 0, 5, 84, 84, false, 7),
        new SpritePattern("knight_cast_left", imagesStorage.knight, [0, 1, 2], "horizontal", 3, 4, 84, 84, false, 7),
        new SpritePattern("knight_cast_bot", imagesStorage.knight, [0, 1, 2], "horizontal", 6, 4, 84, 84, false, 7)]
        let result = new SpriteBox()
        idle.forEach((u) => {
            result.add("idle", u)
        })
        beat.forEach((u) => {
            result.add("beat", u)
        })
        go.forEach((u) => {
            result.add("go", u)
        })
        cast.forEach((u) => {
            result.add("cast", u)
        })
        return result
    }

    static CreateFireBallBox() {
        let seq = Array(61).fill(1).map((e, i) => i)
        let fly = new SpritePattern('fireball_fly_bot', imagesStorage.fire_ball, seq, "horizontal", 0, 0, 52, 52, false, 2, -Math.PI / 2)
        let result = new SpriteBox()
        result.add("fly", fly)
        return result
    }

    static CreateLigthningBox() {
        let seq = Array(62).fill(1).map((e, i) => i)
        let strike = new SpritePattern('lighthning_strike', imagesStorage.lightning, seq, "horizontal", 0, 0, 85, 40, true, 2)
        let result = new SpriteBox()
        result.add("strike", strike)
        return result
    }
}