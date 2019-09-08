'use strict'

class SpellFactory {
    static CreateFireBall(x, y, vector, caster) {
        let hitbox = new Hitbox('CircleHitbox', new Vector2d(x, y), 16)
        let data = new Action(new Stats(-30, 0, 0, 0, 0, 0))
        let actor = new MovableActor(new Vector2d(x - 27, ~~(y - 70)), new Vector2d(x, y))
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
            if (collision.obstacleObject === result || collision.obstacleObject === caster) {
                return
            }
            if (collision.obstacleObject instanceof NPC && result.drawable.drowable.current.id != 'fireball_explosion') {
                collision.obstacleObject.statsManager.gainAction(result.data)
            }
            result.Update = function () {
            }
            //result.actor.position.set(collision.obstacleObject.actor.position)
            if (result.drawable.drowable.current.id != 'fireball_explosion') {
                result.actor.position.x -= 30
                result.actor.position.y -= 20
                result.drawable.drowable.reset()
                result.drawable.drowable.switch("explode")
            }
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

    static Hit(caster, vector) {
        let data = new Action(new Stats(-34,0,0,0,0,0))
        let centre=caster.actor.centre.add(20,0,new Vector2d())
        const centre_to_centre=centre.sub(caster.actor.centre,new Vector2d())
        const cos = centre_to_centre.dotProduct(vector) / Math.sqrt(centre_to_centre.lengthSquared() * vector.lengthSquared())
        let angle=Math.acos(cos)
        if (angle * vector.y < 0) angle *= -1
        let hitbox=new AABB(centre,[
            centre.add(-30, -20, new Vector2d()),
            centre.add(30, -20, new Vector2d()),
            centre.add(30, 20, new Vector2d()),
            centre.add(-30, 20, new Vector2d()),
        ])
        hitbox.rotateRadian(angle,caster.actor.centre)
        let result=new Spell(hitbox,data,new DrawableObject("middlegorund",SpriteFactory.CreateTestSprite()),new MovableActor(centre.sub(5,1,new Vector2d())),centre)
        result.collisonSolveStrategy="hit"
        /**
         * @param {Collision} collision
         */
        result.onCollide=function (collision) {
            if (collision.obstacleObject!==caster && !(caster.manager instanceof AIManager && collision.obstacleObject.manager instanceof AIManager)){
                if (collision.obstacleObject instanceof NPC){
                    collision.obstacleObject.statsManager.gainAction(result.data)
                }
            }
        }

        Game.currentWorld.currentRoom.Add(result)
        Game.currentWorld.currentRoom.movedObjects.push(result)
        return result
    }
}