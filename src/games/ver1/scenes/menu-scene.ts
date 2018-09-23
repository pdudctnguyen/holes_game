import { AssetsMenu, customConfig } from '../const/config';
export class MenuScene extends Phaser.Scene {
  private holes;
  private btnPlayGame;
  private btnPlayWithFriends;
  private imgCup;
  private btnChooseSkin;
  private backgroundPopup;
  private btnClosePopup;
  private btnOKPopup;
  private msgBox;
  private listHighScore;
  private btnNext;
  private btnPrev;
  private itemSlideSkin;
  private itemSlideSkinNext;
  private itemSlideSkinPrev;
  private w_cs;
  private h_cs;
  private numSkin;
  constructor() {
    super({
      key: "MenuScene"
    });
    this.w_cs = window.innerWidth;
    this.h_cs = window.innerHeight;
    this.numSkin = 9;
    console.log(this.w_cs + " - " + this.h_cs);
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
      }
    }
  }
  init(): void {
    this.initRegistry();
  }
  setCenter(item): void {
    item.x -= (item.width / 2);
    item.y -= (item.height / 2);
  }
  create(): void {
    this.holes = this.add.text(customConfig.highScore.x, customConfig.highScore.y, customConfig.highScore.text, { fontSize: customConfig.highScore.fontSize, fill: customConfig.highScore.fill, align: customConfig.highScore.align });
    // this.imgCup = this.add.image(parseInt(this.w_cs) / 2 - 60 + this.holes.width / 2, 105, 'cup');
    this.imgCup = this.add.image(customConfig.cup.x, customConfig.cup.y, customConfig.cup.key);
    this.setCenter(this.holes);
    // this.setCenter(this.imgCup);
    this.listHighScore = this.add.group();
    let tmp_i;
    let text;
    for (let i = 0; i < 5; i++) {
      switch (i) {
        case 0: {
          tmp_i = "1st  ";
          break;
        }
        case 1: {
          tmp_i = "2nd ";
          break;
        }
        case 2: {
          tmp_i = "3rd  ";
          break;
        }
        default: {
          tmp_i = (i + 1) + "th  ";
          break;
        }
      }
      text = this.add.text(customConfig.listHighScore.x, customConfig.listHighScore.y + i * customConfig.listHighScore.marginTop, tmp_i + 'User ' + (i + 1) + ".............." + this.registry.get("highscore")[i], { font: customConfig.listHighScore.fontSize + " Arial", fill: customConfig.listHighScore.fill, backgroundColor: this.generateHexColor() })
      this.setCenter(text);
      this.listHighScore.add(text);
    }
    this.btnPlayWithFriends = this.add.image(customConfig.playWithFriends.x, customConfig.playWithFriends.y, customConfig.playWithFriends.key).setInteractive();
    this.btnChooseSkin = this.add.image(customConfig.btnChooseSkin.x, customConfig.btnChooseSkin.y, customConfig.btnChooseSkin.key).setInteractive();
    this.btnPlayGame = this.add.image(customConfig.btnChoosePlay.x, customConfig.btnChoosePlay.y, customConfig.btnChoosePlay.key).setInteractive();


    this.imgCup.setScale(1.8);
    this.btnPlayWithFriends.setScale(1.5);
    this.btnPlayGame.setScale(1.5);
    this.btnChooseSkin.setScale(1.5);
    //events
    this.btnPlayWithFriends.on("pointerdown", this.playWithFriends, this);
    this.btnChooseSkin.on("pointerdown", this.openPopupChooseSkin, this);

    //play game
    let tmp_this = this;
    this.btnPlayGame.on("pointerdown", function () {
      console.log(1);
      tmp_this.scene.start("GameScene");
    });
  }

  update(): void {
    if (this.itemSlideSkin) {
      this.itemSlideSkin.angle++;
    }
  }
  private initRegistry(): void {
    if (this.registry.get("skin")) {
      this.registry.set("skin", this.registry.get("skin"));
    } else {
      this.registry.set("skin", 1);
    }

    this.registry.set("highscore", [0, 0, 0, 0, 0]);
  }
  private playWithFriends(): void {
    alert("show popup friends list from IA API after");
  }
  private dragSlide(): void {
    let _this = this;
    this.tweens.add({
      targets: this.itemSlideSkin,
      x: customConfig.sliderSkin.item.x,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onStart: function () {
        _this.itemSlideSkin.setScale(1);
      },
      onComplete: function () {
        _this.itemSlideSkin.setScale(1.4);
      }
    });

    this.tweens.add({
      targets: this.itemSlideSkinPrev,
      x: customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
    });
    this.tweens.add({
      targets: this.itemSlideSkinNext,
      x: customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
    });
  }
  private openPopupChooseSkin(): void {
    let current = this.registry.get("skin");
    //make a group to hold all the elements
    this.msgBox = this.add.group();
    //load background Popup
    this.backgroundPopup = this.add.image(customConfig.sliderSkin.background.x, customConfig.sliderSkin.background.y, customConfig.sliderSkin.background.key);
    this.backgroundPopup.width = customConfig.sliderSkin.background.width;
    this.backgroundPopup.height = customConfig.sliderSkin.background.height;
    //load btn OK and close
    this.btnClosePopup = this.add.image(this.backgroundPopup.width - customConfig.sliderSkin.btnClose.paddingRight, customConfig.sliderSkin.btnClose.paddingTop, customConfig.sliderSkin.btnClose.key).setInteractive();

    //load btn next, prev, menu
    this.btnNext = this.add.image(customConfig.sliderSkin.btnNext.x, customConfig.sliderSkin.btnNext.y, customConfig.sliderSkin.btnNext.key).setInteractive();
    this.btnPrev = this.add.image(customConfig.sliderSkin.btnPrev.x, customConfig.sliderSkin.btnPrev.y, customConfig.sliderSkin.btnPrev.key).setInteractive();
    this.itemSlideSkin = this.add.sprite(customConfig.sliderSkin.item.x, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.itemSlideSkinNext = this.add.sprite(customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.itemSlideSkinPrev = this.add.sprite(customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.btnOKPopup = this.add.image(this.itemSlideSkin.x, this.backgroundPopup.height - customConfig.sliderSkin.btnOK.paddingBottom, customConfig.sliderSkin.btnOK.key).setInteractive();
    for (let i = 0; i <= this.numSkin; i++) {
      this.anims.create({
        key: '' + i,
        frames: [{ key: 'planets', frame: i }],
        frameRate: 10
      });
    }
    this.itemSlideSkin.anims.play('0', true);
    this.itemSlideSkin.anims.play('1', true);
    this.itemSlideSkin.setScale(1.5);
    this.itemSlideSkinNext.anims.play('2', true);
    this.itemSlideSkinNext.setAlpha(0.4);
    this.itemSlideSkinPrev.setAlpha(0.4);
    //add the elements to the group
    this.msgBox.add(this.backgroundPopup);
    this.msgBox.add(this.btnOKPopup);
    this.msgBox.add(this.btnClosePopup);
    let tmp = this;
    this.btnOKPopup.on("pointerdown", function () {
      tmp.backgroundPopup.destroy();
      tmp.btnOKPopup.destroy();
      tmp.btnClosePopup.destroy();
      tmp.btnNext.destroy();
      tmp.btnPrev.destroy();
      tmp.itemSlideSkin.destroy();
      tmp.itemSlideSkinPrev.destroy();
      tmp.itemSlideSkinNext.destroy();
      tmp.msgBox.destroy();
      tmp.registry.set("skin", current)
      console.log(tmp.registry.get("skin"));
    });
    this.btnClosePopup.on("pointerdown", function () {
      tmp.backgroundPopup.destroy();
      tmp.btnOKPopup.destroy();
      tmp.btnClosePopup.destroy();
      tmp.btnNext.destroy();
      tmp.btnPrev.destroy();
      tmp.itemSlideSkin.destroy();
      tmp.itemSlideSkinPrev.destroy();
      tmp.itemSlideSkinNext.destroy();
      tmp.msgBox.destroy();
      console.log(tmp.registry.get("skin"));
    });
    this.btnNext.on("pointerdown", function () {
      current++;
      if (current <= tmp.numSkin) {
        console.log(current - 1 + " - " + current + " - " + (current + 1));
        tmp.itemSlideSkin.anims.play('' + current, true);
        tmp.itemSlideSkinNext.anims.play('' + ((current + 1 > tmp.numSkin ? 0 : current + 1)), true);
        tmp.itemSlideSkinPrev.anims.play('' + ((current - 1)), true);
        tmp.itemSlideSkinNext.setAlpha(0.4);
        tmp.itemSlideSkinPrev.setAlpha(0.4);
        tmp.itemSlideSkin.x = customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.tweenX;
        tmp.itemSlideSkinPrev.x = customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding - customConfig.sliderSkin.item.tweenX;
        tmp.itemSlideSkinNext.x = customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding - customConfig.sliderSkin.item.tweenX;
        tmp.dragSlide();
      } else {
        current = tmp.registry.get("skin");
      }
    });
    this.btnPrev.on("pointerdown", function () {
      current--;
      if (current >= 0) {
        tmp.itemSlideSkin.anims.play('' + current, true);
        tmp.itemSlideSkinNext.anims.play('' + ((current + 1)), true);
        tmp.itemSlideSkinPrev.anims.play('' + ((current - 1 < 0 ? 3 : current - 1)), true);
        tmp.itemSlideSkinNext.setAlpha(0.4);
        tmp.itemSlideSkinPrev.setAlpha(0.4);
        tmp.itemSlideSkin.x = customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.tweenX;
        tmp.itemSlideSkinPrev.x = customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding + customConfig.sliderSkin.item.tweenX;
        tmp.itemSlideSkinNext.x = customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding + customConfig.sliderSkin.item.tweenX;
        tmp.dragSlide();
      } else {
        current = tmp.registry.get("skin");
      }
    });
  }
  private generateHexColor() {
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
  }
}