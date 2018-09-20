import { Player } from '../../coin-runner/objects/player';
let gameOptions = {

    // target rotation speed, in degrees per frame
    rotationSpeed: 0,
    rotationSpeedStart:3,

    // knife throwing duration, in milliseconds
    throwSpeed: 150,

    // minimum angle between two knives
    minAngle: 15,

    // max rotation speed variation, in degrees per frame
    rotationVariation: 2,

    // interval before next rotation speed variation, in milliseconds
    changeTime: 2000,

    // maximum rotation speed, in degrees per frame
    maxRotationSpeed: 6
}
export class playGame extends Phaser.Scene {
    private currentRotationSpeed;
    private newRotationSpeed;
    private canThrow;
    private knifeGroup;
    private knife;
    private target;
    private background;
    private btn_play;
    private scoreText;
    private SCORE:number;
    ;
    // constructor
    constructor() {
        super("playGame");
    }
    // method to be executed when the scene preloads
    preload() {

        // loading assets
        this.load.image("back", "./src/games/knifthit/assets/back.jpg")
        this.load.image("target", "./src/games/knifthit/assets/target.png");
        this.load.image("knife", "./src/games/knifthit/assets/knife.png");
        this.load.image("play", "./src/games/knifthit/assets/btn.jpeg");
    }
    create(): void {

        // at the beginning of the game, both current rotation speed and new rotation speed are set to default rotation speed
        this.currentRotationSpeed = gameOptions.rotationSpeed;
        this.newRotationSpeed = gameOptions.rotationSpeed;

        // can the player throw a knife? Yes, at the beginning of the game
        this.canThrow = true;

        // group to store all rotating knives
        this.knifeGroup = this.add.group();
        this.background = this.add.image(0, 0,'back');
        // this.background = this.add.tileSprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sys.canvas.width, this.sys.canvas.height, 'back');
        // Phaser.Display.Align.In.Center(this.background , this.add.zone(this.sys.canvas.width/2, this.sys.canvas.height/2, this.sys.canvas.width, this.sys.canvas.height));
        Phaser.Display.Align.In.Center(this.background, this.add.zone(750/2, 1334/2, 750, 1334));
        // adding the knife
        this.knife = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 5 * 4, "knife");

        // adding the target
        this.target = this.add.sprite(this.sys.canvas.width / 2, 400, "target");

        // moving the target on front
        this.target.depth = 1;
        // this.background.depth = 0;
        this.btn_play = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2 + 100, "play");
        this.btn_play.setInteractive();
        this.btn_play.on("pointerdown", this.playGame, this);
        this.SCORE = 0;
        this.scoreText = this.add.text(5,10,"YOURS: " + this.SCORE, { fontSize: '35px', fill: 'white',fontWeight:'700' });
    }
    private playGame():void{
        this.input.on("pointerdown", this.throwKnife, this);
        this.btn_play.destroy();
        this.currentRotationSpeed = gameOptions.rotationSpeedStart;
        this.newRotationSpeed = gameOptions.rotationSpeedStart;
        console.log(1);
        let timedEvent = this.time.addEvent({
            delay: gameOptions.changeTime,
            callback: this.changeSpeed,
            callbackScope: this,
            loop: true
        });
    }
    private changeSpeed(): void {

        // ternary operator to choose from +1 and -1
        let sign = Phaser.Math.Between(0, 1) == 0 ? -1 : 1;

        // random number between -gameOptions.rotationVariation and gameOptions.rotationVariation
        let variation = Phaser.Math.FloatBetween(-gameOptions.rotationVariation, gameOptions.rotationVariation);

        // new rotation speed
        this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;

        // setting new rotation speed limits
        this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -gameOptions.maxRotationSpeed, gameOptions.maxRotationSpeed);
    }
    private throwKnife(): void {

        // can the player throw?
        if (this.canThrow) {

            // player can't throw anymore
            this.canThrow = false;

            // tween to throw the knife
            this.tweens.add({

                // adding the knife to tween targets
                targets: [this.knife],

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
                        this.canThrow = true;

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
                                let tmp = this.add.text(this.sys.canvas.width / 2 - this.target.width/2 - 50, 400 ,"YOU LOSED!",{ fontSize: '52pt', fill: 'red',fontWeight:'700' })
                                tmp.depth = 2;
                                let tmp_this = this;
                                window.setTimeout(function () {
                                    tmp_this.scene.start("playGame");
                                },3000);
                            }
                        });
                    }
                }
            });
        }
    }
    // method to be executed at each frame. Please notice the arguments.
    update(time, delta) {

        // rotating the target
        this.target.angle += this.currentRotationSpeed;

        // getting an array with all rotating knives
        let children = this.knifeGroup.getChildren();

        // looping through rotating knives
        for (let i = 0; i < children.length; i++) {

            // rotating the knife
            children[i].angle += this.currentRotationSpeed;

            // turning knife angle in radians
            let radians = Phaser.Math.DegToRad(children[i].angle + 90);

            // trigonometry to make the knife rotate around target center
            children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }

        // adjusting current rotation speed using linear interpolation
        this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000);
    }

}