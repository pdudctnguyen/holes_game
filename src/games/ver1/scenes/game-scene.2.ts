// import { Line } from "../objects/line";
import { Ball } from '../objects/ball';
import { Warn } from '../objects/warn';
import { Gift } from '../objects/gift';
import { Player } from '../objects/player';
export class GameScene extends Phaser.Scene {
  // private line1: Line;
  private player: Ball;
  private warns: Phaser.GameObjects.Group;
  private gifts: Phaser.GameObjects.Group;
  private cursors;
  private h_cs;
  private w_cs;
  private ball;
  private ground;
  private zone1;
  private zone2;
  private area1;
  private area2;
  private alpha;
  private score;
  private scoreText;
  private ball1: Player;
  constructor() {
    super({
      key: "GameScene"
    });
    this.w_cs = 734;
    this.h_cs = 551;
  }

  init(): void {
    this.warns = this.add.group({ classType: Warn });
    this.gifts = this.add.group({ classType: Gift });
    this.alpha = 0.3;
    this.score = 0;
  }

  preload(): void {
    this.load.image("ball", "./src/games/ver1/assets/ball.png");
    this.load.image("platform", "./src/games/ver1/assets/btnu.png");
    this.load.image("zone", "./src/games/ver1/assets/zone.jpg");
    this.load.image("warn", "./src/games/ver1/assets/gift5.png");
    this.load.image("gift5", "./src/games/ver1/assets/gift5a.png");
    this.load.image("gift10", "./src/games/ver1/assets/gift10.png");
  }
  create(): void {
    this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
    this.scoreText = this.add.text(300, 500, "YOURS: " + this.score, { fontSize: '50px', fill: 'red', fontWeight: '700' });
    this.input.addPointer();
    this.input.addPointer();
    this.ball = this.matter.add.sprite(50, 340, 'ball');
    this.ball1 = new Player({
      scene: this,
      x: parseInt(this.w_cs) / 2,
      y: 350,
      key: "ball"
    });
    // this.ball = this.player
    this.ball.setCircle();
    this.ball.setFriction(0.005);
    this.ball.setBounce(0.6);
    this.ball.setVelocityX(2);
    this.ball.setAngularVelocity(0.15);
    this.ground = this.matter.add.image(360, 400, 'platform');

    this.ground.setStatic(true);
    this.ground.setScale(0.6, 0.8);
    this.ground.setAngle(0);
    this.ground.setFriction(0.005);


    let cat1 = this.matter.world.nextCategory();
    this.ball.setCollisionCategory(cat1);
    this.ground.setCollisionCategory(cat1);
    this.ball.setCollidesWith(cat1);
    this.area1 = this.add.image(75, 500, 'zone').setDisplaySize(70, 150).setInteractive();
    this.area2 = this.add.image(700, 500, 'zone').setDisplaySize(70, 150).setInteractive();
    this.area1.setAlpha(this.alpha);
    this.area2.setAlpha(this.alpha);

    this.zone1 = this.add.sprite(75, 500, "ball").setDisplaySize(50, 50).setInteractive({ draggable: true });
    this.zone2 = this.add.sprite(700, 500, "ball").setDisplaySize(50, 50).setInteractive({ draggable: true });
    let clone = this;
    this.zone1.on('drag', function (pointer, dragX, dragY) {
      if (dragY < clone.area1.y - 75) {
        this.y = clone.area1.y - 75;
      } else if (dragY > clone.area1.y + 75) {
        this.y = clone.area2.y + 75;
      } else {
        this.y = dragY;
      }
      // console.log(this.y);
    });
    this.zone2.on('drag', function (pointer, dragX, dragY) {
      if (dragY < clone.area2.y - 75) {
        this.y = clone.area2.y - 75;
      } else if (dragY > clone.area2.y + 75) {
        this.y = clone.area2.y + 75;
      } else {
        this.y = dragY;
      }
    });
    this.zone1.on('dragend', function (pointer, dragX, dragY) {
      this.y = clone.area1.y;
    })
    this.zone2.on('dragend', function (pointer, dragX, dragY) {
      this.y = clone.area2.y;
    })
    //add vat can
    let warn;
    let x, y;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 3; j++) {
        x = Phaser.Math.Between((i) * parseInt(this.w_cs) / 7 + 20, (i + 1) * parseInt(this.w_cs) / 7);
        y = Phaser.Math.Between((j) * parseInt(this.h_cs) / 5, (j + 1) * parseInt(this.h_cs) / 5);
        warn = this.matter.add.image(x, y, 'warn');
        warn.setCircle(20);
        warn.setStatic(true);
        // add pipe to group
        this.warns.add(warn);
      }
    }
    let gift;
    let type;
    for (let i = 0; i < 13; i++) {
      type = Phaser.Math.Between(0, 1);

      x = Phaser.Math.Between(20, 600);
      y = Phaser.Math.Between(10, 250);
      gift = this.matter.add.image(x, y, type == 0 ? "gift5" : "gift10");
      gift.setCircle(20);
      gift.setName(type == 0 ? "gift5" : "gift10");
      gift.setStatic(true);
      this.gifts.add(gift);
    }
  }

  update(): void {
    if (this.zone1.y < this.area1.y && this.zone2.y < this.area2.y) {
      console.log("up");
      this.ground.y -= 1;
    } else if (this.zone1.y > this.area1.y && this.zone2.y > this.area2.y) {
      this.ground.y += 1;
    } else {
      this.ground.angle = getAngle(this.zone1, this.zone2);
      if (this.ground.angle > 0) {
        this.ball.setVelocityX(2);
      } else if (this.ground.angle < 0) {
        this.ball.setVelocityX(-2);
      }
    }
    this.warns.children.each(function (warn) {
      if (Phaser.Math.Distance.Between(warn.x, warn.y, this.ball.x, this.ball.y) <= 20) {
        // warn.destroy();
        alert('die');
      }
      // console.log( Phaser.Math.Distance.Between(warn.x,warn.y,this.ball.x,this.ball.y));
    }, this);
    let tmp = this;
    this.gifts.children.each(function (gift) {
      if (Phaser.Math.Distance.Between(gift.x, gift.y, this.ball.x, this.ball.y) <= 20) {
        alert(gift.name);
        if (gift.name == "gift5") {
          tmp.score += 5;
        } else {
          tmp.score += 10;
        }
        tmp.scoreText.setText("YOURS: " + tmp.score);
        // tmp.scoreText = tmp.add.text(300, 500, "YOURS: " + tmp.score, { fontSize: '50px', fill: 'red', fontWeight: '700' });
        gift.destroy();
      }
      // console.log( Phaser.Math.Distance.Between(warn.x,warn.y,this.ball.x,this.ball.y));
    }, this);
  }
}
function getAngle(obj1, obj2) {
  // angle in radians
  var angleRadians = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
  // angle in degrees
  var angleDeg = (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI);
  return angleDeg;
}
function collectGift(player, star) {
  star.destroy();
  console.log("gift");
}

function hitBomb(player, bomb) {
  this.physics.pause();
  console.log("over");
  player.setTint(0xff0000);
}