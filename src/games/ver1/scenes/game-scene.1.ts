// import { Line } from '../objects/line';
import { Hole } from '../objects/hole';
import { Gift } from '../objects/gift';
import { Planet } from '../objects/planet';
import { Bar } from '../objects/bar';
import { AssetsMain, customConfig } from '../const/config';
import { Holes } from "../objects/holes";
import { Zone } from '../objects/zone';
let listAsset = AssetsMain;
export class GameScene extends Phaser.Scene {
  private holes: Holes;
  private cursors;
  private planet: Planet;
  private bar: Bar;
  private zone1;
  private zone2;
  private area1;
  private area2;
  private alpha;
  private score;
  private angle1;
  private scoreText;
  private backGroundScore;
  private listHoles;
  private listHolesRoot;
  private listGifts;
  private listGiftsRoot;
  private background0;
  private background1;
  private gameOver;
  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.alpha = 0;
    this.score = 0;
    this.angle1 = 0;
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
        case 2: {
          this.load.audio(AssetsMain[i].key, AssetsMain[i].url, { frameWidth: 128, frameHeight: 128 });
          break;
        }
      }
    }
  }
  setCenter(item): void {
    item.x -= (item.width / 2);
    item.y -= (item.height / 2);
  }
  setSize(item, width): void {
    let scalex = width / item.width;
    item.setScale(scalex);
  }
  create(): void {
    let key = "";
    if (this.registry.get("skin") == "1") {
      key = "ball1";
    } else {
      key = "ball"
    }
    this.cameras.main.setBounds(customConfig.camera.bound[0], customConfig.camera.bound[1], customConfig.camera.bound[2], customConfig.camera.bound[3]);
    this.matter.world.setBounds(customConfig.matter.bound[0], customConfig.matter.bound[1], customConfig.matter.bound[2], customConfig.matter.bound[3]);
    this.background0 = this.add.sprite(customConfig.width / 4, customConfig.height / 4, "background0");
    this.background1 = this.add.sprite(customConfig.width / 2, customConfig.height / 2, "background1");
    this.input.addPointer();
    this.input.addPointer();
    this.planet = new Planet({
      scene: this,
      x: customConfig.planet.startX,
      y: customConfig.planet.startY,
      w: customConfig.planet.radius,
      h: customConfig.planet.radius,
      radius: customConfig.planet.radius,
      friction: customConfig.planet.friction,
      bounce: customConfig.planet.bounce,
      velocityX: customConfig.planet.velocityX,
      anguVel: customConfig.planet.anguVel,
      skin: this.registry.get("skin"),
      key: key
    });

    this.bar = new Bar({
      scene: this,
      x: customConfig.bar.x,
      y: customConfig.bar.startY,
      key: customConfig.bar.key,
      isStatic: customConfig.bar.isStatic,
      friction: customConfig.bar.friction,
      angle: customConfig.bar.angle
    })

    let cat1 = this.matter.world.nextCategory();
    this.planet.setCollision(cat1);
    this.bar.setCollision(cat1);
    this.planet.setCollideW(cat1);
    this.area1 = this.add.image(customConfig.areaTouch.x1, customConfig.areaTouch.y, customConfig.areaTouch.keyArea).setDisplaySize(customConfig.areaTouch.width, customConfig.areaTouch.height).setInteractive();
    this.area2 = this.add.image(customConfig.areaTouch.x2, customConfig.areaTouch.y, customConfig.areaTouch.keyArea).setDisplaySize(customConfig.areaTouch.width, customConfig.areaTouch.height).setInteractive();
    this.area1.setAlpha(this.alpha);
    this.area2.setAlpha(this.alpha);

    this.zone1 = this.add.sprite(customConfig.areaTouch.x1, customConfig.areaTouch.y, customConfig.areaTouch.keyArea).setDisplaySize(customConfig.areaTouch.width, customConfig.areaTouch.height).setInteractive({ draggable: true });
    this.zone2 = this.add.sprite(customConfig.areaTouch.x2, customConfig.areaTouch.y, customConfig.areaTouch.keyArea).setDisplaySize(customConfig.areaTouch.width, customConfig.areaTouch.height).setInteractive({ draggable: true });
    this.zone1.setAlpha(0.01);
    this.zone2.setAlpha(0.01);
    let clone = this;
    this.zone1.on('drag', function (pointer, dragX, dragY) {
      if (dragY < clone.area1.y - customConfig.areaTouch.limit) {
        this.y = clone.area1.y - customConfig.areaTouch.limit;
      } else if (dragY > clone.area1.y + customConfig.areaTouch.limit) {
        this.y = clone.area2.y + customConfig.areaTouch.limit;
      } else {
        this.y = dragY;
      }
    });
    this.zone2.on('drag', function (pointer, dragX, dragY) {
      if (dragY < clone.area2.y - customConfig.areaTouch.limit) {
        this.y = clone.area2.y - customConfig.areaTouch.limit;
      } else if (dragY > clone.area2.y + customConfig.areaTouch.limit) {
        this.y = clone.area2.y + customConfig.areaTouch.limit;
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
    this.holes = new Holes({
      scene: this
    });
    this.holes.createChildren();
    this.listHoles = this.holes.getHoles();
    this.listHolesRoot = this.holes.getHolesRoot();
    this.listGifts = this.holes.getGifts();
    this.listGiftsRoot = this.holes.getGiftsRoot();
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

    this.backGroundScore = this.add.image(customConfig.playScore.x, customConfig.playScore.y, customConfig.playScore.keyBackground);
    this.setSize(this.backGroundScore, customConfig.playScore.width);
    this.scoreText = this.add.text(customConfig.playScore.x, customConfig.playScore.yText, "SCORE: " + this.score, { fontSize: customConfig.playScore.fontSize + "px", fill: customConfig.playScore.color, fontWeight: '700' });
    this.setCenter(this.scoreText);
    this.gameOver = this.add.text(customConfig.width/2, customConfig.height + 100, "GAME OVER\n" + this.scoreText.text, { fontSize: customConfig.playScore.fontSizeGO + "px", fill: customConfig.playScore.color, fontWeight: '700' });
    this.setCenter(this.gameOver);
    this.scoreText.setScrollFactor(0);

  }
  openDie(): void {

  }
  update(time, delta): void {
    let [angle, direction] = getAngle(this.zone1.x, this.zone1.y, this.zone2.x, this.zone2.y, this.area1.y, this.area2.y, this.cursors);
    let allowHide = direction == "up" ? true : false;
    let allow = (direction == "up" || direction == "down") ? true : false;
    if (this.bar.setAngle(angle)) {
      this.planet.update(angle);
      if (angle > 0) {
        this.background1.x -= 0.5;
        this.background0.x -= 0.3;
      }else{
        this.background1.x += 0.5;
        this.background0.x += 0.3;
      }
      allow = true;
    }
    this.score = this.bar.update(direction,this.score);
    this.scoreText.setText("yours: " + this.score);
    if (allow) {
      let arrHoles;
      let item;
      for (let t = 0; t < this.listHoles.length; t++) {
        arrHoles = this.listHoles[t];
        if (arrHoles.length > 0) {
          for (let i = 0; i < arrHoles.length; i++) {
            item = arrHoles[i];
            if (Phaser.Math.Distance.Between(item.x, item.y, this.planet.getX(), this.planet.getY()) <= customConfig.collider.ballWithHoles && item.isActive) {
              this.zone1.y = this.area1.y;
              this.zone2.y = this.area2.y;
              this.matter.pause();
              this.zone1.destroy();
              this.zone2.destroy();
              this.scoreText.setText("YOU LOST");
              this.planet.setDead(this.scene, this.tweens, this.planet, item.x, item.y,this.gameOver);

              break;
            }
          }
          if (allowHide) {
            if (this.background1) {
              this.background1.y += 0.3;
              this.background0.y += 0.15;
            }
            if (arrHoles[0].y > this.planet.getY() + customConfig.bar.upToHide) {
              let listRoot = this.listHolesRoot[t];
              for (let i = 0; i < listRoot.length; i++) {
                listRoot[i].setDestroy();
              }
              this.listHoles[t].splice(0, arrHoles.length);
              this.listHolesRoot[t].splice(0, listRoot.length);
            }
            let gf, gift: Gift;
            for (let k = 0; k < this.listGifts.length; k++) {
              gf = this.listGifts[k];
              if (gf.y > this.planet.getY() + customConfig.bar.upToHide) {
                gift = this.listGiftsRoot[k];
                gift.setDestroy();
                this.listGifts.splice(k, 1);
                this.listGiftsRoot.splice(k, 1);
              }
            }
          }
        }
      }
      for (let i = 0; i < this.listGifts.length; i++) {
        if (Phaser.Math.Distance.Between(this.listGifts[i].x, this.listGifts[i].y, this.planet.getX(), this.planet.getY()) <= customConfig.collider.ballWithHoles) {
          this.score += this.listGiftsRoot[i].getPoitWithType();
          this.scoreText.setText("YOURS: " + this.score);
          this.listGiftsRoot[i].setDestroy();
          this.listGifts.splice(i, 1);
          this.listGiftsRoot.splice(i, 1);
          break;
        }
      }
      if (this.planet.getY() > this.bar.getY() + customConfig.planet.limitDown || this.bar.getY() > customConfig.height - customConfig.bar.limitDown) {
        this.zone1.y = this.area1.y;
        this.zone2.y = this.area2.y;
        this.planet.setPause();
        this.matter.pause();
        this.zone1.destroy();
        this.zone2.destroy();
        this.scoreText.setText("YOU LOST");
        this.scene.start("GameScene");
      }
    }

  }
}
function getAngle(zone1x, zone1y, zone2x, zone2y, area1y, area2y, cursor) {
  // angle in degrees
  let angleDeg = (Math.atan2(zone2y - zone1y, zone2x - zone1x) * 180 / Math.PI);
  let direction = "turn";
  if (zone1y < area1y && zone2y < area2y || cursor.up.isDown) {
    direction = "up";
  } else if (zone1y > area1y && zone2y > area2y) {
    direction = "down";
  }
  return [angleDeg, direction];
}
