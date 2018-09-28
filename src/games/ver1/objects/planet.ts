import { Hole } from './hole';
import { customConfig } from '../const/config';
import { Target } from '../../knifeOPP/objects/target';
export class Planet {
    private planet;
    constructor(params) {
        this.planet = params.scene.matter.add.sprite(params.x, params.y, params.key);
        for (let i = 0; i < 10; i++) {
            params.scene.anims.create({
                key: '' + i,
                frames: [{ key: 'planets', frame: i }],
                frameRate: 0
            });
        }
        this.planet.anims.play(params.skin, true);
        // this.planet.setOrigin(0, 0);
        this.setFriction(params.friction);
        this.planet.setCircle();
        let scalex = params.radius / this.planet.width;
        this.planet.setScale(scalex);
        this.setBounce(params.bounce);
        this.setVelocityX(params.velocityX);
        this.setAngularVelocity(params.anguVel);

    }
    public setFriction(val) {
        this.planet.setFriction(val);
    }
    public setBounce(valB) {
        this.planet.setBounce(valB);
    }
    public setVelocityX(valVelX) {
        this.planet.setVelocityX(valVelX);
    }
    public setAngularVelocity(aVal) {
        this.planet.setAngularVelocity(0.15);
    }
    public setCircle(radius) {
        if (radius) {
            this.planet.setCircle(radius);
        } else {
            this.planet.setCircle();
        }
    }
    public setCollision(cat) {
        this.planet.setCollisionCategory(cat)
    }
    public setCollideW(cat) {
        this.planet.setCollidesWith(cat);
    }
    public setScale(val) {
        this.planet.setScale(val);
    }
    public setX(val) {
        this.planet.x = val;
    }
    public setY(val) {
        this.planet.y = val;
    }
    public getX() {
        return this.planet.x;
    }
    public getY() {
        return this.planet.y;
    }
    public update(angle) {
        if (angle > 0) {
            this.planet.setVelocityX(2);
        } else if (angle < 0) {
            this.planet.setVelocityX(-2);
        } else {
            this.planet.setVelocityX(0);
        }
    }
    public setPause() {
        this.setVelocityX(0);
        this.setBounce(0);
        this.planet.setTint(0xff0000);
    }
    public setDead(scene, tween, planet, x, y, textOver) {
        console.log(x, y);
        textOver.setText("GAME OVER\n" + textOver.text);
        tween.add({
            targets: this.planet,
            x: x,
            y: y,
            ease: customConfig.sliderSkin.item.ease,
            duration: customConfig.sliderSkin.item.duration,
            delay: 0,
            onComplete: function () {
                planet.setScale(0.1);
                tween.add({
                    targets: textOver,
                    y: customConfig.height / 2,
                    ease: customConfig.sliderSkin.item.ease,
                    duration: customConfig.sliderSkin.item.duration + 1500,
                    delay: 0,
                    onComplete: function (){
                        window.setTimeout(function () {
                            scene.start("GameScene");
                        }, 1000);
                    }
                })
                
                
            }
        });
        this.setPause();
    }
}