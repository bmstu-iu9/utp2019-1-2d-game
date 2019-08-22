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
        let data = [new SpritePattern("knight_idle","knight", imagesStorage.ghost_shriek, [0, 1, 2, 3], "horizontal", 0, 0, 80, 64)]
        let result = new SpriteBox()
        data.forEach((u) => {
            result.add(u)
        })
        return result
    }
}