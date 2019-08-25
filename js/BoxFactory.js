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
        let idle = [new SpritePattern("knight_idle_right", imagesStorage.knight, [0], "horizontal", 0, 3, 84, 84, false, 1),
            new SpritePattern("knight_sword_top", imagesStorage.knight, [0, 1, 2], "horizontal", 6, 3, 84, 84, false, 3),
            new SpritePattern("knight_idle_left", imagesStorage.knight, [0], "horizontal", 0, 2, 84, 84, false, 1),
            new SpritePattern("knight_idle_bot", imagesStorage.knight, [0, 1, 2, 3], "horizontal", 0, 0, 84, 84, false, 1)]
        let beat = [new SpritePattern("knight_sword_right", imagesStorage.knight, [0, 1, 2], "horizontal", 4, 0, 84, 84, true, 3),
            new SpritePattern("knight_sword_top", imagesStorage.knight, [0, 1, 2], "horizontal", 6, 3, 84, 84, false, 3),
            new SpritePattern("knight_sword_left", imagesStorage.knight, [0, 1, 2], "horizontal", 7, 0, 84, 84, true, 3),
            new SpritePattern("knight_sword_bot", imagesStorage.knight, [0, 1, 2], "horizontal", 6, 2, 84, 84, false, 3)]
        let go = [new SpritePattern("knight_run_right", imagesStorage.knight, [5, 4, 2, 1], "horizontal", 0, 3, 84, 84, false, 7),
            new SpritePattern("knight_run_top", imagesStorage.knight, [0, 1, 2, 3, 4], "horizontal", 5, 1, 84, 84, false, 7),
            new SpritePattern("knight_run_left", imagesStorage.knight, [5, 4, 2, 1], "horizontal", 0, 2, 84, 84, false, 7),
            new SpritePattern("knight_run_bot", imagesStorage.knight, [0, 1, 2, 3, 4], "horizontal", 0, 1, 84, 84, false, 7)]
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
        return result
    }
}