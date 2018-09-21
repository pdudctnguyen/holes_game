export class Player {
    private ball;
    constructor(params) {
        this.ball = params.scene.matter.add.sprite(params.x, params.y, params.key);
        for (let i = 0; i < 10; i++) {
            params.scene.anims.create({
                key: '' + i,
                frames: [{ key: 'planets', frame: i }],
                frameRate: 0
            });
        }
        this.ball.anims.play(params.skin, true);
        this.ball.setDisplaySize(params.w, params.h);
        this.ball.setOrigin(0, 0);
        this.setCircle(params.radius);
        this.setFriction(params.friction);
        this.setBounce(params.bounce);
        this.setVelocityX(params.velocityX);
        this.setAngularVelocity(params.anguVel);
    }
    public setFriction(val) {
        this.ball.setFriction(val);
    }
    public setBounce(valB) {
        this.ball.setBounce(valB);
    }
    public setVelocityX(valVelX) {
        this.ball.setVelocityX(valVelX);
    }
    public setAngularVelocity(aVal) {
        this.ball.setAngularVelocity(0.15);
    }
    public setCircle(radius) {
        if (radius) {
            this.ball.setCircle(radius);
        } else {
            this.ball.setCircle();
        }
    }
    public setCollision(cat) {
        this.ball.setCollisionCategory(cat)
    }
    public setCollideW(cat) {
        this.ball.setCollidesWith(cat);
    }
    public setX(val) {
        this.ball.x = val;
    }
    public setY(val) {
        this.ball.y = val;
    }
    public getX() {
        return this.ball.x;
    }
    public getY() {
        return this.ball.y;
    }
    public setDead() {
        this.setVelocityX(0);
        this.setBounce(0);
        this.ball.setTint(0xff0000);
    }
}