let touchY, touchY2, touchX, isUp;
import { AssetsMenu, customConfig } from '../const/config';
export class MenuScene extends Phaser.Scene {
  private menuLeft;
  private btnVolume;
  private music;
  private playMusic;
  private iconVolume;
  private iconVolumeMute;
  private btnHelp;
  private iconHelp;
  private titleGame;
  private imgCup;
  private btnfriendsScore;
  private iconfriendsScore;
  private textIconFriendsScore;
  private textFriendsScore;
  private btnGlobalScore;
  private iconGlobalScore;
  private textIconGlobalScore;
  private textGlobalScore;
  private myScore;
  private myProfile;
  private iconMyRank;
  private textMyRank;
  private textMyScore;
  private textMyName;
  private itemScore;
  private itemProfile;
  private iconItemRank;
  private textItemRank;
  private textItemScore;
  private textItemName;
  private buttonItemFight;
  private iconItemFight;
  private groupItemScore;
  private itemListScore;
  private btnPlayWithFriends;
  private textPlayWithFriends;
  private btnIconPlayWithFriends;
  private iconPlayWithFriends;
  private btnChooseSkin;
  private iconChooseSkin;
  private textChooseSkin;
  private btnPlayGame;
  private textPlayGame;
  private backgroundPopup;
  private btnClosePopup;
  private iconClosePopup;
  private btnOKPopup;
  private msgBox;
  private listHighScore;
  private btnNext;
  private btnPrev;
  private itemSlideSkin;
  private itemSlideSkinNext;
  private itemSlideSkinNextTmp;
  private itemSlideSkinPrev;
  private itemSlideSkinPrevTmp;
  private groupItemSlide;
  private numSkin;
  constructor() {
    super({
      key: "MenuScene"
    });
    this.numSkin = 9;
    this.itemListScore = [];
    this.playMusic = true;
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
  init(): void {
    this.initRegistry();
  }
  setCenter(item): void {
    item.x -= (item.width / 2);
    item.y -= (item.height / 2);
  }
  setSize(item, width, height): void {
    let scalex = width / item.width;
    item.setScale(scalex);
  }
  create(): void {
    for (let i = 0; i <= this.numSkin; i++) {
      this.anims.create({
        key: '' + i,
        frames: [{ key: 'planets', frame: i }],
        frameRate: 10
      });
    }
    this.input.addPointer();
    this.input.on('pointerdown', function (pointer) {
      touchY = pointer.y;
      touchX = pointer.x;
    });
    this.input.on('pointermove', function (pointer) {
      touchY2 = pointer.y;
    });
    let __this = this;
    this.input.on('pointerup', function (pointer) {
      if (touchY2 == touchY || touchX <= __this.myScore.x - __this.myScore.width * __this.myScore._scaleX / 2 || touchX >= __this.myScore.x + __this.myScore.width * __this.myScore._scaleX / 2 || touchY <= __this.myScore.y + __this.myScore.height * __this.myScore._scaleX / 2 || touchY >= __this.btnPlayWithFriends.y - __this.btnPlayWithFriends.height * __this.btnPlayWithFriends._scaleX / 2) {
        return;
      } else if (touchY2 < touchY - 15) {
        isUp = true;
        let allow = true;
        __this.itemListScore[__this.itemListScore.length - 1].children.each(function (enemy) {
          if (enemy.y < customConfig.itemScore.y + 3 * customConfig.itemScore.marginTop) {
            allow = false;
            return;
          }
        })
        console.log(allow);
        if (allow) {
          for (let i = 0; i < __this.itemListScore.length; i++) {

            __this.itemListScore[i].children.each(function (enemy) {

              __this.tweens.add({
                targets: enemy,
                y: enemy.y - 3.1*customConfig.itemScore.marginTop,
                duration: 500,
                ease: 'Power2',
                onUpdate: function () {
                  if (enemy.y <= __this.myScore.y || enemy.y >= __this.btnPlayWithFriends.y) {
                    enemy.setAlpha(0);
                  } else {
                    enemy.setAlpha(1);
                  }
                }
              });
            }, __this);
          }
        }

      } else if (touchY2 > touchY + 15) {
        isUp = false;
        let allow = true;
        __this.itemListScore[0].children.each(function (enemy) {
          if (enemy.y == customConfig.itemScore.y) {
            allow = false;
            return;
          }
        });
        console.log(allow);
        if (allow) {
          for (let i = 0; i < __this.itemListScore.length; i++) {
            __this.itemListScore[i].children.each(function (enemy) {
              __this.tweens.add({
                targets: enemy,
                y: enemy.y + 3*customConfig.itemScore.marginTop,
                duration: 500,
                ease: 'Power2',
                onUpdate: function () {
                  if (enemy.y <= __this.myScore.y || enemy.y >= __this.btnPlayWithFriends.y) {
                    enemy.setAlpha(0);
                  } else {
                    enemy.setAlpha(1);
                  }
                }
              });
            }, __this);
          }
        }

      }
    });
    this.music = this.sound.add('music');
    this.music.play();
    for (let i = 0; i < 40; i++) {
      this.itemScore = this.add.image(customConfig.itemScore.x, customConfig.itemScore.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.key);
      this.setSize(this.itemScore, customConfig.itemScore.width, customConfig.itemScore.height);
      this.iconItemRank = this.add.image(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.iconMyRank.key + (i + 1 <= 3 ? ((i + 1) + "") : ""));
      this.setSize(this.iconItemRank, customConfig.itemScore.iconMyRank.width, customConfig.itemScore.iconMyRank.height);
      this.textItemRank = this.add.text(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y + i * customConfig.itemScore.iconMyRank.marginTop, ("" + (i + 1)), { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemRank);
      this.itemProfile = this.add.image(customConfig.itemScore.profile.x, customConfig.itemScore.profile.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.profile.key);
      this.setSize(this.itemProfile, customConfig.itemScore.profile.width, customConfig.itemScore.profile.height);
      this.textItemName = this.add.text(customConfig.itemScore.profile.name.x, customConfig.itemScore.profile.name.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.profile.name.text, { fontSize: customConfig.itemScore.profile.name.fontSize, fill: customConfig.itemScore.profile.name.colorText, fontFamily: customConfig.itemScore.profile.name.fontFamily });
      this.setCenter(this.textItemName);
      this.textItemScore = this.add.text(customConfig.itemScore.textMyScore.x, customConfig.itemScore.textMyScore.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.textMyScore.score, { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemScore);
      this.buttonItemFight = this.add.image(customConfig.itemScore.buttonItemFight.x, customConfig.itemScore.buttonItemFight.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.buttonItemFight.keyBackground);
      this.setSize(this.buttonItemFight, customConfig.itemScore.buttonItemFight.width, customConfig.itemScore.buttonItemFight.height);
      this.iconItemFight = this.add.image(customConfig.itemScore.buttonItemFight.icon.x, customConfig.itemScore.buttonItemFight.icon.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.buttonItemFight.icon.key);
      this.setSize(this.iconItemFight, customConfig.itemScore.buttonItemFight.icon.width, customConfig.itemScore.buttonItemFight.icon.height);
      this.groupItemScore = this.add.group();
      this.groupItemScore.add(this.itemScore);
      this.groupItemScore.add(this.iconItemRank);
      this.groupItemScore.add(this.textItemRank);
      this.groupItemScore.add(this.itemProfile);
      this.groupItemScore.add(this.textItemName);
      this.groupItemScore.add(this.textItemScore);
      this.groupItemScore.add(this.buttonItemFight);
      this.groupItemScore.add(this.iconItemFight);
      this.itemListScore.push(this.groupItemScore);
    }

    this.titleGame = this.add.image(customConfig.imgTitle.x, customConfig.imgTitle.y, customConfig.imgTitle.key);
    this.setSize(this.titleGame, customConfig.imgTitle.width, customConfig.imgTitle.height);

    this.imgCup = this.add.image(customConfig.cup.x, customConfig.cup.y, customConfig.cup.key);
    this.setSize(this.imgCup, customConfig.cup.width, customConfig.cup.height);

    this.btnfriendsScore = this.add.image(customConfig.btnfriendsScore.x, customConfig.btnfriendsScore.y, customConfig.btnfriendsScore.keyBackground);
    this.setSize(this.btnfriendsScore, customConfig.btnfriendsScore.width, customConfig.btnfriendsScore.height);
    this.iconfriendsScore = this.add.image(customConfig.btnfriendsScore.xIcon, customConfig.btnfriendsScore.yIcon, customConfig.btnfriendsScore.key);
    this.setSize(this.iconfriendsScore, customConfig.btnfriendsScore.widthIcon, customConfig.btnfriendsScore.heightIcon);
    this.textIconFriendsScore = this.add.text(customConfig.btnfriendsScore.xTextIcon, customConfig.btnfriendsScore.yTextIcon, customConfig.btnfriendsScore.textIcon, { fontSize: customConfig.btnfriendsScore.fontSizeIcon, fill: customConfig.btnfriendsScore.colorText, fontFamily: customConfig.btnfriendsScore.fontFamily });
    this.setCenter(this.textIconFriendsScore);
    this.textFriendsScore = this.add.text(customConfig.btnfriendsScore.xText, customConfig.btnfriendsScore.yText, customConfig.btnfriendsScore.textContent, { fontSize: customConfig.btnfriendsScore.fontSize, fill: customConfig.btnfriendsScore.colorText, fontFamily: customConfig.btnfriendsScore.fontFamily });
    this.setCenter(this.textFriendsScore);

    this.btnGlobalScore = this.add.image(customConfig.btnGlobalScore.x, customConfig.btnGlobalScore.y, customConfig.btnGlobalScore.keyBackground);
    this.setSize(this.btnGlobalScore, customConfig.btnGlobalScore.width, customConfig.btnGlobalScore.height);
    this.iconGlobalScore = this.add.image(customConfig.btnGlobalScore.xIcon, customConfig.btnGlobalScore.yIcon, customConfig.btnGlobalScore.key);
    this.setSize(this.iconGlobalScore, customConfig.btnGlobalScore.widthIcon, customConfig.btnGlobalScore.heightIcon);
    this.textIconGlobalScore = this.add.text(customConfig.btnGlobalScore.xTextIcon, customConfig.btnGlobalScore.yTextIcon, customConfig.btnGlobalScore.textIcon, { fontSize: customConfig.btnGlobalScore.fontSizeIcon, fill: customConfig.btnGlobalScore.colorText, fontFamily: customConfig.btnGlobalScore.fontFamily });
    this.setCenter(this.textIconGlobalScore);
    this.textGlobalScore = this.add.text(customConfig.btnGlobalScore.xText, customConfig.btnGlobalScore.yText, customConfig.btnGlobalScore.textContent, { fontSize: customConfig.btnGlobalScore.fontSize, fill: customConfig.btnGlobalScore.colorText, fontFamily: customConfig.btnGlobalScore.fontFamily });
    this.setCenter(this.textGlobalScore);

    this.myScore = this.add.image(customConfig.myScore.x, customConfig.myScore.y, customConfig.myScore.keyBackground);
    this.setSize(this.myScore, customConfig.myScore.width, customConfig.myScore.height);
    this.iconMyRank = this.add.image(customConfig.myScore.iconMyRank.x, customConfig.myScore.iconMyRank.y, customConfig.myScore.iconMyRank.key + (customConfig.myScore.textMyScore.rank <= 3 ? customConfig.myScore.textMyScore.rank + "" : ""));
    this.setSize(this.iconMyRank, customConfig.myScore.iconMyRank.width, customConfig.myScore.iconMyRank.height);
    this.textMyRank = this.add.text(customConfig.myScore.iconMyRank.x, customConfig.myScore.iconMyRank.y, customConfig.myScore.iconMyRank.score, { fontSize: customConfig.myScore.iconMyRank.fontSize, fill: customConfig.myScore.iconMyRank.colorText, fontFamily: customConfig.myScore.iconMyRank.fontFamily });
    this.setCenter(this.textMyRank);
    this.myProfile = this.add.image(customConfig.myScore.profile.x, customConfig.myScore.profile.y, customConfig.myScore.profile.key);
    this.setSize(this.myProfile, customConfig.myScore.profile.width, customConfig.myScore.profile.height);
    this.textMyName = this.add.text(customConfig.myScore.profile.name.x, customConfig.myScore.profile.name.y, customConfig.myScore.profile.name.text, { fontSize: customConfig.myScore.profile.name.fontSize, fill: customConfig.myScore.profile.name.colorText, fontFamily: customConfig.myScore.profile.name.fontFamily });
    this.setCenter(this.textMyName);
    this.textMyScore = this.add.text(customConfig.myScore.textMyScore.x, customConfig.myScore.textMyScore.y, customConfig.myScore.textMyScore.score, { fontSize: customConfig.myScore.iconMyRank.fontSize, fill: customConfig.myScore.iconMyRank.colorText, fontFamily: customConfig.myScore.iconMyRank.fontFamily });
    this.setCenter(this.textMyScore);

    this.btnPlayWithFriends = this.add.image(customConfig.btnPlayWithFriends.x, customConfig.btnPlayWithFriends.y, customConfig.btnPlayWithFriends.keyBackground).setInteractive();
    this.setSize(this.btnPlayWithFriends, customConfig.btnPlayWithFriends.width, customConfig.btnPlayWithFriends.height);
    this.btnIconPlayWithFriends = this.add.image(customConfig.btnIconPlayWithFriends.x, customConfig.btnIconPlayWithFriends.y, customConfig.btnIconPlayWithFriends.keyBackground).setInteractive();
    this.setSize(this.btnIconPlayWithFriends, customConfig.btnIconPlayWithFriends.width, customConfig.btnIconPlayWithFriends.height)
    this.iconPlayWithFriends = this.add.image(customConfig.btnIconPlayWithFriends.x, customConfig.btnIconPlayWithFriends.y, customConfig.btnIconPlayWithFriends.key).setInteractive();
    this.setSize(this.iconPlayWithFriends, customConfig.btnIconPlayWithFriends.widthIcon, customConfig.btnIconPlayWithFriends.heightIcon)
    this.textPlayWithFriends = this.add.text(customConfig.btnPlayWithFriends.xText, customConfig.btnPlayWithFriends.y, customConfig.btnPlayWithFriends.textContent, { fontSize: customConfig.btnPlayWithFriends.fontSize, fill: customConfig.btnPlayWithFriends.colorText, fontFamily: customConfig.btnPlayWithFriends.fontFamily });
    this.setCenter(this.textPlayWithFriends);

    this.btnChooseSkin = this.add.image(customConfig.btnChooseSkin.x, customConfig.btnChooseSkin.y, customConfig.btnChooseSkin.keyBackground).setInteractive();
    this.setSize(this.btnChooseSkin, customConfig.btnChooseSkin.width, customConfig.btnChooseSkin.height);
    this.iconChooseSkin = this.add.sprite(customConfig.btnChooseSkin.xIcon, customConfig.btnChooseSkin.yIcon, customConfig.btnChooseSkin.key).setInteractive();
    this.iconChooseSkin.anims.play('' + this.registry.get("skin"), true);
    this.setSize(this.iconChooseSkin, customConfig.btnChooseSkin.widthIcon, customConfig.btnChooseSkin.heightIcon);
    this.textChooseSkin = this.add.text(customConfig.btnChooseSkin.xText, customConfig.btnChooseSkin.yText, customConfig.btnChooseSkin.textContent, { fontSize: customConfig.btnChooseSkin.fontSize, fill: customConfig.btnChooseSkin.colorText, fontFamily: customConfig.btnChooseSkin.fontFamily });
    this.setCenter(this.textChooseSkin);

    this.btnPlayGame = this.add.image(customConfig.btnPlayGame.x, customConfig.btnPlayGame.y, customConfig.btnPlayGame.key).setInteractive();
    this.setSize(this.btnPlayGame, customConfig.btnPlayGame.width, customConfig.btnPlayGame.height);
    this.textPlayGame = this.add.text(customConfig.btnPlayGame.xText, customConfig.btnPlayGame.yText, customConfig.btnPlayGame.textContent, { fontSize: customConfig.btnPlayGame.fontSize, fill: customConfig.btnPlayGame.colorText, fontFamily: customConfig.btnPlayGame.fontFamily });
    this.setCenter(this.textPlayGame);


    this.btnVolume = this.add.image(customConfig.btnVolume.x, customConfig.btnVolume.y, customConfig.btnVolume.keyBackground).setInteractive();
    this.setSize(this.btnVolume, customConfig.btnVolume.width, customConfig.btnVolume.height);
    this.iconVolume = this.add.image(customConfig.btnVolume.x, customConfig.btnVolume.y, customConfig.btnVolume.key).setInteractive();
    this.setSize(this.iconVolume, 0.8 * customConfig.btnVolume.width, 0.8 * customConfig.btnVolume.height);
    this.iconVolumeMute = this.add.image(customConfig.btnVolume.x, customConfig.btnVolume.y, customConfig.btnVolumeMute.key).setInteractive();
    this.setSize(this.iconVolumeMute, 0.8 * customConfig.btnVolume.width, 0.8 * customConfig.btnVolume.height);
    this.iconVolumeMute.setAlpha(0);
    this.btnHelp = this.add.image(customConfig.btnHelp.x, customConfig.btnHelp.y, customConfig.btnHelp.keyBackground).setInteractive();
    this.setSize(this.btnHelp, customConfig.btnHelp.width, customConfig.btnHelp.height);
    this.iconHelp = this.add.image(customConfig.btnHelp.x, customConfig.btnHelp.y, customConfig.btnHelp.key).setInteractive();
    this.setSize(this.iconHelp, 0.8 * customConfig.btnHelp.width, 0.8 * customConfig.btnHelp.height);

    /* scroll */
    let tmpthis = this;
    for (let i = 0; i < this.itemListScore.length; i++) {
      this.itemListScore[i].children.each(function (enemy) {
        if (enemy.y <= tmpthis.myScore.y || enemy.y >= tmpthis.btnPlayWithFriends.y) {
          enemy.setAlpha(0);
        } else {
          enemy.setAlpha(1);
        }
      }, tmpthis);
    }

    this.btnPlayWithFriends.on("pointerdown", this.playWithFriends, this);
    this.btnChooseSkin.on("pointerdown", this.openPopupChooseSkin, this);
    this.iconVolume.on("pointerdown", this.setMusic, this);
    this.iconVolumeMute.on("pointerdown", this.setMusic, this);

    //play game
    let tmp_this = this;
    this.btnPlayGame.on("pointerdown", function () {
      tmp_this.scene.start("GameScene");
    });
  }

  update(): void {
    if (this.iconChooseSkin) {
      this.iconChooseSkin.angle++;
    }
  }
  private initRegistry(): void {
    if (this.registry.get("skin")) {
      this.registry.set("skin", this.registry.get("skin"));
    } else {
      this.registry.set("skin", 0);
    }

    this.registry.set("highscore", [0, 0, 0, 0, 0]);
  }
  private playWithFriends(): void {
    alert("show popup friends list from IA API after");
  }
  private setMusic(): void {
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
  private prepareDrag(item): void {
    this.btnNext.setInteractive(false);
    this.btnPrev.setInteractive(false);
    item.setScale(1);
    item.setAlpha(0.4);
  }
  private checkToSetScale(item, x_new, type): void {
    let center = customConfig.sliderSkin.item.x;
    let limitprev1 = customConfig.sliderSkin.item.x + 3 * customConfig.sliderSkin.item.padding;
    let limitnext1 = customConfig.sliderSkin.item.x - 3 * customConfig.sliderSkin.item.padding;
    let limitprev2 = customConfig.sliderSkin.item.x + 2 * customConfig.sliderSkin.item.padding;
    let limitnext2 = customConfig.sliderSkin.item.x - 2 * customConfig.sliderSkin.item.padding;
    if (x_new == center) {
      item.setScale(1.4);
      item.setAlpha(1);
    } else if (x_new >= limitprev2 || x_new <= limitnext2) {
      window.setTimeout(function () {
        item.setAlpha(0);
      }, 500);

    } else {
      item.setAlpha(0.4);
      item.setScale(1);
    }
    this.btnNext.setInteractive();
    this.btnPrev.setInteractive();
  }
  private findNext() {
    let rs;
    let cmp = parseInt(customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding + "");
    console.log(this.itemSlideSkin.frame.name);
    if (this.itemSlideSkin.x == cmp) {
      rs = this.iconChooseSkin.frame.name;
      console.log("main");
    } else if (this.itemSlideSkinNext.x == cmp) {
      rs = this.itemSlideSkinNext.frame.name;
      console.log("next");
    } else if (this.itemSlideSkinNextTmp.x == cmp) {
      rs = this.itemSlideSkinNextTmp.frame.name;
      console.log("nexttmp");
    } else if (this.itemSlideSkinPrev.x == cmp) {
      rs = this.itemSlideSkinPrev.frame.name;
      console.log("prev");
    } else if (this.itemSlideSkinPrevTmp.x == cmp) {
      rs = this.itemSlideSkinPrevTmp.frame.name;
      console.log("prevtmp");
    }

    console.log(rs);
    return rs + 1 > this.numSkin ? 0 : rs + 1;
  }
  private dragSlide(type, prevtmp, prev, main, next, nexttmp): void {
    console.log(prevtmp, prev, main, next, nexttmp);
    let x_main, x_prev, x_next, x_nexttmp, x_prevtmp;
    let limitprev = customConfig.sliderSkin.item.x + 3 * customConfig.sliderSkin.item.padding;
    let limitprev1 = customConfig.sliderSkin.item.x + 2 * customConfig.sliderSkin.item.padding;
    let limitnext = customConfig.sliderSkin.item.x - 3 * customConfig.sliderSkin.item.padding;
    let limitnext1 = customConfig.sliderSkin.item.x - 2 * customConfig.sliderSkin.item.padding;
    if (type == "next") {
      let nextIfType;
      let tmp;
      if (this.itemSlideSkin.x <= limitnext) {
        this.itemSlideSkin.x = limitprev1;
        if (this.itemSlideSkinPrevTmp.frame.name >= this.numSkin - 2) {
          tmp = this.itemSlideSkinPrevTmp.frame.name - this.numSkin;
        } else {
          tmp = this.itemSlideSkinPrevTmp.frame.name;
        }
        nextIfType = tmp + 2;
        this.itemSlideSkin.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinNext.x <= limitnext) {
        this.itemSlideSkinNext.x = limitprev1;
        if (this.itemSlideSkinPrev.frame.name >= this.numSkin - 2) {
          tmp = this.itemSlideSkinPrev.frame.name - this.numSkin;
        } else {
          tmp = this.itemSlideSkinPrev.frame.name;
        }
        nextIfType = tmp + 2;
        this.itemSlideSkinNext.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinNextTmp.x <= limitnext) {
        this.itemSlideSkinNextTmp.x = limitprev1;
        if (this.itemSlideSkin.frame.name >= this.numSkin - 2) {
          tmp = this.itemSlideSkin.frame.name - this.numSkin;
        } else {
          tmp = this.itemSlideSkin.frame.name;
        }
        nextIfType = tmp + 2;
        this.itemSlideSkinNextTmp.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinPrev.x <= limitnext) {
        this.itemSlideSkinPrev.x = limitprev1;
        if (this.itemSlideSkinNextTmp.frame.name >= this.numSkin - 2) {
          tmp = this.itemSlideSkinNextTmp.frame.name - this.numSkin;
        } else {
          tmp = this.itemSlideSkinNextTmp.frame.name;
        }
        nextIfType = tmp + 2;
        this.itemSlideSkinPrev.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinPrevTmp.x <= limitnext) {
        this.itemSlideSkinPrevTmp.x = limitprev1;
        if (this.itemSlideSkinNext.frame.name >= this.numSkin - 2) {
          tmp = this.itemSlideSkinNext.frame.name - this.numSkin;
        } else {
          tmp = this.itemSlideSkinNext.frame.name;
        }
        nextIfType = tmp + 2;
        this.itemSlideSkinPrevTmp.anims.play('' + nextIfType, true);
      }
      console.log(nextIfType);
      x_main = this.itemSlideSkin.x - customConfig.sliderSkin.item.padding;
      x_next = this.itemSlideSkinNext.x - customConfig.sliderSkin.item.padding;
      x_prev = this.itemSlideSkinPrev.x - customConfig.sliderSkin.item.padding;
      x_nexttmp = this.itemSlideSkinNextTmp.x - customConfig.sliderSkin.item.padding;
      x_prevtmp = this.itemSlideSkinPrevTmp.x - customConfig.sliderSkin.item.padding;
    } else {
      let prevIfType;
      let tmp;
      if (this.itemSlideSkin.x >= limitprev) {
        this.itemSlideSkin.x = limitnext1;
        if (this.itemSlideSkinNextTmp.frame.name == 1) {
          prevIfType = this.numSkin;
        } else if ((this.itemSlideSkinNextTmp.frame.name == 0)) {
          prevIfType = this.numSkin - 1;
        } else {
          prevIfType = this.itemSlideSkinNextTmp.frame.name - 2;
        }
        console.log("main " + prevIfType);
        // prevIfType = this.itemSlideSkinNextTmp.frame.name - 2 < -1 ? 0 : this.itemSlideSkinNextTmp.frame.name - 2;
        this.itemSlideSkin.anims.play('' + prevIfType, true);
      }
      if (this.itemSlideSkinNext.x >= limitprev) {
        this.itemSlideSkinNext.x = limitnext1;
        if (this.itemSlideSkinPrevTmp.frame.name == 1) {
          prevIfType = this.numSkin;
        } else if ((this.itemSlideSkinPrevTmp.frame.name == 0)) {
          prevIfType = this.numSkin - 1;
        } else {
          prevIfType = this.itemSlideSkinPrevTmp.frame.name - 2;
        }
        console.log("next " + prevIfType);
        // prevIfType = this.itemSlideSkinPrevTmp.frame.name - 2 < -1 ? 0 : this.itemSlideSkinPrevTmp.frame.name - 2;
        this.itemSlideSkinNext.anims.play('' + prevIfType, true);
      }
      if (this.itemSlideSkinNextTmp.x >= limitprev) {
        this.itemSlideSkinNextTmp.x = limitnext1;
        if (this.itemSlideSkinPrev.frame.name == 1) {
          prevIfType = this.numSkin;
        } else if ((this.itemSlideSkinPrev.frame.name == 0)) {
          prevIfType = this.numSkin - 1;
        } else {
          prevIfType = this.itemSlideSkinPrev.frame.name - 2;
        }
        console.log("nexttmp " + prevIfType);
        // prevIfType = this.itemSlideSkinPrev.frame.name - 2 < -1 ? 0 : this.itemSlideSkinPrev.frame.name - 2;
        this.itemSlideSkinNextTmp.anims.play('' + prevIfType, true);
      }
      if (this.itemSlideSkinPrev.x >= limitprev) {
        this.itemSlideSkinPrev.x = limitnext1;
        if (this.itemSlideSkinNext.frame.name == 1) {
          prevIfType = this.numSkin;
        } else if ((this.itemSlideSkinNext.frame.name == 0)) {
          prevIfType = this.numSkin - 1;
        } else {
          prevIfType = this.itemSlideSkinNext.frame.name - 2;
        }
        console.log("prev " + prevIfType);
        // prevIfType = this.itemSlideSkinNext.frame.name - 2 < -1 ? 0 : this.itemSlideSkinNext.frame.name - 2;
        this.itemSlideSkinPrev.anims.play('' + prevIfType, true);
      }
      if (this.itemSlideSkinPrevTmp.x >= limitprev) {
        this.itemSlideSkinPrevTmp.x = limitnext1;
        if (this.itemSlideSkin.frame.name == 1) {
          prevIfType = this.numSkin;
        } else if ((this.itemSlideSkin.frame.name == 0)) {
          prevIfType = this.numSkin - 1;
        } else {
          prevIfType = this.itemSlideSkin.frame.name - 2;
        }
        console.log("prevtmp " + prevIfType);
        // prevIfType = this.itemSlideSkin.frame.name - 2 < -1 ? 0 : this.itemSlideSkin.frame.name - 2;
        this.itemSlideSkinPrevTmp.anims.play('' + prevIfType, true);
      }
      console.log(prevIfType);
      x_main = this.itemSlideSkin.x + customConfig.sliderSkin.item.padding;
      x_next = this.itemSlideSkinNext.x + customConfig.sliderSkin.item.padding;
      x_prev = this.itemSlideSkinPrev.x + customConfig.sliderSkin.item.padding;
      x_nexttmp = this.itemSlideSkinNextTmp.x + customConfig.sliderSkin.item.padding;
      x_prevtmp = this.itemSlideSkinPrevTmp.x + customConfig.sliderSkin.item.padding;

    }
    // console.log(x_main, x_next, x_prev);
    let _this = this;
    this.tweens.add({
      targets: this.itemSlideSkin,
      x: x_main,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onStart: this.prepareDrag(_this.itemSlideSkin),
      onComplete: this.checkToSetScale(_this.itemSlideSkin, x_main, type)
    });

    this.tweens.add({
      targets: this.itemSlideSkinPrev,
      x: x_prev,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onStart: this.prepareDrag(_this.itemSlideSkinPrev),
      onComplete: this.checkToSetScale(_this.itemSlideSkinPrev, x_prev, type)
    });
    this.tweens.add({
      targets: this.itemSlideSkinNext,
      x: x_next,
      onStart: this.prepareDrag(_this.itemSlideSkinNext),
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onComplete: this.checkToSetScale(_this.itemSlideSkinNext, x_next, type)
    });
    this.tweens.add({
      targets: this.itemSlideSkinNextTmp,
      x: x_nexttmp,
      onStart: this.prepareDrag(_this.itemSlideSkinNextTmp),
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onComplete: this.checkToSetScale(_this.itemSlideSkinNextTmp, x_nexttmp, type)
    });
    this.tweens.add({
      targets: this.itemSlideSkinPrevTmp,
      x: x_prevtmp,
      onStart: this.prepareDrag(_this.itemSlideSkinPrevTmp),
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onComplete: this.checkToSetScale(_this.itemSlideSkinPrevTmp, x_prevtmp, type)
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
    this.iconClosePopup = this.add.image(this.backgroundPopup.width - customConfig.sliderSkin.btnClose.paddingRight, customConfig.sliderSkin.btnClose.paddingTop, customConfig.sliderSkin.iconClose.key).setInteractive();

    this.setSize(this.btnClosePopup, customConfig.sliderSkin.btnClose.width, customConfig.sliderSkin.btnClose.width);
    this.setSize(this.iconClosePopup, customConfig.sliderSkin.iconClose.width, customConfig.sliderSkin.iconClose.width);

    //load btn next, prev, menu
    this.btnNext = this.add.image(customConfig.sliderSkin.btnNext.x, customConfig.sliderSkin.btnNext.y, customConfig.sliderSkin.btnNext.key).setInteractive();
    this.btnPrev = this.add.image(customConfig.sliderSkin.btnPrev.x, customConfig.sliderSkin.btnPrev.y, customConfig.sliderSkin.btnPrev.key).setInteractive();
    this.itemSlideSkin = this.add.sprite(customConfig.sliderSkin.item.x, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.itemSlideSkinNext = this.add.sprite(customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.itemSlideSkinNextTmp = this.add.sprite(this.itemSlideSkinNext.x + customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.itemSlideSkinPrev = this.add.sprite(customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.itemSlideSkinPrevTmp = this.add.sprite(this.itemSlideSkinPrev.x - customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.btnOKPopup = this.add.image(this.itemSlideSkin.x, this.backgroundPopup.height - customConfig.sliderSkin.btnOK.paddingBottom, customConfig.sliderSkin.btnOK.key).setInteractive();

    this.itemSlideSkinNext.setAlpha(0);
    this.itemSlideSkinNextTmp.setAlpha(0);
    this.itemSlideSkinPrev.setAlpha(0);
    this.itemSlideSkinPrevTmp.setAlpha(0);

    this.itemSlideSkinPrevTmp.anims.play('' + (this.numSkin - 1), true);
    this.itemSlideSkinPrev.anims.play('' + this.numSkin, true);
    this.itemSlideSkin.anims.play('0', true);
    this.itemSlideSkin.setScale(1.5);
    this.itemSlideSkinNext.anims.play('1', true);
    this.itemSlideSkinNextTmp.anims.play('2', true);
    this.itemSlideSkinNext.setAlpha(0.4);
    this.itemSlideSkinPrev.setAlpha(0.4);
    //add the elements to the group
    this.groupItemSlide = this.add.group();
    this.groupItemSlide.add(this.itemSlideSkinPrevTmp);
    this.groupItemSlide.add(this.itemSlideSkinPrev);
    this.groupItemSlide.add(this.itemSlideSkin);
    this.groupItemSlide.add(this.itemSlideSkinNext);
    this.groupItemSlide.add(this.itemSlideSkinPrev);

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
      tmp.itemSlideSkinPrevTmp.destroy();
      tmp.itemSlideSkinNextTmp.destroy();
      tmp.msgBox.destroy();
      tmp.registry.set("skin", current);
      tmp.iconChooseSkin.anims.play('' + current, true);
      tmp.setSize(tmp.iconChooseSkin, customConfig.btnChooseSkin.widthIcon, customConfig.btnChooseSkin.heightIcon);

      console.log(current);
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
      tmp.itemSlideSkinPrevTmp.destroy();
      tmp.itemSlideSkinNextTmp.destroy();
      tmp.msgBox.destroy();
    });
    let prev;
    let main;
    let next;
    let prevtmp;
    let nexttmp;
    this.btnNext.on("pointerdown", function () {
      if (current >= tmp.numSkin) {
        current = 0;
        console.log(1);
      }
      current++;
      main = current;
      prev = current - 1 < 0 ? tmp.numSkin : current - 1;
      next = current + 1 > tmp.numSkin ? 0 : current + 1;
      prevtmp = prev - 1 < 0 ? tmp.numSkin : prev - 1;
      nexttmp = next + 1 > tmp.numSkin ? 0 : next + 1;
      tmp.dragSlide("next", prevtmp, prev, main, next, nexttmp);

    });
    this.btnPrev.on("pointerdown", function () {
      if (current <= 0) {
        current = tmp.numSkin;
      }
      current--;

      main = current;
      prev = current - 1 < 0 ? tmp.numSkin : current - 1;
      next = current + 1 > tmp.numSkin ? 0 : current + 1;
      prevtmp = prev - 1 < 0 ? tmp.numSkin : prev - 1;
      nexttmp = next + 1 > tmp.numSkin ? 0 : next + 1;
      tmp.dragSlide("prev", prevtmp, prev, main, next, nexttmp);


    });
  }
  private generateHexColor() {
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
  }
}