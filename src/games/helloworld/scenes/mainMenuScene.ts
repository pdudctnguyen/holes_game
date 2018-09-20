/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Asteroid: Main Menu Scene
 * @license      Digitsensitive
 */
var sd;
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  init(): void {
  }

  preload(): void {
    this.load.image("start","./src/games/helloworld/assets/playbutton.png");
    this.load.audio('airplaneSoundKey', './src/games/helloworld/assets/sounds/airplane.m4a');
    this.load.audio('fireTruckSoundKey', './src/games/helloworld/assets/sounds/fire-truck.m4a');
  }

  create(): void {
    this.add.image(400, 300, 'start');
    this.input.on("pointerdown", this.spinWheel, this);
    sd = this.sound.add("airplaneSoundKey");
    var config = {
      mute: false,
      volume: 10,
      rate: 1,
      detune: 10,
      seek: 0,
      loop: false,
      delay: 10
    }
    sd.play();
  }
  private spinWheel():void {
    console.log(1);
    sd.stop();
      this.scene.start("GameScene");
  }
}

