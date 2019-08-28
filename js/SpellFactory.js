'use strict'

class SpellFactory {
    static CreateFireBall(x, y, vector, caster) {
        let hitbox = new Hitbox('CircleHitbox', new Vector2d(x, y), 16)
        let data = new Action(new Stats(-50, 0, 0, 0, 0, 0))
        let actor = new MovableActor(new Vector2d(x, y), new Vector2d(x + 8, y + 8))
        let result = new Spell(hitbox, data, new DrawableObject("middleground", SpriteFactory.CreateFireBallSprite()), actor)
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
                console.log(collision.obstacleObject)

            }
            Game.currentWorld.currentRoom.delete(result)
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
        let actor = new Actor(new Vector2d(pos.x, pos.y - 80), new Vector2d(pos.x, pos.y))
        let result = new Spell(undefined, data, new DrawableObject("middleground", sprite), actor)
        let dest = Game.currentWorld.currentRoom.getElementByClick(mouse.clickPosition)
        result.drawable.drowable.switch("strike")

        Game.currentWorld.currentRoom.Add(result)
        if (dest instanceof NPC && dest !== caster) {
            dest.statsManager.gainAction(result.data)
        }
        return result
    }
}