import { AssetsMenu, customConfig } from '../const/config';
export class MenuScene extends Phaser.Scene {
  private menuLeft;
  private btnVolume;
  private iconVolume;
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
  private itemScore;
  private itemProfile;
  private iconItemRank;
  private textItemRank;
  private textItemScore;
  private buttonItemFight;
  private iconItemFight;
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
  private numSkin;
  constructor() {
    super({
      key: "MenuScene"
    });
    this.numSkin = 9;
    this.itemListScore = [];
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
  setSize(item, width, height): void {
    let scalex = width / item.width;
    let scaley = height / item.height;
    console.log(scalex, scaley, width, height);
    item.setScale(scalex, scaley);
    // item.width = width;
    // 50item.height = height;
    // 50item.setDisplaySize(width,height);
    // 50item.setOrigin(0.5,0.5);
    50
  }
  create(): void {
    this.menuLeft = this.add.image(customConfig.backLeft.x, customConfig.backLeft.y, customConfig.backLeft.key);
    this.setSize(this.menuLeft, customConfig.backLeft.width, customConfig.backLeft.height);

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
    this.iconMyRank = this.add.image(customConfig.myScore.iconMyRank.x, customConfig.myScore.iconMyRank.y, customConfig.myScore.iconMyRank.key);
    this.setSize(this.iconMyRank, customConfig.myScore.iconMyRank.width, customConfig.myScore.iconMyRank.height);
    this.textMyRank = this.add.text(customConfig.myScore.iconMyRank.x, customConfig.myScore.iconMyRank.y, customConfig.myScore.iconMyRank.score, { fontSize: customConfig.myScore.iconMyRank.fontSize, fill: customConfig.myScore.iconMyRank.colorText, fontFamily: customConfig.myScore.iconMyRank.fontFamily });
    this.setCenter(this.textMyRank);
    this.myProfile = this.add.image(customConfig.myScore.profile.x, customConfig.myScore.profile.y, customConfig.myScore.profile.key);
    this.setSize(this.myProfile, customConfig.myScore.profile.width, customConfig.myScore.profile.height);
    this.textMyScore = this.add.text(customConfig.myScore.textMyScore.x, customConfig.myScore.textMyScore.y, customConfig.myScore.textMyScore.score, { fontSize: customConfig.myScore.iconMyRank.fontSize, fill: customConfig.myScore.iconMyRank.colorText, fontFamily: customConfig.myScore.iconMyRank.fontFamily });
    this.setCenter(this.textMyScore);
    

    for (let i = 0; i < 4; i++) {
      this.itemScore = this.add.image(customConfig.itemScore.x, customConfig.itemScore.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.key);
      this.setSize(this.itemScore, customConfig.itemScore.width, customConfig.itemScore.height);
      this.iconItemRank = this.add.image(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y+ i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.iconMyRank.key);
      this.setSize(this.iconItemRank, customConfig.itemScore.iconMyRank.width, customConfig.itemScore.iconMyRank.height);
      this.textItemRank = this.add.text(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y + i * customConfig.itemScore.iconMyRank.marginTop, ("" + (i+1)), { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemRank);
      this.itemProfile = this.add.image(customConfig.itemScore.profile.x, customConfig.itemScore.profile.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.profile.key);
      this.setSize(this.itemProfile, customConfig.itemScore.profile.width, customConfig.itemScore.profile.height);
      this.textItemScore = this.add.text(customConfig.itemScore.textMyScore.x, customConfig.itemScore.textMyScore.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.textMyScore.score, { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemScore);
      this.buttonItemFight = this.add.image(customConfig.itemScore.buttonItemFight.x, customConfig.itemScore.buttonItemFight.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.buttonItemFight.keyBackground);
      this.setSize(this.buttonItemFight, customConfig.itemScore.buttonItemFight.width, customConfig.itemScore.buttonItemFight.height);
      // this.itemListScore.push(this.itemProfile);

    }

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
    this.iconChooseSkin = this.add.image(customConfig.btnChooseSkin.xIcon, customConfig.btnChooseSkin.yIcon, customConfig.btnChooseSkin.key).setInteractive();
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
    this.setSize(this.iconVolume, 0.9 * customConfig.btnVolume.width, 0.9 * customConfig.btnVolume.height);

    this.btnHelp = this.add.image(customConfig.btnHelp.x, customConfig.btnHelp.y, customConfig.btnHelp.keyBackground).setInteractive();
    this.setSize(this.btnHelp, customConfig.btnHelp.width, customConfig.btnHelp.height);
    this.iconHelp = this.add.image(customConfig.btnHelp.x, customConfig.btnHelp.y, customConfig.btnHelp.key).setInteractive();
    this.setSize(this.iconHelp, 0.9 * customConfig.btnHelp.width, 0.9 * customConfig.btnHelp.height);

    // this.imgCup.setScale(1.8);
    // this.btnPlayWithFriends.setScale(1.5);
    // this.btnPlayGame.setScale(1.5);
    // this.btnChooseSkin.setScale(1.5);
    //events
    this.btnPlayWithFriends.on("pointerdown", this.playWithFriends, this);
    this.btnChooseSkin.on("pointerdown", this.openPopupChooseSkin, this);

    // this.listHighScore = this.add.group();
    // let tmp_i;
    // let text;
    // for (let i = 0; i < 5; i++) {
    //   switch (i) {
    //     case 0: {
    //       tmp_i = "1st  ";
    //       break;
    //     }
    //     case 1: {
    //       tmp_i = "2nd ";
    //       break;
    //     }
    //     case 2: {
    //       tmp_i = "3rd  ";
    //       break;
    //     }
    //     default: {
    //       tmp_i = (i + 1) + "th  ";
    //       break;
    //     }
    //   }
    //   text = this.add.text(customConfig.listHighScore.x, customConfig.listHighScore.y + i * customConfig.listHighScore.marginTop, tmp_i + 'User ' + (i + 1) + ".............." + this.registry.get("highscore")[i], { font: customConfig.listHighScore.fontSize + " Arial", fill: customConfig.listHighScore.fill, backgroundColor: this.generateHexColor() })
    //   this.setCenter(text);
    //   this.listHighScore.add(text);
    // }

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
  private dragSlide(type, prevtmp, prev, main, next, nexttmp): void {
    console.log(prevtmp, prev, main, next, nexttmp);
    let x_main, x_prev, x_next, x_nexttmp, x_prevtmp;
    let limitprev = customConfig.sliderSkin.item.x + 3 * customConfig.sliderSkin.item.padding;
    let limitprev1 = customConfig.sliderSkin.item.x + 2 * customConfig.sliderSkin.item.padding;
    let limitnext = customConfig.sliderSkin.item.x - 3 * customConfig.sliderSkin.item.padding;
    let limitnext1 = customConfig.sliderSkin.item.x - 2 * customConfig.sliderSkin.item.padding;
    if (type == "next") {
      if (this.itemSlideSkin.x <= limitnext) {
        this.itemSlideSkin.x = limitprev1;
        this.itemSlideSkin.anims.play('' + (nexttmp + 1 > this.numSkin ? 0 : nexttmp + 1), true);
        // this.itemSlideSkinNext.x = limitprev;
      }
      if (this.itemSlideSkinNext.x <= limitnext) {
        this.itemSlideSkinNext.x = limitprev1;
        this.itemSlideSkinNext.anims.play('' + (nexttmp + 1 > this.numSkin ? 0 : nexttmp + 1), true);
      }
      if (this.itemSlideSkinNextTmp.x <= limitnext) {
        this.itemSlideSkinNextTmp.x = limitprev1;
        this.itemSlideSkinNextTmp.anims.play('' + (nexttmp + 1 > this.numSkin ? 0 : nexttmp + 1), true);
      }
      if (this.itemSlideSkinPrev.x <= limitnext) {
        this.itemSlideSkinPrev.x = limitprev1;
        this.itemSlideSkinPrev.anims.play('' + (nexttmp + 1 > this.numSkin ? 0 : nexttmp + 1), true);
      }
      if (this.itemSlideSkinPrevTmp.x <= limitnext) {
        this.itemSlideSkinPrevTmp.x = limitprev1;
        this.itemSlideSkinPrevTmp.anims.play('' + (nexttmp + 1 > this.numSkin ? 0 : nexttmp + 1), true);
      }
      x_main = this.itemSlideSkin.x - customConfig.sliderSkin.item.padding;
      x_next = this.itemSlideSkinNext.x - customConfig.sliderSkin.item.padding;
      x_prev = this.itemSlideSkinPrev.x - customConfig.sliderSkin.item.padding;
      x_nexttmp = this.itemSlideSkinNextTmp.x - customConfig.sliderSkin.item.padding;
      x_prevtmp = this.itemSlideSkinPrevTmp.x - customConfig.sliderSkin.item.padding;
    } else {
      if (this.itemSlideSkin.x >= limitprev) {
        this.itemSlideSkin.x = limitnext1;
        this.itemSlideSkin.anims.play('' + (prevtmp - 1 < 0 ? this.numSkin : prevtmp - 1), true);
      }
      if (this.itemSlideSkinNext.x >= limitprev) {
        this.itemSlideSkinNext.x = limitnext1;
        this.itemSlideSkinNext.anims.play('' + (prevtmp - 1 < 0 ? this.numSkin : prevtmp - 1), true);
      }
      if (this.itemSlideSkinNextTmp.x >= limitprev) {
        this.itemSlideSkinNextTmp.x = limitnext1;
        this.itemSlideSkinNextTmp.anims.play('' + (prevtmp - 1 < 0 ? this.numSkin : prevtmp - 1), true);
      }
      if (this.itemSlideSkinPrev.x >= limitprev) {
        this.itemSlideSkinPrev.x = limitnext1;
        this.itemSlideSkinPrev.anims.play('' + (prevtmp - 1 < 0 ? this.numSkin : prevtmp - 1), true);
      }
      if (this.itemSlideSkinPrevTmp.x >= limitprev) {
        this.itemSlideSkinPrevTmp.x = limitnext1;
        this.itemSlideSkinPrevTmp.anims.play('' + (prevtmp - 1 < 0 ? this.numSkin : prevtmp - 1), true);
      }
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
      onStart: function () {
        _this.itemSlideSkin.setScale(1);
      },
      onComplete: function () {
        _this.itemSlideSkin.setScale(1.4);
      }
    });

    this.tweens.add({
      targets: this.itemSlideSkinPrev,
      x: x_prev,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
    });
    this.tweens.add({
      targets: this.itemSlideSkinNext,
      x: x_next,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
    });
    this.tweens.add({
      targets: this.itemSlideSkinNextTmp,
      x: x_nexttmp,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
    });
    this.tweens.add({
      targets: this.itemSlideSkinPrevTmp,
      x: x_prevtmp,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
    });
  }
  private openPopupChooseSkin(): void {
    let current = 0;
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
    this.itemSlideSkinNextTmp = this.add.sprite(this.itemSlideSkinNext.x + customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();

    this.itemSlideSkinPrev = this.add.sprite(customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.itemSlideSkinPrevTmp = this.add.sprite(this.itemSlideSkinPrev.x - customConfig.sliderSkin.item.padding, this.backgroundPopup.height / 2, customConfig.sliderSkin.item.key).setInteractive();
    this.btnOKPopup = this.add.image(this.itemSlideSkin.x, this.backgroundPopup.height - customConfig.sliderSkin.btnOK.paddingBottom, customConfig.sliderSkin.btnOK.key).setInteractive();
    for (let i = 0; i <= this.numSkin; i++) {
      this.anims.create({
        key: '' + i,
        frames: [{ key: 'planets', frame: i }],
        frameRate: 10
      });
    }
    this.itemSlideSkinPrevTmp.anims.play('' + (this.numSkin - 1), true);
    this.itemSlideSkinPrev.anims.play('' + this.numSkin, true);
    this.itemSlideSkin.anims.play('0', true);
    this.itemSlideSkin.setScale(1.5);
    this.itemSlideSkinNext.anims.play('1', true);
    this.itemSlideSkinNextTmp.anims.play('2', true);
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
    let prev;
    let main;
    let next;
    let prevtmp;
    let nexttmp;
    this.btnNext.on("pointerdown", function () {
      if (current >= tmp.numSkin) {
        current = 0;
      }
      current++;
      console.log(current);
      // if (current <= tmp.numSkin) {
      main = current;
      prev = current - 1 < 0 ? tmp.numSkin : current - 1;
      next = current + 1 > tmp.numSkin ? 0 : current + 1;
      prevtmp = prev - 1 < 0 ? tmp.numSkin : prev - 1;
      nexttmp = next + 1 > tmp.numSkin ? 0 : next + 1;
      // tmp.itemSlideSkin.anims.play('' + current, true);
      // tmp.itemSlideSkinNext.anims.play('' + ((current + 1 > tmp.numSkin ? 0 : current + 1)), true);
      // tmp.itemSlideSkinPrev.anims.play('' + ((current - 1)), true);
      // tmp.itemSlideSkinNext.setAlpha(0.4);
      // tmp.itemSlideSkinPrev.setAlpha(0.4);
      // tmp.itemSlideSkin.x = customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.tweenX;
      // tmp.itemSlideSkinPrev.x = customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding - customConfig.sliderSkin.item.tweenX;
      // tmp.itemSlideSkinNext.x = customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding - customConfig.sliderSkin.item.tweenX;
      tmp.dragSlide("next", prevtmp, prev, main, next, nexttmp);
      // }
      // } else {
      //   current = tmp.registry.get("skin");
      // }
    });
    this.btnPrev.on("pointerdown", function () {
      if (current <= 0) {
        current = tmp.numSkin;
      }
      current--;
      // if (current >= 0) {
      main = current;
      prev = current - 1 < 0 ? tmp.numSkin : current - 1;
      next = current + 1 > tmp.numSkin ? 0 : current + 1;
      prevtmp = prev - 1 < 0 ? tmp.numSkin : prev - 1;
      nexttmp = next + 1 > tmp.numSkin ? 0 : next + 1;
      // tmp.itemSlideSkin.anims.play('' + current, true);
      // tmp.itemSlideSkinNext.anims.play('' + ((current + 1)), true);
      // tmp.itemSlideSkinPrev.anims.play('' + ((current - 1 < 0 ? 3 : current - 1)), true);
      // tmp.itemSlideSkinNext.setAlpha(0.4);
      // tmp.itemSlideSkinPrev.setAlpha(0.4);
      // tmp.itemSlideSkin.x = customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.tweenX;
      // tmp.itemSlideSkinPrev.x = customConfig.sliderSkin.item.x - customConfig.sliderSkin.item.padding + customConfig.sliderSkin.item.tweenX;
      // tmp.itemSlideSkinNext.x = customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding + customConfig.sliderSkin.item.tweenX;
      tmp.dragSlide("prev", prevtmp, prev, main, next, nexttmp);

      // } else {
      //   current = tmp.registry.get("skin");
      // }
    });
  }
  private generateHexColor() {
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
  }
}