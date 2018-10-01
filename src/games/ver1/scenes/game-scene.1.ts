// import { Line } from '../objects/line';
import { Gift } from '../objects/gift';
import { Planet } from '../objects/planet';
import { Bar } from '../objects/bar';
import { AssetsMenu, customConfig } from '../const/config';
import { Holes } from "../objects/holes";
// import { Zone } from '../objects/zone';
// let AssetsMenu = AssetsMenu;
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
  private background2;
  private gameOver;
  private camera;
  private iconVolume;
  private iconVolumeMute;
  private btnVolume;
  private music;
  private playMusic;
  private btnReset;
  private iconReset;
  private backgroundPopupDie;
  private btnReplay;
  private textWhenDie;
  private textTime;
  private btnContinue;
  private groupDie;
  private cloneHoles;
  private cloneGifts;
  private cloneHolesXY;
  private cloneGiftXY;
  private allowTimeDown;
  private textScoreWhenDie;
  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.alpha = 0;
    this.score = 0;
    this.allowTimeDown = false;
    if (this.registry.get("score")) {
      this.score = this.registry.get("score");
    }
    this.angle1 = 0;
  }

  preload(): void {
    for (let i = 0; i < AssetsMenu.length; i++) {
      switch (AssetsMenu[i].type) {
        case 0: {
          this.load.image(AssetsMenu[i].key, AssetsMenu[i].url);
          break;
        }
        case 1: {
          this.load.spritesheet(AssetsMenu[i].key, AssetsMenu[i].url, { frameWidth: 128, frameHeight: 128 });
          break;
        }
        case 2: {
          this.load.audio(AssetsMenu[i].key, AssetsMenu[i].url, { frameWidth: 128, frameHeight: 128 });
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
  setMusic(): void {
    this.playMusic = this.playMusic ? false : true;
    if (this.playMusic) {
      this.music.play();
      this.iconVolumeMute.setAlpha(0);
      this.iconVolume.setAlpha(1);
    } else {
      this.music.stop();
      this.iconVolume.setAlpha(0);
      this.iconVolumeMute.setAlpha(1);
    }
  }
  resetGame(): void {
    this.scene.restart();
  }
  openPopupWhenDie(): void {
    let isContinue = true;
    if (this.registry.get("timesPlay") == false) {
      isContinue = false;
    }
    this.backgroundPopupDie = this.add.sprite(customConfig.backgroundPopupDie.x, customConfig.backgroundPopupDie.y, customConfig.backgroundPopupDie.key);
    this.setSize(this.backgroundPopupDie, customConfig.backgroundPopupDie.width);
    this.textScoreWhenDie = this.add.text(customConfig.backgroundPopupDie.x, customConfig.backgroundPopupDie.y, "YOURS: " + this.score, { fontSize: customConfig.backgroundPopupDie.fontSizeScore + "px", fill: customConfig.backgroundPopupDie.colorTime, fontWeight: '700' });
    this.setCenter(this.textScoreWhenDie);
    let y = this.backgroundPopupDie.y + this.backgroundPopupDie.height / 2 * this.backgroundPopupDie.scaleY;
    let width = 0.3 * this.backgroundPopupDie.width * this.backgroundPopupDie.scaleX;
    this.btnReplay = this.add.sprite(this.backgroundPopupDie.x, y, "buttonBlue").setInteractive();
    this.btnContinue = this.add.sprite(this.backgroundPopupDie.x, y, "buttonOrange").setInteractive();
    this.setSize(this.btnReplay, width);
    this.setSize(this.btnContinue, width);
    this.textWhenDie = this.add.text(this.backgroundPopupDie.x, y, "REPLAY", { fontSize: customConfig.backgroundPopupDie.fontSize + "px", fill: customConfig.backgroundPopupDie.color, fontWeight: '700' });
    this.setCenter(this.textWhenDie);
    if (isContinue) {
      this.btnContinue.setAlpha(1);
      this.btnReplay.setAlpha(0);
      this.textWhenDie.setText("CONTINUE")
      this.textTime = this.add.text(this.backgroundPopupDie.x,this.textWhenDie.y + this.textWhenDie.height/2 + 10, "5", { fontSize: customConfig.backgroundPopupDie.fontSizeTime + "px", fill: customConfig.backgroundPopupDie.colorTime, fontWeight: '700' });
      this.allowTimeDown = true;
      this.textWhenDie.x = this.backgroundPopupDie.x - this.textWhenDie.width / 2;
      this.countDown(5);
    
      // this.setCenter(this.textWhenDie);
    } else {
      this.btnContinue.setAlpha(0);
      this.btnReplay.setAlpha(1);
      this.textWhenDie.setText("REPLAY");
      this.textWhenDie.x = this.backgroundPopupDie.x - this.textWhenDie.width / 2;
    }
    this.btnReplay.on("pointerdown", this.replayGame, this);
    this.btnContinue.on("pointerdown", this.continueGame, this);
    this.backgroundPopupDie.setScrollFactor(0);
    this.btnContinue.setScrollFactor(0);
    this.btnReplay.setScrollFactor(0);
    this.textWhenDie.setScrollFactor(0);
    this.textScoreWhenDie.setScrollFactor(0);
    this.textTime.setScrollFactor(0);
   
    // tmp.btnReplay.depth=6;
  }
  continueGame(): void {
    if (window.confirm('watch ads')) {
      this.registry.set("score", this.score);
      this.registry.set("timesPlay", false);
      this.registry.set("listHoles", this.cloneHolesXY);
      this.registry.set("listGifts", this.cloneGiftXY);
      this.scene.restart();
    }
  }
  replayGame(): void {
    this.score = 0;
    this.registry.set("score", this.score);
    this.registry.set("timesPlay", false);
    this.scene.restart();
    this.registry.set("listHoles", []);

  }
  create(): void {
    this.btnVolume = this.add.image(customConfig.btnVolume.x, customConfig.btnVolume.y, customConfig.btnVolume.keyBackground).setInteractive();
    this.setSize(this.btnVolume, customConfig.btnVolume.width);
    this.iconVolume = this.add.image(customConfig.btnVolume.x, customConfig.btnVolume.y, customConfig.btnVolume.key).setInteractive();
    this.setSize(this.iconVolume, 0.8 * customConfig.btnVolume.width);
    this.iconVolumeMute = this.add.image(customConfig.btnVolume.x, customConfig.btnVolume.y, customConfig.btnVolumeMute.key).setInteractive();
    this.setSize(this.iconVolumeMute, 0.8 * customConfig.btnVolume.width);
    this.iconVolumeMute.setAlpha(0);
    this.btnReset = this.add.image(customConfig.btnHelp.x, customConfig.btnHelp.y, customConfig.btnHelp.keyBackground).setInteractive();
    this.setSize(this.btnReset, customConfig.btnHelp.width);
    this.iconReset = this.add.image(customConfig.btnHelp.x, customConfig.btnHelp.y, customConfig.btnHelp.key).setInteractive();
    this.setSize(this.iconReset, 0.8 * customConfig.btnHelp.width);
    this.btnReset.depth = 3;
    this.btnReset.setScrollFactor(0);
    this.btnVolume.depth = 3;
    this.btnVolume.setScrollFactor(0);
    this.iconReset.depth = 3;
    this.iconReset.setScrollFactor(0);
    this.iconVolume.depth = 3;
    this.iconVolume.setScrollFactor(0);
    this.iconVolumeMute.depth = 3;
    this.iconVolumeMute.setScrollFactor(0);
    this.music = this.sound.add('music');
    this.music.play();
    this.playMusic = !this.registry.get("music");
    this.setMusic();

    this.iconReset.on("pointerdown", this.resetGame, this);
    this.iconVolume.on("pointerdown", this.setMusic, this);
    this.iconVolumeMute.on("pointerdown", this.setMusic, this);
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
    // this.background2 = this.add.sprite(customConfig.width / 2, customConfig.height / 2, "background2");
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
    if (this.registry.get("score") > 0 && this.registry.get("listHoles").length > 0) {
      this.listHoles = this.registry.get("listHoles");
      this.listGifts = this.registry.get("listGifts")
      this.holes.applyChild(this.listHoles, this.listGifts);
      //console.log(this.listHolesRoot);
    } else {
      this.holes.createChildren(customConfig.hole.startY, customConfig.camera.bound[1]);
      this.cloneHoles = this.holes.getHolesRoot();
      this.cloneHolesXY = this.holes.getHoles();
      this.cloneGifts = this.holes.getGiftsRoot();
      this.cloneGiftXY = this.holes.getGifts();

    }
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
    this.setSize(this.backGroundScore, customConfig.playScore.width + 50);
    this.scoreText = this.add.text(customConfig.playScore.x, customConfig.playScore.yText, "SCORE: " + this.score, { fontSize: customConfig.playScore.fontSize + "px", fill: customConfig.playScore.color, fontWeight: '700' });
    this.setCenter(this.scoreText);
    this.gameOver = this.add.text(customConfig.width / 2, customConfig.height + 100, "GAME OVER\nSCORE: " + this.score, { fontSize: customConfig.playScore.fontSizeGO + "px", fill: customConfig.playScore.color, fontWeight: '700' });
    this.setCenter(this.gameOver);
    this.scoreText.setScrollFactor(0);
    this.backGroundScore.setScrollFactor(0);
  }
  openDie(): void {

  }
  setDead(itemx, itemy): void {
    if (this.registry.get("friendsScore")) {
      let tmp = this.registry.get("friendsScore");
      for (let t = 0; t < tmp.length; t++) {
        if (tmp[t].id == 1) {//id user
          if (this.score > tmp[t].score) {
            tmp[t].score = this.score;
          }
          tmp.sort((n1, n2) => n1.score < n2.score);
        }
      }
      this.registry.set("friendsScore", tmp);
    }
    if (this.registry.get("friendsScoreGlobal")) {
      let tmpGlobal = this.registry.get("friendsScoreGlobal");
      for (let t = 0; t < tmpGlobal.length; t++) {
        if (tmpGlobal[t].id == 1) {//id user
          if (this.score > tmpGlobal[t].score) {
            tmpGlobal[t].score = this.score;
          }
          tmpGlobal.sort((n1, n2) => n1.score < n2.score);
        }
      }
      this.registry.set("friendsScoreGlobal", tmpGlobal);
    }
    this.planet.setDead(this.scene, this.tweens, this.planet, itemx, itemy, this.gameOver, this.score, this);
  }
  countDown(i): void {
    if (this.allowTimeDown) {
      this.textTime.setText("" + i);
      this.textTime.x = this.backgroundPopupDie.x - this.textTime.width/2;
      let tmp = this;
      if (i > 0) {
        //console.log(11);
        window.setTimeout(function () {
          tmp.countDown(--i);
        }, 1000);
      } else {
        if (window.confirm('watch ads')) {
          tmp.continueGame();
          tmp.allowTimeDown = false;
        }
      }
    }


  }
  update(): void {
    let angletmp = this.bar.getAngle();
    if (this.cursors.left.isDown) {
      this.bar.setAngle(angletmp - 0.2);
      if (angletmp > 0) {
        this.planet.setVelocityX(2);
      } else if (angletmp < 0) {
        this.planet.setVelocityX(-2);
      } else {
        this.planet.setVelocityX(0);
      }
      return;
    } else if (this.cursors.right.isDown) {
      this.bar.setAngle(this.bar.getAngle() + 0.2);
      if (angletmp > 0) {
        this.planet.setVelocityX(5);
      } else if (angletmp < 0) {
        this.planet.setVelocityX(-5);
      } else {
        this.planet.setVelocityX(0);
      }
      return;
    }
    let [angle, direction] = getAngle(this.zone1.x, this.zone1.y, this.zone2.x, this.zone2.y, this.area1.y, this.area2.y, this.cursors);
    let allowHide = direction == "up" ? true : false;
    let allow = (direction == "up" || direction == "down") ? true : false;
    if (this.bar.setAngle(angle)) {
      this.planet.update(angle);
      if (angle > 0) {
        this.background1.x -= 0.5;
        this.background0.x -= 0.3;
        // this.background2.x -= 0.4;
      } else {
        this.background1.x += 0.5;
        this.background0.x += 0.3;
        // this.background2.x += 0.4;
      }
      allow = true;
    }
    this.score = this.bar.update(direction, this.score);
    if (this.bar.getY() <= customConfig.camera.bound[1] + customConfig.nextLevel) {
      let arrHoles;
      for (let t = 0; t < this.listHolesRoot.length; t++) {
        arrHoles = this.listHolesRoot[t];
        for (let i = 0; i < arrHoles.length; i++) {
          arrHoles[i].setDestroy();
        }
        this.listHolesRoot[t].splice(0, arrHoles.length);
      }
      let gift: Gift;
      for (let t = 0; t < this.listGiftsRoot.length; t++) {
        gift = this.listGiftsRoot[t];
        gift.setDestroy();
        this.listGiftsRoot.splice(t, 1);
      }
      this.holes.createChildren(customConfig.hole.startY, customConfig.camera.bound[1]);
      this.planet.setY(this.planet.getY() + 2 * customConfig.height - customConfig.nextLevel/3);
      this.bar.setY(this.bar.getY() + 2 * customConfig.height - customConfig.nextLevel/3);
      this.background0.x = customConfig.width / 2;
      this.background0.y = this.planet.getY() - customConfig.height / 2;
      this.background1.x = customConfig.width / 4;
      this.background1.y = this.bar.getY() - customConfig.height / 4;
    }
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
              this.scoreText.setText("YOU LOST");
              this.setDead(item.x, item.y);
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
    }
    if (this.planet.getY() > this.bar.getY() + customConfig.planet.limitDown) {
      this.setDead(-1, -1);
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
