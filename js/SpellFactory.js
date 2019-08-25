'use strict'
class SpellFactory {
    static CreateFireBall(x, y, vector) {
        let hitbox = new Hitbox('CircleHitbox', new Vector2d(x, y), 16)
        let data = new Action(new Stats(100))
        let actor = new MovableActor(new Vector2d(), new Vector2d(x, y))
        let result = new Spell()
        let speed = 3;
        vector.normalize()
        result.update = () => {
            this.actor.update()
            this.player.actor.changePosition(vector.mul(speed))
            this.hitbox.update(this.actor.centre)
        }
        Game.currentWorld.currentRoom.add(result)
        return result
    }
}