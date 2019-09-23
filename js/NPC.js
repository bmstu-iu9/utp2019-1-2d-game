'use strict'

/**
 * @class
 */
class NPC extends GameObject {
    /**
     *
     * @param {Vector2d} [coords = new Vector2d(0,0)]
     * @param {Vector2d} [centre = new Vector2d(0,0)]
     * @param {DrawableObject} drawable
     * @param hitbox
     * @param id
     * @param manager
     */
    constructor(coords = new Vector2d(0, 0), centre = new Vector2d(0, 0), drawable, hitbox, stats, id = Game.getUniqId(), manager = undefined) {
        super(id)
        this.actor = new MovableActor(coords, centre)
        this.drawable = drawable
        this.manager = manager
        this.statsAffector = new StatsAffector()
        this.statsManager = new StatsManager(stats)
        this.hitbox = hitbox
        this.direction = new Vector2d(0, 0)
        this.casting = 0
        this.state=STATE.idle
        this.collisonSolveStrategy = "stay"
        
        //
        this.hpB = new Vector2d()
        this.hp = Game.HealthBarOverlayTexture
        //
        this.abilities = [AbilityFactory.createFireBallAbility(this), AbilityFactory.createLigthningAbility(this),AbilityFactory.Hit(this)]
        this.soundBoard={
            hitSound:new Sound(Game.HitSound),
            fireballCastSound:new Sound(Game.FireballCast),
            fireballExplosionSound:new Sound(Game.FireballExplosion),
            update:function () {
                this.fireballExplosionSound.update()
            }
        }
    }

    isDead() {
        return this.statsManager.stats.hp <= 0
    }

    drawHPBar() {
      if(this.statsManager.stats.hp < this.statsManager.hpLimit) {
        this.drawable.canvasCoord.add(~~(this.drawable.drowable.width / 2 - Game.HealthBarBackgroudTexture.width / 2), -4, this.hpB)
        Game.HealthBarBackgroudTexture.render(this.hpB)
        let frac = this.statsManager.stats.hp / this.statsManager.hpLimit
        ctx.drawImage(this.hp.img, this.hpB.x + 1, this.hpB.y + 1, ~~(this.hp.img.width * frac) ,this.hp.img.height)
      }
    }

    render() {
        this.drawable.render()
        this.drawHPBar()
    }

    Update() {
        if (this.isDead()) {
            if(this.manager instanceof PlayerManager) {
                let tile = TilesFactory.CreateCross(this.actor.position.x,this.actor.position.y)
                Game.currentWorld.currentRoom.Add(tile)
            }else{
                const random=Math.random()
                let bonus
                if (random<0.25){
                    bonus=TilesFactory.CreateHPBottle(this.actor.centre.x,this.actor.centre.y)
                }else if (random<0.5){
                    bonus=TilesFactory.CreateAttackBonus(this.actor.centre.x,this.actor.centre.y)
                }else if (random<0.75){
                    bonus=TilesFactory.CreateManaBottle(this.actor.centre.x,this.actor.centre.y)
                }
                if (bonus!==undefined) Game.currentWorld.currentRoom.Add(bonus)
                Game.Last.play()
                PlayerManager.levelManager.update(this)
            }
            Game.currentWorld.currentRoom.delete(this)
        }
        this.actor.update()
        if (this.manager !== undefined) {
            this.manager.update()
        }
        if (this.casting) {
            this.casting--
            if (this.state===STATE.attack){
                //this.drawable.drowable.switch('beat',this.direction)
                this.collisonSolveStrategy = 'stay'
            }
        }else switch (this.state) {
            case STATE.walk:
                this.drawable.drowable.switch("go", this.direction)
                this.collisonSolveStrategy = 'move'
                break
            case STATE.attack:
                this.drawable.drowable.switch('beat',this.direction)
                this.collisonSolveStrategy='move'
                break
            default:
                this.drawable.drowable.switch("idle", this.direction)
                this.collisonSolveStrategy = 'stay'
        }
        this.hitbox.update(this.actor.centre)
        for (let ability of this.abilities) {
            if (ability !== undefined) {
                ability.update(Game.step)
            }
        }
        this.statsManager.update(Game.step)
        this.statsManager.correctStats()
    }

    /**
     *
     * @param {Collision} collision
     */

    onCollide(collision) {
    }

    toJSON() {
        return Serializations[this.type](this)
    }

    /**
     *
     * @param {NPC} object
     */
    static fromJSON(object) {
        let npc
        if (object.type === "player") {
            npc = TilesFactory.CreatePlayer()
            npc.id = object.id
            npc.actor = MovableActor.fromJSON(object.actor)
            npc.hitbox = ("type" in object.hitbox) ? Hitbox.fromJSON(object.hitbox) : ("radius" in object.hitbox)
                ? CircleHitbox.fromJSON(object.hitbox) : AABB.fromJSON(object.hitbox)
            npc.direction = Vector2d.fromJSON(object.direction)
            npc.collisonSolveStrategy = object.collisonSolveStrategy
            npc.statsManager = StatsManager.fromJSON(object.statsManager)
            Game.barControler = new BarControler(npc)
            Game.camera.focusOn(npc.actor)
            Game.player = npc
        } else {
            if (object.type === "staticNpc") {
            npc = TilesFactory.CreateStaticNPC(0, 0, object.nav)
            }
            else npc = TilesFactory.CreateStaticNPC2(0, 0, object.nav)
            npc.id = object.id
            npc.actor = MovableActor.fromJSON(object.actor)
            npc.hitbox = Hitbox.fromJSON(object.hitbox)
            npc.direction = Vector2d.fromJSON(object.direction)
            npc.collisonSolveStrategy = object.collisonSolveStrategy
            npc.statsManager = StatsManager.fromJSON(object.statsManager)
            npc.manager.resultPath.splice(0)
            npc.manager.path.splice(0)
            npc.manager.trianglePath.splice(0)
            object.manager.resultPath.forEach(vector => npc.manager.resultPath.push(Vector2d.fromJSON(vector)))
            object.manager.path.forEach(vector => npc.manager.path.push(Vector2d.fromJSON(vector)))
            npc.manager.agro = object.manager.agro
        }

        return npc
    }
}

const STATE={
    idle:0,
    walk:1,
    attack:2
}