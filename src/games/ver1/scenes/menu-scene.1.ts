let touchY, touchY2, touchX, isUp;
let hasClick = true;
let isGlobal = false;
let myScore;
let myScoreGlobal;
import { AssetsMenu, customConfig } from '../const/config';
import { playGame } from '../../knifthit/scenes/main';
export class MenuSceneOver extends Phaser.Scene {
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
  private btnfriendsScoreInactive;
  private iconfriendsScore;
  private textIconFriendsScore;
  private textFriendsScore;
  private btnGlobalScore;
  private btnGlobalScoreActive;
  private iconGlobalScore;
  private textIconGlobalScore;
  private textGlobalScore;
  private myScore;
  private myProfile;
  private iconMyRank;
  private iconMyRankGlobal;
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
  private groupItemScoreGlobal;
  private itemListScore;
  private itemListScoreGlobal;
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
  private backgroundPopupHelp;
  private btnClosePopup;
  private btnClosePopupHelp;
  private iconClosePopup;
  private iconClosePopupHelp;
  private btnOKPopup;
  private btnWatch;
  private btnInvite;
  private textTitlePopup;
  private textTitlePopupHelp;
  private textPopup;
  private msgBox;
  private msgHelp;
  private listHighScore;
  private itemSlideHelp;
  private listItemSlideHelp;
  private btnNextHelp;
  private btnPrevHelp;
  private currentHelp;
  private btnNext;
  private btnPrev;
  private itemSlideSkin;
  private itemSlideSkinNext;
  private itemSlideSkinNextTmp;
  private itemSlideSkinPrev;
  private itemSlideSkinPrevTmp;
  private groupItemSlide;
  private numSkin;
  private currentSkin;
  private mySkins;
  private background0;
  private background1;
  private background2;
  constructor() {
    super({
      key: "MenuSceneOver"
    });
    this.numSkin = 9;
    this.itemListScore = [];
    this.itemListScoreGlobal = [];
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
    console.log("CCsasC");
    this.background0 = this.add.sprite(customConfig.width / 4, customConfig.height / 4, "background0");
    this.background1 = this.add.sprite(customConfig.width / 2, customConfig.height / 2, "background1");
    this.background2 = this.add.sprite(customConfig.width / 3, customConfig.height / 3, "background2");
    
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
      } else if (touchY2 < touchY - 20) {
        isUp = true;
        let allow = true;
        if (isGlobal) {
          __this.itemListScoreGlobal[__this.itemListScoreGlobal.length - 1].children.each(function (enemy) {
            if (enemy.y < customConfig.itemScore.y + 3 * customConfig.itemScore.marginTop) {
              allow = false;
              return;
            }
          })
        } else {
          __this.itemListScore[__this.itemListScore.length - 1].children.each(function (enemy) {
            if (enemy.y < customConfig.itemScore.y + 3 * customConfig.itemScore.marginTop) {
              allow = false;
              return;
            }
          })
        }

        //console.log(allow);
        if (allow) {
          if (isGlobal) {
            for (let i = 0; i < __this.itemListScoreGlobal.length; i++) {
              __this.itemListScoreGlobal[i].children.each(function (enemy) {
                __this.tweens.add({
                  targets: enemy,
                  y: enemy.y - 3.1 * customConfig.itemScore.marginTop,
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
          } else {
            for (let i = 0; i < __this.itemListScore.length; i++) {
              __this.itemListScore[i].children.each(function (enemy) {

                __this.tweens.add({
                  targets: enemy,
                  y: enemy.y - 3.1 * customConfig.itemScore.marginTop,
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

      } else if (touchY2 > touchY + 20) {
        isUp = false;
        let allow = true;
        if (isGlobal) {
          __this.itemListScoreGlobal[0].children.each(function (enemy) {
            if (enemy.y >= customConfig.itemScore.y - customConfig.itemScore.marginTop) {
              allow = false;
              return;
            }
          });
        } else {
          __this.itemListScore[0].children.each(function (enemy) {
            if (enemy.y >= customConfig.itemScore.y - customConfig.itemScore.marginTop) {
              allow = false;
              return;
            }
          });
        }

        //console.log(allow);
        if (allow) {
          if (isGlobal) {
            for (let i = 0; i < __this.itemListScoreGlobal.length; i++) {
              __this.itemListScoreGlobal[i].children.each(function (enemy) {
                __this.tweens.add({
                  targets: enemy,
                  y: enemy.y + 3 * customConfig.itemScore.marginTop,
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
          } else {
            for (let i = 0; i < __this.itemListScore.length; i++) {
              __this.itemListScore[i].children.each(function (enemy) {
                __this.tweens.add({
                  targets: enemy,
                  y: enemy.y + 3 * customConfig.itemScore.marginTop,
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

      }
    });
    this.music = this.sound.add('music');
    this.music.play();
    let listScoreOfFriends = this.registry.get("friendsScore");
    let listScoreOfGlobal = this.registry.get("friendsScoreGlobal");
    //console.log(listScoreOfFriends, listScoreOfGlobal);
    for (let i = 0; i < listScoreOfFriends.length; i++) {
      this.itemScore = this.add.image(customConfig.itemScore.x, customConfig.itemScore.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.key);
      this.setSize(this.itemScore, customConfig.itemScore.width, customConfig.itemScore.height);
      this.iconItemRank = this.add.image(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.iconMyRank.key + (i + 1 <= 3 ? ((i + 1) + "") : ""));
      this.setSize(this.iconItemRank, customConfig.itemScore.iconMyRank.width, customConfig.itemScore.iconMyRank.height);
      this.textItemRank = this.add.text(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y + i * customConfig.itemScore.iconMyRank.marginTop, ("" + (i + 1)), { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemRank);
      this.itemProfile = this.add.image(customConfig.itemScore.profile.x, customConfig.itemScore.profile.y + i * customConfig.itemScore.iconMyRank.marginTop, listScoreOfFriends[i].key);
      this.setSize(this.itemProfile, customConfig.itemScore.profile.width, customConfig.itemScore.profile.height);
      this.textItemName = this.add.text(customConfig.itemScore.profile.name.x, customConfig.itemScore.profile.name.y + i * customConfig.itemScore.iconMyRank.marginTop, listScoreOfFriends[i].name, { fontSize: customConfig.itemScore.profile.name.fontSize, fill: customConfig.itemScore.profile.name.colorText, fontFamily: customConfig.itemScore.profile.name.fontFamily });
      this.setCenter(this.textItemName);
      this.textItemScore = this.add.text(customConfig.itemScore.textMyScore.x, customConfig.itemScore.textMyScore.y + i * customConfig.itemScore.iconMyRank.marginTop, listScoreOfFriends[i].score, { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemScore);
      this.buttonItemFight = this.add.image(customConfig.itemScore.buttonItemFight.x, customConfig.itemScore.buttonItemFight.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.buttonItemFight.keyBackground);
      this.setSize(this.buttonItemFight, customConfig.itemScore.buttonItemFight.width, customConfig.itemScore.buttonItemFight.height);
      this.iconItemFight = this.add.image(customConfig.itemScore.buttonItemFight.icon.x, customConfig.itemScore.buttonItemFight.icon.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.buttonItemFight.icon.key);
      this.setSize(this.iconItemFight, customConfig.itemScore.buttonItemFight.icon.width, customConfig.itemScore.buttonItemFight.icon.height);
      this.buttonItemFight.setInteractive();
      this.buttonItemFight.on("pointerdown", function () {
        alert("fight with id: " + listScoreOfFriends[i].id);
      });
      this.iconItemFight.setInteractive();
      this.iconItemFight.on("pointerdown", function () {
        alert("fight with id: " + listScoreOfFriends[i].id);
      });

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
    for (let i = 0; i < listScoreOfGlobal.length; i++) {
      this.itemScore = this.add.image(customConfig.itemScore.x, customConfig.itemScore.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.key);
      this.setSize(this.itemScore, customConfig.itemScore.width, customConfig.itemScore.height);
      this.iconItemRank = this.add.image(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y + i * customConfig.itemScore.iconMyRank.marginTop, customConfig.itemScore.iconMyRank.key + (i + 1 <= 3 ? ((i + 1) + "") : ""));
      this.setSize(this.iconItemRank, customConfig.itemScore.iconMyRank.width, customConfig.itemScore.iconMyRank.height);
      this.textItemRank = this.add.text(customConfig.itemScore.iconMyRank.x, customConfig.itemScore.iconMyRank.y + i * customConfig.itemScore.iconMyRank.marginTop, ("" + (i + 1)), { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemRank);
      this.itemProfile = this.add.image(customConfig.itemScore.profile.x, customConfig.itemScore.profile.y + i * customConfig.itemScore.iconMyRank.marginTop, listScoreOfGlobal[i].key);
      this.setSize(this.itemProfile, customConfig.itemScore.profile.width, customConfig.itemScore.profile.height);
      this.textItemName = this.add.text(customConfig.itemScore.profile.name.x, customConfig.itemScore.profile.name.y + i * customConfig.itemScore.iconMyRank.marginTop, listScoreOfGlobal[i].name, { fontSize: customConfig.itemScore.profile.name.fontSize, fill: customConfig.itemScore.profile.name.colorText, fontFamily: customConfig.itemScore.profile.name.fontFamily });
      this.setCenter(this.textItemName);
      this.textItemScore = this.add.text(customConfig.itemScore.textMyScore.x, customConfig.itemScore.textMyScore.y + i * customConfig.itemScore.iconMyRank.marginTop, listScoreOfGlobal[i].score, { fontSize: customConfig.itemScore.iconMyRank.fontSize, fill: customConfig.itemScore.iconMyRank.colorText, fontFamily: customConfig.itemScore.iconMyRank.fontFamily });
      this.setCenter(this.textItemScore);
      this.groupItemScoreGlobal = this.add.group();
      this.groupItemScoreGlobal.add(this.itemScore);
      this.groupItemScoreGlobal.add(this.iconItemRank);
      this.groupItemScoreGlobal.add(this.textItemRank);
      this.groupItemScoreGlobal.add(this.itemProfile);
      this.groupItemScoreGlobal.add(this.textItemName);
      this.groupItemScoreGlobal.add(this.textItemScore);
      this.itemListScoreGlobal.push(this.groupItemScoreGlobal);
    }
    this.titleGame = this.add.image(customConfig.imgTitle.x, customConfig.imgTitle.y, customConfig.imgTitle.key);
    this.setSize(this.titleGame, customConfig.imgTitle.width, customConfig.imgTitle.height);

    this.imgCup = this.add.image(customConfig.cup.x, customConfig.cup.y, customConfig.cup.key);
    this.setSize(this.imgCup, customConfig.cup.width, customConfig.cup.height);

    this.btnfriendsScore = this.add.image(customConfig.btnfriendsScore.x, customConfig.btnfriendsScore.y, customConfig.btnfriendsScore.keyBackground);
    this.setSize(this.btnfriendsScore, customConfig.btnfriendsScore.width, customConfig.btnfriendsScore.height);
    this.btnfriendsScoreInactive = this.add.image(customConfig.btnfriendsScore.x, customConfig.btnfriendsScore.y, customConfig.btnfriendsScore.keyInactive);
    this.setSize(this.btnfriendsScoreInactive, customConfig.btnfriendsScore.width, customConfig.btnfriendsScore.height);
    this.btnfriendsScoreInactive.setAlpha(0);
    this.iconfriendsScore = this.add.image(customConfig.btnfriendsScore.xIcon, customConfig.btnfriendsScore.yIcon, customConfig.btnfriendsScore.key);
    this.setSize(this.iconfriendsScore, customConfig.btnfriendsScore.widthIcon, customConfig.btnfriendsScore.heightIcon);
    this.textIconFriendsScore = this.add.text(customConfig.btnfriendsScore.xTextIcon, customConfig.btnfriendsScore.yTextIcon, customConfig.btnfriendsScore.textIcon, { fontSize: customConfig.btnfriendsScore.fontSizeIcon, fill: customConfig.btnfriendsScore.colorText, fontFamily: customConfig.btnfriendsScore.fontFamily });
    this.setCenter(this.textIconFriendsScore);
    this.textFriendsScore = this.add.text(customConfig.btnfriendsScore.xText, customConfig.btnfriendsScore.yText, customConfig.btnfriendsScore.textContent, { fontSize: customConfig.btnfriendsScore.fontSize, fill: customConfig.btnfriendsScore.colorText, fontFamily: customConfig.btnfriendsScore.fontFamily });
    this.setCenter(this.textFriendsScore);

    this.btnGlobalScore = this.add.image(customConfig.btnGlobalScore.x, customConfig.btnGlobalScore.y, customConfig.btnGlobalScore.keyBackground);
    this.setSize(this.btnGlobalScore, customConfig.btnGlobalScore.width, customConfig.btnGlobalScore.height);
    this.btnGlobalScoreActive = this.add.image(customConfig.btnGlobalScore.x, customConfig.btnGlobalScore.y, customConfig.btnGlobalScore.keyActive);
    this.setSize(this.btnGlobalScoreActive, customConfig.btnGlobalScore.width, customConfig.btnGlobalScore.height);
    this.btnGlobalScoreActive.setAlpha(0);
    this.iconGlobalScore = this.add.image(customConfig.btnGlobalScore.xIcon, customConfig.btnGlobalScore.yIcon, customConfig.btnGlobalScore.key);
    this.setSize(this.iconGlobalScore, customConfig.btnGlobalScore.widthIcon, customConfig.btnGlobalScore.heightIcon);
    this.textIconGlobalScore = this.add.text(customConfig.btnGlobalScore.xTextIcon, customConfig.btnGlobalScore.yTextIcon, customConfig.btnGlobalScore.textIcon, { fontSize: customConfig.btnGlobalScore.fontSizeIcon, fill: customConfig.btnGlobalScore.colorText, fontFamily: customConfig.btnGlobalScore.fontFamily });
    this.setCenter(this.textIconGlobalScore);
    this.textGlobalScore = this.add.text(customConfig.btnGlobalScore.xText, customConfig.btnGlobalScore.yText, customConfig.btnGlobalScore.textContent, { fontSize: customConfig.btnGlobalScore.fontSize, fill: customConfig.btnGlobalScore.colorText, fontFamily: customConfig.btnGlobalScore.fontFamily });
    this.setCenter(this.textGlobalScore);
    // find info of me

    for (let i = 0; i < listScoreOfFriends.length; i++) {
      if (listScoreOfFriends[i].id == 1) {
        myScore = listScoreOfFriends[i];
        break;
      }
    }

    for (let i = 0; i < listScoreOfGlobal.length; i++) {
      if (listScoreOfGlobal[i].id == 1) {
        myScoreGlobal = listScoreOfGlobal[i];
        break;
      }
    }
    // this.myScore = this.add.image(customConfig.myScore.x, customConfig.myScore.y, customConfig.myScore.keyBackground);
    // this.setSize(this.myScore, customConfig.myScore.width, customConfig.myScore.height);
    // this.iconMyRank = this.add.image(customConfig.myScore.iconMyRank.x, customConfig.myScore.iconMyRank.y, customConfig.myScore.iconMyRank.key + (myScore.rank <= 3 ? myScore.rank + "" : ""));
    // this.setSize(this.iconMyRank, customConfig.myScore.iconMyRank.width, customConfig.myScore.iconMyRank.height);
    // this.textMyRank = this.add.text(customConfig.myScore.iconMyRank.x, customConfig.myScore.iconMyRank.y, myScore.rank + "", { fontSize: customConfig.myScore.iconMyRank.fontSize, fill: customConfig.myScore.iconMyRank.colorText, fontFamily: customConfig.myScore.iconMyRank.fontFamily });
    // this.setCenter(this.textMyRank);

    // this.iconMyRankGlobal = this.add.image(customConfig.myScore.iconMyRank.x, customConfig.myScore.iconMyRank.y, customConfig.myScore.iconMyRank.key + (myScoreGlobal.rank <= 3 ? myScoreGlobal.rank + "" : ""));
    // this.setSize(this.iconMyRankGlobal, customConfig.myScore.iconMyRank.width, customConfig.myScore.iconMyRank.height);
    // this.iconMyRankGlobal.setAlpha(0);

    // this.myProfile = this.add.image(customConfig.myScore.profile.x, customConfig.myScore.profile.y, myScore.key);
    // this.setSize(this.myProfile, customConfig.myScore.profile.width, customConfig.myScore.profile.height);
    // this.textMyName = this.add.text(customConfig.myScore.profile.name.x, customConfig.myScore.profile.name.y, myScore.name, { fontSize: customConfig.myScore.profile.name.fontSize, fill: customConfig.myScore.profile.name.colorText, fontFamily: customConfig.myScore.profile.name.fontFamily });
    // this.setCenter(this.textMyName);
    // this.textMyScore = this.add.text(customConfig.myScore.textMyScore.x, customConfig.myScore.textMyScore.y, myScore.score, { fontSize: customConfig.myScore.iconMyRank.fontSize, fill: customConfig.myScore.iconMyRank.colorText, fontFamily: customConfig.myScore.iconMyRank.fontFamily });
    // this.setCenter(this.textMyScore);

    // this.btnPlayWithFriends = this.add.image(customConfig.btnPlayWithFriends.x, customConfig.btnPlayWithFriends.y, customConfig.btnPlayWithFriends.keyBackground).setInteractive();
    // this.setSize(this.btnPlayWithFriends, customConfig.btnPlayWithFriends.width, customConfig.btnPlayWithFriends.height);
    // this.btnIconPlayWithFriends = this.add.image(customConfig.btnIconPlayWithFriends.x, customConfig.btnIconPlayWithFriends.y, customConfig.btnIconPlayWithFriends.keyBackground).setInteractive();
    // this.setSize(this.btnIconPlayWithFriends, customConfig.btnIconPlayWithFriends.width, customConfig.btnIconPlayWithFriends.height)
    // this.iconPlayWithFriends = this.add.image(customConfig.btnIconPlayWithFriends.x, customConfig.btnIconPlayWithFriends.y, customConfig.btnIconPlayWithFriends.key).setInteractive();
    // this.setSize(this.iconPlayWithFriends, customConfig.btnIconPlayWithFriends.widthIcon, customConfig.btnIconPlayWithFriends.heightIcon)
    // this.textPlayWithFriends = this.add.text(customConfig.btnPlayWithFriends.xText, customConfig.btnPlayWithFriends.y, customConfig.btnPlayWithFriends.textContent, { fontSize: customConfig.btnPlayWithFriends.fontSize, fill: customConfig.btnPlayWithFriends.colorText, fontFamily: customConfig.btnPlayWithFriends.fontFamily });
    // this.setCenter(this.textPlayWithFriends);

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

    for (let i = 0; i < this.itemListScoreGlobal.length; i++) {
      this.itemListScoreGlobal[i].children.each(function (enemy) {
        enemy.setAlpha(0);
      }, tmpthis);
    }

    this.btnfriendsScoreInactive.on("pointerdown", this.activeFriends, this);
    this.iconfriendsScore.setInteractive();
    this.iconfriendsScore.on("pointerdown", this.activeFriends, this);
    this.textFriendsScore.setInteractive();
    this.textFriendsScore.on("pointerdown", this.activeFriends, this);
    this.textIconFriendsScore.setInteractive();
    this.textIconFriendsScore.on("pointerdown", this.activeFriends, this);
    this.btnGlobalScore.on("pointerdown", this.activeGlobal, this);
    this.iconGlobalScore.setInteractive();
    this.iconGlobalScore.on("pointerdown", this.activeGlobal, this);
    this.textGlobalScore.setInteractive();
    this.textGlobalScore.on("pointerdown", this.activeGlobal, this);
    this.textIconGlobalScore.setInteractive();
    this.textIconGlobalScore.on("pointerdown", this.activeGlobal, this);

    // this.btnIconPlayWithFriends.on("pointerdown", this.playWithFriends, this);
    // this.btnIconPlayWithFriends.setAlpha(0);
    // this.iconPlayWithFriends.on("pointerdown", this.playWithFriends, this);
    // this.iconPlayWithFriends.setAlpha(0);
    // this.btnPlayWithFriends.setAlpha(0);
    // this.textPlayWithFriends.setAlpha(0);
    this.btnChooseSkin.on("pointerdown", this.openPopupChooseSkin, this);
    this.iconHelp.on("pointerdown", this.openPopupHelp, this);
    this.iconVolume.on("pointerdown", this.setMusic, this);
    this.iconVolumeMute.on("pointerdown", this.setMusic, this);

    //play game
    let tmp_this = this;
    this.btnPlayGame.on("pointerdown", this.playGame,this);
  }

  update(): void {
    if (this.iconChooseSkin) {
      this.iconChooseSkin.angle++;
    }
    if (this.currentSkin) {
      this.currentSkin.angle++;
    }
  }
  private initRegistry(): void {
    console.log("aaaaa");
    if (this.registry.get("skin")) {
      this.registry.set("skin", this.registry.get("skin"));
    } else {
      this.registry.set("skin", 0);
    }
    if (this.registry.get("friendsScore")) {
      this.registry.set("friendsScore", this.registry.get("friendsScore"));
    } else {
      let friendsScore = [
        {
          id: 1,
          rank: 1,
          name: "Nguyen",
          key: "profile",
          score: 100,
        }, {
          id: 2,
          rank: 2,
          name: "friend 2",
          key: "profile",
          score: 98,
        }, {
          id: 3,
          rank: 3,
          name: "friend 3",
          key: "profile",
          score: 90,
        }, {
          id: 4,
          rank: 4,
          name: "friend 4",
          key: "profile",
          score: 85,
        }, {
          id: 5,
          rank: 5,
          name: "friend 5",
          key: "profile",
          score: 80,
        }, {
          id: 6,
          rank: 6,
          name: "friend 6",
          key: "profile",
          score: 70,
        }, {
          id: 7,
          rank: 7,
          name: "friend 7",
          key: "profile",
          score: 60,
        }, {
          id: 8,
          rank: 8,
          name: "friend 8",
          key: "profile",
          score: 60,
        }, {
          id: 9,
          rank: 9,
          name: "friend 9",
          key: "profile",
          score: 50,
        }, {
          id: 10,
          rank: 10,
          name: "friend 10",
          key: "profile",
          score: 20,
        }
      ];
      this.registry.set("friendsScore", friendsScore);

    }

    if (this.registry.get("friendsScoreGlobal")) {
      this.registry.set("friendsScoreGlobal", this.registry.get("friendsScoreGlobal"));
    } else {
      let friendsScoreGlobal = [
        {
          id: 2,
          rank: 1,
          name: "global 1",
          key: "profile",
          score: 120,
        }, {
          id: 1,
          rank: 2,
          name: "Nguyen",
          key: "profile",
          score: 100,
        }, {
          id: 3,
          rank: 3,
          name: "global 3",
          key: "profile",
          score: 90,
        }, {
          id: 4,
          rank: 4,
          name: "global 4",
          key: "profile",
          score: 85,
        }, {
          id: 5,
          rank: 5,
          name: "global 5",
          key: "profile",
          score: 80,
        }, {
          id: 6,
          rank: 6,
          name: "global 6",
          key: "profile",
          score: 70,
        }, {
          id: 7,
          rank: 7,
          name: "global 7",
          key: "profile",
          score: 65,
        }, {
          id: 8,
          rank: 8,
          name: "global 8",
          key: "profile",
          score: 60,
        }, {
          id: 9,
          rank: 9,
          name: "global 9",
          key: "profile",
          score: 50,
        }, {
          id: 10,
          rank: 10,
          name: "global 10",
          key: "profile",
          score: 20,
        }
      ];
      this.registry.set("friendsScoreGlobal", friendsScoreGlobal);
    }
    this.mySkins = [1, 1538038410, 0, 0, 0, 0, 0, 0, 0, 1];
    this.registry.set("highscore", [0, 0, 0, 0, 0]);
  }
  private playGame():void{
    try{
      this.scene.start("GameScene");
    }catch(Exception){
      alert("error");
    }    
  }
  private playWithFriends(): void {
    alert("show popup friends list from IA API after");
  }
  private activeFriends(): void {
    isGlobal = false;
    this.btnfriendsScore.setAlpha(1);
    this.btnfriendsScoreInactive.setAlpha(0);
    this.btnGlobalScore.setAlpha(1);
    this.btnGlobalScoreActive.setAlpha(0);
    this.iconMyRank.setAlpha(1);
    this.iconMyRankGlobal.setAlpha(0);
    this.textMyRank.setText(myScore.rank);
    this.textMyScore.setText(myScore.score);
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
    for (let i = 0; i < this.itemListScoreGlobal.length; i++) {
      this.itemListScoreGlobal[i].children.each(function (enemy) {
        enemy.setAlpha(0);
      }, this);
    }
  }
  private activeGlobal(): void {
    //console.log(1);
    isGlobal = true;
    this.btnfriendsScore.setAlpha(0);
    this.btnfriendsScoreInactive.setAlpha(1);
    this.btnGlobalScore.setAlpha(0);
    this.btnGlobalScoreActive.setAlpha(1);
    this.iconMyRank.setAlpha(0);
    this.iconMyRankGlobal.setAlpha(1);
    this.textMyRank.setText(myScoreGlobal.rank);
    this.textMyScore.setText(myScoreGlobal.score);
    let tmpthis = this;
    for (let i = 0; i < this.itemListScoreGlobal.length; i++) {
      this.itemListScoreGlobal[i].children.each(function (enemy) {
        if (enemy.y <= tmpthis.myScore.y || enemy.y >= tmpthis.btnPlayWithFriends.y) {
          enemy.setAlpha(0);
        } else {
          enemy.setAlpha(1);
        }
      }, tmpthis);
    }
    for (let i = 0; i < this.itemListScore.length; i++) {
      this.itemListScore[i].children.each(function (enemy) {
        enemy.setAlpha(0);
      }, this);
    }

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
  private checkToSetScale(item, x_new, check): void {
    let center = customConfig.sliderSkin.item.x;
    let limitprev1 = customConfig.sliderSkin.item.x + 3 * customConfig.sliderSkin.item.padding;
    let limitnext1 = customConfig.sliderSkin.item.x - 3 * customConfig.sliderSkin.item.padding;
    let limitprev2 = customConfig.sliderSkin.item.x + 2 * customConfig.sliderSkin.item.padding;
    let limitnext2 = customConfig.sliderSkin.item.x - 2 * customConfig.sliderSkin.item.padding;
    if (x_new == center) {
      item.setScale(1.4);
      item.setAlpha(1);
      this.currentSkin = item;
      let ind = item.frame.name;
      let old = this.textPopup.text;
      this.btnOKPopup.setAlpha(0);
      this.btnWatch.setAlpha(0);
      this.btnInvite.setAlpha(0);
      if (this.mySkins[ind] >= 1) {
        this.btnOKPopup.setAlpha(1);
        if (this.mySkins[ind] == 1) {
          this.textPopup.setText("OK");
        } else {
          this.textPopup.setText("OK");
        }
      } else {
        if (customConfig.skin[ind].type == 0) {
          this.btnOKPopup.setAlpha(1);
          this.textPopup.setText("OK");
        } else if (customConfig.skin[ind].type == 1) {
          this.btnWatch.setAlpha(1);
          this.textPopup.setText("Watch");
        } else {
          this.textPopup.setText("Invite");
          this.btnInvite.setAlpha(1);
        }
      }
      if (this.textPopup.text != old) {
        console.log("khax");
        this.textPopup.x = item.x / 1.4 - this.textPopup.width / 2;
      }

      // console.log(this.textPopup.x)
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
    if (check) {
      window.setTimeout(function () {
        hasClick = true;
      }, 700);
    }
  }
  private findNext() {
    let rs;
    let cmp = parseInt(customConfig.sliderSkin.item.x + customConfig.sliderSkin.item.padding + "");
    //console.log(this.itemSlideSkin.frame.name);
    if (this.itemSlideSkin.x == cmp) {
      rs = this.iconChooseSkin.frame.name;
      //console.log("main");
    } else if (this.itemSlideSkinNext.x == cmp) {
      rs = this.itemSlideSkinNext.frame.name;
      //console.log("next");
    } else if (this.itemSlideSkinNextTmp.x == cmp) {
      rs = this.itemSlideSkinNextTmp.frame.name;
      //console.log("nexttmp");
    } else if (this.itemSlideSkinPrev.x == cmp) {
      rs = this.itemSlideSkinPrev.frame.name;
      //console.log("prev");
    } else if (this.itemSlideSkinPrevTmp.x == cmp) {
      rs = this.itemSlideSkinPrevTmp.frame.name;
      //console.log("prevtmp");
    }

    //console.log(rs);
    return rs + 1 > this.numSkin ? 0 : rs + 1;
  }
  private dragSlide(type, prevtmp, prev, main, next, nexttmp): void {
    //console.log(prevtmp, prev, main, next, nexttmp);
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
        nextIfType = this.itemSlideSkinPrevTmp.frame.name;
        if (nextIfType == this.numSkin - 1) {
          nextIfType = 0;
        } else if (nextIfType == this.numSkin) {
          nextIfType = 1;
        } else {
          nextIfType += 2;
        }
        this.itemSlideSkin.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinNext.x <= limitnext) {
        this.itemSlideSkinNext.x = limitprev1;
        nextIfType = this.itemSlideSkinPrev.frame.name;
        if (nextIfType == this.numSkin - 1) {
          nextIfType = 0;
        } else if (nextIfType == this.numSkin) {
          nextIfType = 1;
        } else {
          nextIfType += 2;
        }
        this.itemSlideSkinNext.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinNextTmp.x <= limitnext) {
        this.itemSlideSkinNextTmp.x = limitprev1;
        nextIfType = this.itemSlideSkin.frame.name;
        if (nextIfType == this.numSkin - 1) {
          nextIfType = 0;
        } else if (nextIfType == this.numSkin) {
          nextIfType = 1;
        } else {
          nextIfType += 2;
        }
        this.itemSlideSkinNextTmp.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinPrev.x <= limitnext) {
        this.itemSlideSkinPrev.x = limitprev1;
        nextIfType = this.itemSlideSkinNextTmp.frame.name;
        if (nextIfType == this.numSkin - 1) {
          nextIfType = 0;
        } else if (nextIfType == this.numSkin) {
          nextIfType = 1;
        } else {
          nextIfType += 2;
        }
        this.itemSlideSkinPrev.anims.play('' + nextIfType, true);
      }
      if (this.itemSlideSkinPrevTmp.x <= limitnext) {
        this.itemSlideSkinPrevTmp.x = limitprev1;
        nextIfType = this.itemSlideSkinNext.frame.name;
        if (nextIfType == this.numSkin - 1) {
          nextIfType = 0;
        } else if (nextIfType == this.numSkin) {
          nextIfType = 1;
        } else {
          nextIfType += 2;
        }
        this.itemSlideSkinPrevTmp.anims.play('' + nextIfType, true);
      }
      //console.log(nextIfType);
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
        this.itemSlideSkinPrevTmp.anims.play('' + prevIfType, true);
      }
      x_main = this.itemSlideSkin.x + customConfig.sliderSkin.item.padding;
      x_next = this.itemSlideSkinNext.x + customConfig.sliderSkin.item.padding;
      x_prev = this.itemSlideSkinPrev.x + customConfig.sliderSkin.item.padding;
      x_nexttmp = this.itemSlideSkinNextTmp.x + customConfig.sliderSkin.item.padding;
      x_prevtmp = this.itemSlideSkinPrevTmp.x + customConfig.sliderSkin.item.padding;

    }
    let _this = this;
    this.tweens.add({
      targets: this.itemSlideSkin,
      x: x_main,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onStart: this.prepareDrag(_this.itemSlideSkin),
      onComplete: this.checkToSetScale(_this.itemSlideSkin, x_main, 0)
    });

    this.tweens.add({
      targets: this.itemSlideSkinPrev,
      x: x_prev,
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onStart: this.prepareDrag(_this.itemSlideSkinPrev),
      onComplete: this.checkToSetScale(_this.itemSlideSkinPrev, x_prev, 0)
    });
    this.tweens.add({
      targets: this.itemSlideSkinNext,
      x: x_next,
      onStart: this.prepareDrag(_this.itemSlideSkinNext),
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onComplete: this.checkToSetScale(_this.itemSlideSkinNext, x_next, 0)
    });
    this.tweens.add({
      targets: this.itemSlideSkinNextTmp,
      x: x_nexttmp,
      onStart: this.prepareDrag(_this.itemSlideSkinNextTmp),
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onComplete: this.checkToSetScale(_this.itemSlideSkinNextTmp, x_nexttmp, 0)
    });
    this.tweens.add({
      targets: this.itemSlideSkinPrevTmp,
      x: x_prevtmp,
      onStart: this.prepareDrag(_this.itemSlideSkinPrevTmp),
      ease: customConfig.sliderSkin.item.ease,
      duration: customConfig.sliderSkin.item.duration,
      delay: 0,
      onComplete: this.checkToSetScale(_this.itemSlideSkinPrevTmp, x_prevtmp, 1)
    });
  }
  private closePopupSkin(): void {
    this.backgroundPopup.destroy();
    this.btnOKPopup.destroy();
    this.btnClosePopup.destroy();
    this.btnNext.destroy();
    this.btnPrev.destroy();
    this.itemSlideSkin.destroy();
    this.itemSlideSkinPrev.destroy();
    this.itemSlideSkinNext.destroy();
    this.itemSlideSkinPrevTmp.destroy();
    this.itemSlideSkinNextTmp.destroy();
    this.iconClosePopup.destroy();
    this.textPopup.destroy();
    this.textTitlePopup.destroy();
    this.btnWatch.destroy();
    this.btnInvite.destroy();
    this.msgBox.destroy();
  }
  private activeSkin(): void {
    this.btnOKPopup.setAlpha(1);
    this.btnWatch.setAlpha(0);
    this.btnInvite.setAlpha(0);
    this.textPopup.setText("OK");
    this.textPopup.x = this.currentSkin.x / 1.4 - this.textPopup.width / 2;
  }
  private dragSlideHelp(type, ind): void {
    console.log(ind);
    let start;
    if (type == 1) {
      start = customConfig.sliderHelp.item.x - 300;
    } else {
      start = customConfig.sliderHelp.item.x + 300;
    }
    let tmp = this;
    this.tweens.add({
      targets: tmp.listItemSlideHelp[ind],
      x: customConfig.sliderHelp.item.x,
      duration: 300,
      ease: 'Power1',
      onStart: function () {
        tmp.listItemSlideHelp[ind].x = start;
      },
      onComplete: function () {
        tmp.currentHelp.setAlpha(0);
        tmp.currentHelp = tmp.listItemSlideHelp[ind];
        tmp.currentHelp.setAlpha(1);
        if (ind == 3) {
          tmp.btnNextHelp.setAlpha(0);
        } else {
          tmp.btnNextHelp.setAlpha(1);
        }
        if (ind == 0) {
          tmp.btnPrevHelp.setAlpha(0);
        } else {
          tmp.btnPrevHelp.setAlpha(1);
        }

      }
    });

  }
  private openPopupHelp(): void {
    let current = 0;

    this.msgHelp = this.add.group();
    this.backgroundPopupHelp = this.add.image(customConfig.sliderHelp.background.x, customConfig.sliderHelp.background.y, customConfig.sliderHelp.background.key);
    this.backgroundPopupHelp.width = customConfig.sliderHelp.background.width;
    this.backgroundPopupHelp.height = customConfig.sliderHelp.background.height;
    this.btnClosePopupHelp = this.add.image(this.backgroundPopupHelp.width - customConfig.sliderHelp.btnClose.paddingRight, customConfig.sliderHelp.btnClose.paddingTop, customConfig.sliderHelp.btnClose.key).setInteractive();
    this.iconClosePopupHelp = this.add.image(this.backgroundPopupHelp.width - customConfig.sliderHelp.btnClose.paddingRight, customConfig.sliderHelp.btnClose.paddingTop, customConfig.sliderHelp.iconClose.key).setInteractive();
    this.setSize(this.btnClosePopupHelp, customConfig.sliderHelp.btnClose.width, customConfig.sliderHelp.btnClose.width);
    this.setSize(this.iconClosePopupHelp, customConfig.sliderHelp.iconClose.width, customConfig.sliderHelp.iconClose.width);
    this.listItemSlideHelp = [];
    for (let i = 1; i <= 4; i++) {
      this.itemSlideHelp = this.add.sprite(customConfig.sliderHelp.item.x, customConfig.sliderHelp.item.y, customConfig.sliderHelp.item.key[i]).setInteractive();
      this.setSize(this.itemSlideHelp, customConfig.sliderHelp.item.width, customConfig.sliderHelp.item.width);
      if (i > 1) {
        this.itemSlideHelp.setAlpha(0);
      }
      this.listItemSlideHelp.push(this.itemSlideHelp);
    }
    this.currentHelp = this.listItemSlideHelp[0];
    this.textTitlePopupHelp = this.add.text(this.itemSlideHelp.x, customConfig.sliderHelp.title.y, "Help", { fontSize: customConfig.btnfriendsScore.fontSize * 2.5, fill: "black", fontFamily: customConfig.btnfriendsScore.fontFamily });
    this.setCenter(this.textTitlePopupHelp);
    this.btnNextHelp = this.add.image(customConfig.sliderHelp.btnNext.x, customConfig.sliderHelp.btnNext.y, customConfig.sliderHelp.btnNext.key).setInteractive();
    this.btnPrevHelp = this.add.image(customConfig.sliderHelp.btnPrev.x, customConfig.sliderHelp.btnPrev.y, customConfig.sliderHelp.btnPrev.key).setInteractive();
    let tmp = this;
    this.btnNextHelp.on("pointerdown", function () {
      ++current;
      tmp.dragSlideHelp(1, current);
    })

    this.msgHelp.add(this.backgroundPopupHelp);
    this.msgHelp.add(this.iconClosePopupHelp);
    this.msgHelp.add(this.itemSlideHelp);
    this.msgHelp.add(this.textTitlePopupHelp);
    this.msgHelp.add(this.btnClosePopupHelp);
    this.msgHelp.add(this.btnNextHelp);
    this.msgHelp.add(this.btnPrevHelp);
    this.iconClosePopupHelp.on("pointerdown", function () {
      tmp.msgHelp.children.each(function (enemy) {
        enemy.destroy();
      });
      tmp.currentHelp.destroy();
    })

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
    this.btnOKPopup = this.add.sprite(this.itemSlideSkin.x, this.backgroundPopup.height - customConfig.sliderSkin.btnOK.paddingBottom, customConfig.sliderSkin.btnOK.keyO).setInteractive();
    this.btnWatch = this.add.sprite(this.itemSlideSkin.x, this.backgroundPopup.height - customConfig.sliderSkin.btnOK.paddingBottom, customConfig.sliderSkin.btnOK.keyO).setInteractive();
    this.btnInvite = this.add.sprite(this.itemSlideSkin.x, this.backgroundPopup.height - customConfig.sliderSkin.btnOK.paddingBottom, customConfig.sliderSkin.btnOK.keyB).setInteractive();
    this.textTitlePopup = this.add.text(this.itemSlideSkin.x, customConfig.sliderSkin.title.y, "Skins", { fontSize: customConfig.btnfriendsScore.fontSize * 3, fill: "black", fontFamily: customConfig.btnfriendsScore.fontFamily });
    this.setCenter(this.textTitlePopup);
    this.textPopup = this.add.text(this.itemSlideSkin.x, this.backgroundPopup.height - customConfig.sliderSkin.btnOK.paddingBottom, "OK", { fontSize: customConfig.btnfriendsScore.fontSize * 2, fill: "white", fontFamily: customConfig.btnfriendsScore.fontFamily });
    this.setCenter(this.textPopup);
    this.setSize(this.btnOKPopup, customConfig.sliderSkin.btnOK.width, customConfig.sliderSkin.btnOK.width);
    this.setSize(this.btnWatch, customConfig.sliderSkin.btnOK.width, customConfig.sliderSkin.btnOK.width);
    this.setSize(this.btnInvite, customConfig.sliderSkin.btnOK.width, customConfig.sliderSkin.btnOK.width);

    this.btnWatch.setAlpha(0);
    this.btnInvite.setAlpha(0);
    this.itemSlideSkinNext.setAlpha(0);
    this.itemSlideSkinNextTmp.setAlpha(0);
    this.itemSlideSkinPrev.setAlpha(0);
    this.itemSlideSkinPrevTmp.setAlpha(0);

    this.itemSlideSkinPrevTmp.anims.play('' + (this.numSkin - 1), true);
    this.itemSlideSkinPrev.anims.play('' + this.numSkin, true);
    this.itemSlideSkin.anims.play('0', true);
    this.itemSlideSkin.setScale(1.4);
    this.currentSkin = this.itemSlideSkin;
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
      tmp.closePopupSkin();
      tmp.registry.set("skin", current);
      tmp.iconChooseSkin.anims.play('' + current, true);
      tmp.setSize(tmp.iconChooseSkin, customConfig.btnChooseSkin.widthIcon, customConfig.btnChooseSkin.heightIcon);
    });
    this.btnWatch.on("pointerdown", function () {
      if (window.confirm('watch ads and active skin' + current)) {
        tmp.activeSkin();
      }
    })
    this.btnInvite.on("pointerdown", function () {
      if (window.confirm('invite friends and active skin' + current)) {
        tmp.activeSkin();
      }
    })
    this.iconClosePopup.on("pointerdown", function () {
      tmp.closePopupSkin();
    });
    let prev;
    let main;
    let next;
    let prevtmp;
    let nexttmp;
    this.btnNext.on("pointerdown", function () {
      //console.log(hasClick);
      if (hasClick) {
        if (current >= tmp.numSkin) {
          current = 0;
          //console.log(1);
        }
        current++;
        main = current;
        prev = current - 1 < 0 ? tmp.numSkin : current - 1;
        next = current + 1 > tmp.numSkin ? 0 : current + 1;
        prevtmp = prev - 1 < 0 ? tmp.numSkin : prev - 1;
        nexttmp = next + 1 > tmp.numSkin ? 0 : next + 1;
        hasClick = false;
        tmp.dragSlide("next", prevtmp, prev, main, next, nexttmp);
      }
    });
    this.btnPrev.on("pointerdown", function () {
      if (hasClick) {
        if (current <= 0) {
          current = tmp.numSkin;
        }
        current--;
        main = current;
        prev = current - 1 < 0 ? tmp.numSkin : current - 1;
        next = current + 1 > tmp.numSkin ? 0 : current + 1;
        prevtmp = prev - 1 < 0 ? tmp.numSkin : prev - 1;
        nexttmp = next + 1 > tmp.numSkin ? 0 : next + 1;
        hasClick = false;
        tmp.dragSlide("prev", prevtmp, prev, main, next, nexttmp);
      }
    });
  }
  private generateHexColor() {
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
  }
}