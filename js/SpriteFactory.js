'use strict'
class SpriteFactory {
    static CreateTestSprite() {
        return new Sprite(1, Game.GhostBox)
    }

    static CreateFireBallSprite() {
        return new Sprite(60, Game.FireBallBox, "fly", true)
    }
}