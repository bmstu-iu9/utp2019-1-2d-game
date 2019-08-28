'use strict'

class SpellFactory {
    static CreateFireBall(x, y, vector, caster) {
        let hitbox = new Hitbox('CircleHitbox', new Vector2d(x, y), 16)
        let data = new Action(new Stats(-50, 0, 0, 0, 0, 0))
        let actor = new MovableActor(new Vector2d(x, y), new Vector2d(x + 8, y + 8))
        let result = new Spell(hitbox, data, new DrawableObject("middleground", SpriteFactory.CreateFireBallSprite()), actor)
        let speed = 3;
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
            //TODO realize fireball deletinig
            Game.currentWorld.currentRoom.delete(result)
        }

        result.drawable.drowable.switch("fly", vector)
        Game.currentWorld.currentRoom.Add(result)
        return result


    }
}