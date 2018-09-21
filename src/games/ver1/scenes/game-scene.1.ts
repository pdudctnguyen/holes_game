// import { Line } from '../objects/line';
import { Ball } from '../objects/ball';
import { Warn } from '../objects/warn';
import { Gift } from '../objects/gift';
import { Player } from '../objects/player';
import { Ground } from '../objects/ground';
import { AssetsMain } from '../const/config';
let listAsset = AssetsMain;
export class GameScene extends Phaser.Scene {
  // private line1: Line;
  private player: Ball;
  private warns;
  private listWarns;
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
    this.w_cs = window.innerWidth;
    this.h_cs = window.innerHeight;
    this.t = 5;
  }

  init(): void {
    this.warns = [];
    this.gifts = [];
    this.listWarns = [];
    this.alpha = 0;
    this.score = 0;
  }

  preload(): void {
    for (let i = 0; i < listAsset.length; i++) {
      switch (listAsset[i].type) {
        case 0: {
          this.load.image(listAsset[i].key, listAsset[i].url);
          break;
        }
        case 1: {
          this.load.spritesheet(listAsset[i].key, listAsset[i].url, { frameWidth: 128, frameHeight: 128 });
          break;
        }
      }
    }
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
    this.scoreText = this.add.text(300, 480, "YOURS: " + this.score, { fontSize: '50px', fill: 'red', fontWeight: '700' });
    this.input.addPointer();
    this.input.addPointer();
    this.ball = new Player({
      scene: this,
      x: parseInt(this.w_cs) / 2,
      y: 380,
      w: 50,
      h: 50,
      radius: 20,
      friction: 0.005,
      bounce: 0.6,
      velocityX: 2,
      anguVel: 0.15,
      skin:this.registry.get("skin"),
      key: key
    });

    this.ground = new Ground({
      scene: this,
      x: parseInt(this.w_cs) / 2,
      y: 470,
      key: "platform",
      isStatic: true,
      friction: 0.005,
      scaleX: 1,
      scaleY:1,
      angle: 0
    })
    
    let cat1 = this.matter.world.nextCategory();
    this.ball.setCollision(cat1);
    this.ground.setCollision(cat1);
    this.ball.setCollideW(cat1);
    this.area1 = this.add.image(75, 420, 'zone').setDisplaySize(300, 200).setInteractive();
    this.area2 = this.add.image(700, 420, 'zone').setDisplaySize(300, 200).setInteractive();
    this.area1.setAlpha(this.alpha);
    this.area2.setAlpha(this.alpha);

    this.zone1 = this.add.sprite(75, 420, "area").setDisplaySize(400, 200).setInteractive({ draggable: true });
    this.zone2 = this.add.sprite(700, 420, "area").setDisplaySize(400, 200).setInteractive({ draggable: true });
    this.zone1.setAlpha(0.01);
    this.zone2.setAlpha(0.01);
    let clone = this;
    this.zone1.on('drag', function (pointer, dragX, dragY) {
      if (dragY < clone.area1.y - 100) {
        this.y = clone.area1.y - 100;
      } else if (dragY > clone.area1.y + 100) {
        this.y = clone.area2.y + 100;
      } else {
        this.y = dragY;
      }
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
    let x, y, yc, diembd, kc, t, k1;
    let current = -1;
    this.listWarns = [];
    y = 400;
    t = this.w_cs / 75 + 1;
    while (y > -1024) {
      current++;
      y -= 80;
      kc = this.w_cs / (t + 1);
      // console.log("kc " + kc);
      diembd = Phaser.Math.Between(0, 30);
      k1 = (this.w_cs - diembd) / (t);
      this.warns = [];
      for (let i = 0; i < t; i++) {
        x = diembd + k1 * i + Phaser.Math.Between(-20, 20);
        yc = y + Phaser.Math.Between(-30, 30);
        if (this.checkWarn(x, yc, current)) {
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
      if (this.warns.length > 0) {
        this.listWarns.push(this.warns);
      }
      // break;
      if (current % 4 == 0) {
        let gift;
        let type;
        let xGift;
        let yGift;
        let numItem;
        numItem = current / 4 > 3 ? 4 : 2;
        for (let idx = 0; idx < Phaser.Math.Between(1, numItem); idx++) {
          type = Phaser.Math.Between(0, 1);
          xGift = Phaser.Math.Between(0, this.w_cs);
          yGift = Phaser.Math.Between(y - 150, y + 10);
          console.log("xxx " + xGift + " - " + yGift);
          gift = new Gift({
            scene: this,
            x: xGift,
            y: yGift,
            type: type,
            key: type == 0 ? "gift5" : "gift10",
            radius: 20,
            isStatic: true
          });
          this.gifts.push(gift);
        }
      }
    }
    console.log(this.listWarns);
    let nextLevel = 5;
    let numLeft;
    let numRight;
    let NumCenter;
    let rand;
    for (let k = 0; k < this.listWarns.length; k++) {
      if (k > 4) {
        numLeft = Phaser.Math.Between(0, 2);
        numRight = Phaser.Math.Between(0, 2);
      } else {
        numLeft = Phaser.Math.Between(1, 2);
        numRight = Phaser.Math.Between(4 - k, 2);
        NumCenter = Phaser.Math.Between(1, 2);
        this.hideWarn(k, "E", NumCenter);
      }
      rand = Phaser.Math.Between(0, 2);
      switch (rand) {
        case 0: {
          this.hideWarn(k, "L", numLeft);
          break;
        }
        case 1: {
          this.hideWarn(k, "R", numRight);
          break;
        }
        case 2: {
          this.hideWarn(k, "L", numLeft);
          this.hideWarn(k, "R", numRight);
          break;
        }
      }

    }
    console.log(this.gifts);
    this.registry.set("warn", this.warns);
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
  checkWarn(x, y, current): boolean {
    let arr;
    let start = 0;
    let end = this.listWarns.length;
    if (current - 1 >= 0) {
      start = current - 1;
    }
    if (current + 1 < this.listWarns.length) {
      end = current + 1;
    }
    for (let t = start; t < end; t++) {
      arr = this.listWarns[t];
      for (let k = 0; k < arr.length; k++) {
        // console.log("kc tu (" + x + ", " + y + ") den (" + arr[k].getX() + ", " + arr[k].getY() + ") = " + Phaser.Math.Distance.Between(x, y, arr[k].getX(), arr[k].getY()));
        if (Phaser.Math.Distance.Between(x, y, arr[k].getX(), arr[k].getY()) < 75) {
          return false;
        }
      }
    }
    return true;
  }
  hideWarn(index, posLER, num): void {
    // console.log("this.listWarns[index]");
    let vtDel;
    let len = this.listWarns[index].length;
    switch (posLER) {
      case "L": {
        vtDel = 0;
        break;
      }
      case "E": {
        let tmp = len / 2 - 1;
        vtDel = parseInt(tmp + "");
        break;
      }
      case "R": {
        vtDel = len - 1 - num;
      }
    }
    if (vtDel + num < len) {
      len = vtDel + num;
    }
    // console.log("disable tu " + vtDel + " den " + len);
    for (let ind = vtDel; ind <= len; ind++) {
      if (this.listWarns[index][ind]) {
        this.listWarns[index][ind].setDestroy();
      }
    }
    // console.log("xoa tu " + vtDel + " " + num + " phan tu ");
    this.listWarns[index].splice(vtDel, num);
  }
  onEvent(): void {
    this.scoreText.setText("Wait***" + --this.t);
    if (this.t == 0) {
      this.t = 5;
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
      // this.timer = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this });
      this.scene.start("GameScene");
    }
    let allow = false;
    let allowHide = false;
    if (this.zone1.y < this.area1.y && this.zone2.y < this.area2.y || this.cursors.up.isDown) {
      console.log("up");
      this.ground.setY(this.ground.getY() - 1);
      this.ball.setVelocityX(0);
      allow = true;
      allowHide = true;
    } else if (this.zone1.y > this.area1.y && this.zone2.y > this.area2.y) {
      this.ground.setY(this.ground.getY() + 1);
      this.ball.setVelocityX(0);
      allow = true;
    } else {
      this.ground.setAngle(getAngle(this.zone1, this.zone2));
      if (this.ground.getAngle() > 0) {
        this.ball.setVelocityX(2);
        allow = true;
      } else if (this.ground.getAngle() < 0) {
        this.ball.setVelocityX(-2);
        allow = true;
      }

    }
    if (allow) {
      let arrWarn;
      let item: Warn;
      for (let t = 0; t < this.listWarns.length; t++) {
        arrWarn = this.listWarns[t];
        if (arrWarn.length > 0) {
          // console.log("check " + t);
          // console.log(arrWarn);
          for (let i = 0; i < arrWarn.length; i++) {
            item = arrWarn[i];
            // console.log("xxxx " + item.getX());
            if (Phaser.Math.Distance.Between(item.getX(), item.getY(), this.ball.getX(), this.ball.getY()) <= 45 && item.getActive()) {
              this.zone1.y = this.area1.y;
              this.zone2.y = this.area2.y;
              this.ball.setDead();
              this.matter.pause();
              this.zone1.destroy();
              this.zone2.destroy();
              this.scoreText.setText("YOU LOST");
              this.scene.start("GameScene");
              // this.timer = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this });
              break;
            }
          }
          if (allowHide) {
            if (arrWarn[0].getY() > this.ball.getY() + 150) {
              for (let i = 0; i < arrWarn.length; i++) {
                arrWarn[i].setDestroy();
              }
              this.listWarns[t].splice(0, arrWarn.length);
            }
            let gf: Gift;
            for (let k = 0; k < this.gifts.length; k++) {
              gf = this.gifts[k];
              if (gf.getY() > this.ball.getY() + 50) {
                gf.setDestroy();
              }
            }
          }

        }
      }

      for (let i = 0; i < this.gifts.length; i++) {
        if (Phaser.Math.Distance.Between(this.gifts[i].getX(), this.gifts[i].getY(), this.ball.getX(), this.ball.getY()) <= 45) {
          this.score += this.gifts[i].getPoitWithType();
          this.scoreText.setText("YOURS: " + this.score);
          this.gifts[i].setDestroy();
          this.gifts.splice(i, 1);
          break;
        }
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
