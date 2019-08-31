'use strict'

class SpellFactory {
    static CreateFireBall(x, y, vector, caster) {
        let hitbox = new Hitbox('CircleHitbox', new Vector2d(x, y), 16)
        let data = new Action(new Stats(-50, 0, 0, 0, 0, 0))
        let actor = new MovableActor(new Vector2d(x, ~~(y - 3 * caster.drawable.drowable.height / 4)), new Vector2d(x + 8, y + 8))
        let sprite = SpriteFactory.CreateFireBallSprite()
        let result = new Spell(hitbox, data, new DrawableObject("middleground", sprite), actor)
        sprite.onceCallback = () => {
            Game.currentWorld.currentRoom.delete(result)
        }
        let speed = 7;
        vector.normalize()
        result.collisonSolveStrategy = "none"
        result.Update = () => {
            result.actor.update()
            result.actor.changePosition(vector.mul(speed, new Vector2d()))
            result.hitbox.update(result.actor.centre)
        }
        /**
         * @param {Collision} collision
         */
        result.onCollide = (collision) => {
            if (collision.obstacleObject == result || collision.obstacleObject == caster) {
                return
            }
            if (collision.obstacleObject instanceof NPC) {
                collision.obstacleObject.statsManager.gainAction(result.data)
            }
            result.Update = function () {
            }
            result.drawable.drowable.switch("explode")
        }

        result.drawable.drowable.switch("fly", vector)
        Game.currentWorld.currentRoom.Add(result)
        return result
    }

    static CastLightning(caster) {
        let data = new Action(new Stats(-100, 0, 0, 0, 0, 0))
        let pos = new Vector2d(mouse.clickPosition)
        Game.camera.setGameCoord(pos)
        let sprite = SpriteFactory.CreateLightningSprite()
        sprite.onceCallback = () => {
            Game.currentWorld.currentRoom.delete(result)
        }
        let actor = new Actor(new Vector2d(pos.x - 20, pos.y - 50), new Vector2d(pos.x, pos.y))
        let result = new Spell(undefined, data, new DrawableObject("middleground", sprite), actor)
        let dest = Game.currentWorld.currentRoom.getElementByClick(mouse.clickPosition.add(0, 50))
        result.drawable.drowable.switch("strike")

        Game.currentWorld.currentRoom.Add(result)
        if (dest instanceof NPC && dest !== caster) {
            dest.statsManager.gainAction(result.data)
        }
        return result
    }
}