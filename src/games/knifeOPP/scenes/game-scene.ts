
import { Target } from '../objects/target';
import { Knife } from '../objects/knife';
import { gameOptions } from "../const/config";
export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.Image;
    private score: number;
    private target: Target;
    private canThrow: boolean;
    private knife: Knife;
    private knifeGroup;
    private scoreText;
    private SCORE: number;
    private btn_play;
    constructor() {
        super({
            key: "GameScene"
        });
    }

    preload(): void {
        this.load.image(
            "background",
            "./src/games/knifeOPP/assets/background.jpg"
        );
        this.load.image("target", "./src/games/knifeOPP/assets/target.png");
        this.load.image("knife", "./src/games/knifeOPP/assets/knife.png");
        this.load.image("play", "./src/games/knifthit/assets/btn.jpeg");
    }
    init(): void {
        this.score = 0;
    }
    create(): void {
        // create background
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.knifeGroup = this.add.group();
        // can the player throw a knife? Yes, at the beginning of the game
        this.target = new Target({
            scene: this,
            x: this.sys.canvas.width / 2,
            y: 400,
            key: "target"
        });
        this.target.depth = 1;
        this.target.update();
        this.knife = new Knife({
            scene: this,
            x: this.sys.canvas.width / 2,
            y: this.sys.canvas.height / 5 * 4,
            key: "knife"
        })
        // var particles = this.add.particles('red');
        // var emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });
        this.btn_play = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2 + 100, "play");
        this.btn_play.setInteractive();
        this.btn_play.on("pointerdown", this.playGame, this);
        this.SCORE = 0;
        this.scoreText = this.add.text(5, 10, "YOURS: " + this.SCORE, { fontSize: '35px', fill: 'white', fontWeight: '700' });
    }
    private playGame():void{
        this.input.on("pointerdown", this.throwKnife, this);
        this.btn_play.destroy();
        this.target.currentRotationSpeed = gameOptions.rotationSpeedStart;
        this.target.newRotationSpeed = gameOptions.rotationSpeedStart;
    }
    private throwKnife(): void {
        // can the player throw?
        if (this.knife.getCanThrow()) {

            // player can't throw anymore
            this.knife.setCanThrow(false);

            // tween to throw the knife
            this.tweens.add({

                // adding the knife to tween targets
                targets: [this.knife],
                // ease: 'Power2',
                // y destination
                y: this.target.y + this.target.width / 2,

                // tween duration
                duration: gameOptions.throwSpeed,

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function (tween) {

                    // at the moment, this is a legal hit
                    let legalHit = true;

                    // getting an array with all rotating knives
                    let children = this.knifeGroup.getChildren();

                    // looping through rotating knives
                    for (let i = 0; i < children.length; i++) {

                        // is the knife too close to the i-th knife?
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < gameOptions.minAngle) {

                            // this is not a legal hit
                            legalHit = false;

                            // no need to continue with the loop
                            break;
                        }
                    }

                    // is this a legal hit?
                    if (legalHit) {
                        // player can now throw again
                        this.knife.setCanThrow(true);

                        // adding the rotating knife in the same place of the knife just landed on target
                        let knife = this.add.sprite(this.knife.x, this.knife.y, "knife");

                        // impactAngle property saves the target angle when the knife hits the target
                        knife.impactAngle = this.target.angle;

                        // adding the rotating knife to knifeGroup group
                        this.knifeGroup.add(knife);

                        // bringing back the knife to its starting position
                        this.knife.y = this.sys.canvas.height / 5 * 4;
                        this.SCORE += 10;
                        this.scoreText.setText("YOURS: " + this.SCORE);
                    }

                    // in case this is not a legal hit
                    else {

                        // tween to throw the knife
                        this.tweens.add({
                            // adding the knife to tween targets
                            targets: [this.knife],

                            // y destination
                            y: this.sys.canvas.height + this.knife.height,

                            // rotation destination, in radians
                            rotation: 5,

                            // tween duration
                            duration: gameOptions.throwSpeed * 4,

                            // callback scope
                            callbackScope: this,

                            // function to be executed once the tween has been completed
                            onComplete: function (tween) {
                                // restart the game
                                let tmp = this.add.text(this.sys.canvas.width / 2 - this.target.width / 2 - 50, 400, "YOU LOSED!", { fontSize: '52pt', fill: 'red', fontWeight: '700' })
                                tmp.depth = 2;
                                let tmp_this = this;
                                window.setTimeout(function () {
                                    tmp_this.scene.start("GameScene");
                                }, 3000);
                            }
                        });
                    }
                }
            });
        }
    }
    update(time, delta) {

        // rotating the target
        this.target.angle += this.target.currentRotationSpeed;

        // getting an array with all rotating knives
        let children = this.knifeGroup.getChildren();

        // looping through rotating knives
        for (let i = 0; i < children.length; i++) {

            //     // rotating the knife
            children[i].angle += this.target.currentRotationSpeed;

            //     // turning knife angle in radians
            let radians = Phaser.Math.DegToRad(children[i].angle + 90);

            //     // trigonometry to make the knife rotate around target center
            children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }

        // adjusting current rotation speed using linear interpolation
        this.target.currentRotationSpeed = Phaser.Math.Linear(this.target.currentRotationSpeed, this.target.newRotationSpeed, delta / 1000);
    }
}