/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Asteroid: Game Scene
 * @license      Digitsensitive
 */
var logo;
var logo1;
var logo2;
var sd1;
var scale_item = 0;
export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });
  }
  init(): void {
  }

  preload(): void {
    this.load.image("oct", "./src/games/helloworld/assets/octopus.png");
    this.load.image("ribi", "./src/games/helloworld/assets/demo.jpg");
    this.load.audio('dogSoundKey', './src/games/helloworld/assets/sounds/dog.m4a');
    this.load.audio('iceSkatingSoundKey', './src/games/helloworld/assets/sounds/ice-skating.m4a');
  }

  create(): void {
    sd1 = this.sound.add("dogSoundKey");
    var config = {
      loop: true
    }
    sd1.play(config);
    logo = this.physics.add.image(400, 100, 'ribi');
    logo.setDisplaySize(100, 100);
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    logo1 = this.physics.add.image(200, 100, 'ribi');
    logo1.setDisplaySize(50, 50);
    logo1.setVelocity(50, 100);
    logo1.setBounce(1, 1);
    logo1.setCollideWorldBounds(true);

    logo2 = this.physics.add.image(0, 100, 'ribi');
    logo2.setDisplaySize(50, 50);
    logo2.setVelocity(50, 100);
    logo2.setBounce(1, 1);
    logo2.setCollideWorldBounds(true);
    // emitter.startFollow(logo);
  }
  update(): void {
    var tmp =  Phaser.Geom.Intersects.RectangleToRectangle(
      logo.getBounds(),
      logo1.getBounds()
    )
    if (tmp) {
      console.log(1);
      sd1.stop();
      if (logo.getBounds().width > logo1.getBounds().width && logo1.getBounds().width > 0) {
        console.log(logo1.getBounds().width);
        logo1.setDisplaySize(0,0);
        scale_item += 0.1;
        console.log(scale_item);
        logo.setScale(scale_item);
      }
      //  this.scene.start("MainMenuScene");
    }
  }

}
