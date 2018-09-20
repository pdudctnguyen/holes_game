// import { Line } from '../objects/line';
import { Ball } from '../objects/ball';
import { Warn } from '../objects/warn';
import { Gift } from '../objects/gift';
import { Player } from '../objects/player';
import { Ground } from '../objects/ground';
export class GameScene extends Phaser.Scene {
  // private line1: Line;
  private player: Ball;
  private warns;
  private gifts;
  private cursors;
  private h_cs;
  private w_cs;
  private ball: Player;
  private ground: Ground;
  private zone1;
  private zone2;
  private area1;
  private area2;
  private alpha;
  private score;
  private scoreText;
  private groud1;
  private test;
  private test1;
  private timer;
  private t;
  constructor() {
    super({
      key: "GameScene"
    });
    this.w_cs = 734;
    this.h_cs = 551;
    this.t = 5;
  }

  init(): void {
    this.warns = [];
    this.gifts = [];
    this.alpha = 0.3;
    this.score = 0;
  }

  preload(): void {
    this.load.image("ball", "./src/games/ver1/assets/ball.png");
    this.load.image("ball1", "./src/games/ver1/assets/ball11.png");
    this.load.image("platform", "./src/games/ver1/assets/btnu.png");
    this.load.image("zone", "./src/games/ver1/assets/zone.jpg");
    this.load.image("warn", "./src/games/ver1/assets/gift5.png");
    this.load.image("gift5", "./src/games/ver1/assets/gift5a.png");
    this.load.image("gift10", "./src/games/ver1/assets/gift10.png");
  }
  create(): void {
    let key = "";
    if (this.registry.get("skin") == "1") {
      key = "ball1";
    } else {
      key = "ball"
    }
    this.cameras.main.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
    this.matter.world.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);

    // this.cameras.main.setBounds(0, 0,this.w_cs, 2* this.h_cs);
    // this.matter.world.setBounds(0, 0, 10000, 600, 32, true, true, true, true);
    this.scoreText = this.add.text(300, 500, "YOURS: " + this.score, { fontSize: '50px', fill: 'red', fontWeight: '700' });
    this.input.addPointer();
    this.input.addPointer();
    this.ball = new Player({
      scene: this,
      x: parseInt(this.w_cs) / 2,
      y: 350,
      w: 50,
      h: 50,
      radius: 20,
      friction: 0.005,
      bounce: 0.6,
      velocityX: 2,
      anguVel: 0.15,
      key: key
    });

    this.ground = new Ground({
      scene: this,
      x: 360,
      y: 400,
      key: "platform",
      isStatic: true,
      friction: 0.005,
      scaleX: 0.6,
      scaleY: 0.8,
      angle: 0
    })
    // this.groud1 = this.matter.add.image(400, 300, 'platform');
    // this.cameras.main.startFollow(this.groud1, true,0.05,0.05);
    let cat1 = this.matter.world.nextCategory();
    this.ball.setCollision(cat1);
    this.ground.setCollision(cat1);
    this.ball.setCollideW(cat1);
    this.area1 = this.add.image(75, 420, 'zone').setDisplaySize(150, 200).setInteractive();
    this.area2 = this.add.image(700, 420, 'zone').setDisplaySize(150, 200).setInteractive();
    this.area1.setAlpha(this.alpha);
    this.area2.setAlpha(this.alpha);

    this.zone1 = this.add.sprite(75, 420, "ball1").setDisplaySize(100, 100).setInteractive({ draggable: true });
    this.zone2 = this.add.sprite(700, 420, "ball1").setDisplaySize(100, 100).setInteractive({ draggable: true });
    this.zone1.setAlpha(0.1);
    this.zone2.setAlpha(0.1);
    let clone = this;
    this.zone1.on('drag', function (pointer, dragX, dragY) {
      // alert(1);
      if (dragY < clone.area1.y - 100) {
        this.y = clone.area1.y - 100;
      } else if (dragY > clone.area1.y + 100) {
        this.y = clone.area2.y + 100;
      } else {
        this.y = dragY;
      }
      // console.log(this.y);
    });
    this.zone2.on('drag', function (pointer, dragX, dragY) {
      if (dragY < clone.area2.y - 100) {
        this.y = clone.area2.y - 100;
      } else if (dragY > clone.area2.y + 100) {
        this.y = clone.area2.y + 100;
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
    let x, y, yc, diembd, kc,t,k1;
    y = 400;
    while(y>-1024){
      y-=100;
      if(y<0){
        t = Phaser.Math.Between(3,10);
      }else{
        t = Phaser.Math.Between(2,7);
      }
      kc = 734/(t+1);
      // console.log("kc " + kc);
      diembd = Phaser.Math.Between(0,30);
      
      k1 = (734-diembd)/(t);
      console.log("k1 " + k1);
      for(let i=0; i< t; i++){
        x=diembd + k1*i + Phaser.Math.Between(-diembd,diembd);
        yc = y + Phaser.Math.Between(-15,15);
        warn = new Warn({
          scene: this,
          x: x,
          y: yc,
          w: 70,
          h: 70,
          key: "warn",
          radius: 70,
          isStatic: true
        });
        this.warns.push(warn);
      }
    }
    // for (let i = 0; i < 5; i++) {
    //   for (let j = 0; j < 2; j++) {
    //     x = Phaser.Math.Between((i) * parseInt(this.w_cs) / 5 + 20, (i + 1) * parseInt(this.w_cs) / 5);
    //     y = Phaser.Math.Between((j) * parseInt(this.h_cs) / 5, (j + 1) * parseInt(this.h_cs) / 5 + 100);
        // warn = new Warn({
        //   scene: this,
        //   x: x,
        //   y: y,
        //   w: 70,
        //   h: 70,
        //   key: "warn",
        //   radius: 70,
        //   isStatic: true
        // });
        // this.warns.push(warn);
    //   }
    // }
    // for (let i = 0; i < 6; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     x = Phaser.Math.Between((i) * parseInt(this.w_cs) / 7 + 20, (i + 1) * parseInt(this.w_cs) / 7);
    //     y = Phaser.Math.Between((j) * parseInt(this.h_cs) / 5 - this.h_cs, (j + 1) * parseInt(this.h_cs) / 5 - this.h_cs + 200);
    //     warn = new Warn({
    //       scene: this,
    //       x: x,
    //       y: y,
    //       w: 70,
    //       h: 70,
    //       key: "warn",
    //       radius: 70,
    //       isStatic: true
    //     });
    //     this.warns.push(warn);
    //   }
    // }

    let gift;
    let type;
    for (let i = 0; i < 7; i++) {
      type = Phaser.Math.Between(0, 1);
      x = Phaser.Math.Between(20, 600);
      y = Phaser.Math.Between(10, 250);
      gift = new Gift({
        scene: this,
        x: x,
        y: y,
        type: type,
        key: type == 0 ? "gift5" : "gift10",
        radius: 20,
        isStatic: true
      });
      this.gifts.push(gift);
    }
    this.registry.set("warn", this.warns);
    console.log(this.registry.get("warn"));
    this.cursors = this.input.keyboard.createCursorKeys();
    this.area1.fixedToCamera = true;
    // this.area1.cameraOffset.setTo(200, 500);
    this.area2.fixedToCamera = true;
    this.zone1.fixedToCamera = true;
    this.zone2.fixedToCamera = true;
    this.area1.setScrollFactor(0);
    this.area2.setScrollFactor(0);
    this.zone1.setScrollFactor(0);
    this.zone2.setScrollFactor(0);
    this.scoreText.setScrollFactor(0);
  }
  openDie(): void {

  }
  onEvent ():void
  {
    this.scoreText.setText("Wait***" + --this.t);
    if(this.t == 0){
      this.t =5;
      this.scene.start("GameScene");
    }
  }
  update(time, delta): void {
    if (this.ball.getY() > this.ground.getY() + 70 || this.ground.getY() > this.scoreText.y) {
      this.zone1.y = this.area1.y;
      this.zone2.y = this.area2.y;
      this.ball.setDead();
      this.matter.pause();
      this.zone1.destroy();
      this.zone2.destroy();
      this.scoreText.setText("YOU LOST");
      this.timer = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this});
      // this.scene.start("GameScene");
    }
    if (this.zone1.y < this.area1.y && this.zone2.y < this.area2.y || this.cursors.up.isDown) {
      console.log("up");
      this.ground.setY(this.ground.getY() - 1);
      this.ball.setVelocityX(0);
    } else if (this.zone1.y > this.area1.y && this.zone2.y > this.area2.y) {
      this.ground.setY(this.ground.getY() + 1);
      this.ball.setVelocityX(0);
    } else {
      this.ground.setAngle(getAngle(this.zone1, this.zone2));
      if (this.ground.getAngle() > 0) {
        this.ball.setVelocityX(2);
      } else if (this.ground.getAngle() < 0) {
        this.ball.setVelocityX(-2);
      }
    }
    for (let i = 0; i < this.warns.length; i++) {
      if (this.ball.getY < this.ground.getY() + 70 || Phaser.Math.Distance.Between(this.warns[i].getX(), this.warns[i].getY(), this.ball.getX(), this.ball.getY()) <= 45) {
        this.zone1.y = this.area1.y;
        this.zone2.y = this.area2.y;
        this.ball.setDead();
        this.matter.pause();
        this.zone1.destroy();
        this.zone2.destroy();
        this.scoreText.setText("YOU LOST");
        this.scene.start("GameScene");

        break;
      }
    }
    for (let i = 0; i < this.gifts.length; i++) {
      if (Phaser.Math.Distance.Between(this.gifts[i].getX(), this.gifts[i].getY(), this.ball.getX(), this.ball.getY()) <= 35) {
        this.score += this.gifts[i].getPoitWithType();
        this.scoreText.setText("YOURS: " + this.score);
        this.gifts[i].setDestroy();
        this.gifts.splice(i, 1);
        break;
      }
    }
  }
}
function getAngle(obj1, obj2) {
  // angle in radians
  var angleRadians = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
  // angle in degrees
  var angleDeg = (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI);
  return angleDeg;
}