import { AssetsMenu, customConfig } from '../const/config';
let listAsset = AssetsMenu;
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
  private menuSkin;
  private playerSkin;
  private playerSkin2;
  private playerSkin1;
  private w_cs;
  private h_cs;
  private group1;
  private group2;
  private char1;
  private char2;
  private slider;
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
  init(): void {
    this.initRegistry();
  }

  create(): void {
    this.holes = this.add.text(parseInt(this.w_cs) / 2 - 60, 20, "HOLES", { fontSize: '60px', fill: 'black' });
    this.imgCup = this.add.image(parseInt(this.w_cs) / 2 - 60 + this.holes.width / 2, 105, 'cup');
    this.listHighScore = this.add.group();
    let tmp_i;
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
      this.listHighScore.add(this.add.text(parseInt(this.w_cs) / 2 - 120, this.imgCup.y + this.imgCup.height + i * 32, tmp_i + 'User ' + (i + 1) + ".............." + this.registry.get("highscore")[i], { font: "32px Arial", fill: "black", backgroundColor: this.generateHexColor() }));
    }
    this.btnPlayWithFriends = this.add.image(parseInt(this.w_cs) / 2 + 30, this.imgCup.y + 6 * 32 + 50, 'playwfriends').setInteractive();
    this.btnChooseSkin = this.add.image(parseInt(this.w_cs) / 2 - 100, this.imgCup.y + 6 * 32 + 100 + this.btnPlayWithFriends.height, 'skin').setInteractive();
    this.btnPlayGame = this.add.image(parseInt(this.w_cs) / 2 + 160, this.imgCup.y + 6 * 32 + 100 + this.btnPlayWithFriends.height, 'play').setInteractive();


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
    if (this.playerSkin) {
      this.playerSkin.angle++;
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

  private openPopupChooseSkin(): void {
    let current = this.registry.get("skin");
    //make a group to hold all the elements
    this.msgBox = this.add.group();
    //load background Popup
    this.backgroundPopup = this.add.image(parseInt(this.w_cs) / 2 + 30, parseInt(this.h_cs) / 2 + 25, "background");
    this.backgroundPopup.width = parseInt(this.w_cs);
    let h = (parseInt(this.h_cs) - 5);
    this.backgroundPopup.height = h;
    this.backgroundPopup.setDisplaySize(parseInt(this.w_cs), h);

    //load btn OK and close
    this.btnOKPopup = this.add.image(this.backgroundPopup.width / 2, this.backgroundPopup.height - 50, "ok").setInteractive();
    this.btnClosePopup = this.add.image(this.backgroundPopup.width - 50, 50, "close").setInteractive();

    //load btn next, prev, menu
    this.btnNext = this.add.image(this.backgroundPopup.width - 100, this.backgroundPopup.height / 2, "next").setInteractive();
    this.btnPrev = this.add.image(100, this.backgroundPopup.height / 2, "prev").setInteractive();
    // this.menuSkin = this.add.image(this.backgroundPopup.width / 2 + 20, this.backgroundPopup.height / 2, "menuskin").setInteractive();
    this.playerSkin = this.add.sprite(this.backgroundPopup.width / 2 , this.backgroundPopup.height / 2 - 5, "planets").setInteractive();
    this.playerSkin2 = this.add.sprite(this.backgroundPopup.width / 2 + 200, this.backgroundPopup.height / 2 - 5, "planets").setInteractive();
    this.playerSkin1 = this.add.sprite(this.backgroundPopup.width / 2 - 200, this.backgroundPopup.height / 2 - 5, "planets").setInteractive();
    for(let i=0; i< 10; i++){
      this.anims.create({
        key: '' + i,
        frames: [{ key: 'planets', frame: i }],
        frameRate: 10
      });
    }
    // this.anims.create({
    //   key: '0',
    //   frames: [{ key: 'planets', frame: 0 }],
    //   frameRate: 10
    // });
    // this.anims.create({
    //   key: '1',
    //   frames: [{ key: 'planets', frame: 1 }],
    //   frameRate: 10
    // });
    // this.anims.create({
    //   key: '2',
    //   frames: [{ key: 'planets', frame: 2 }],
    //   frameRate: 10
    // });
    // this.anims.create({
    //   key: '3',
    //   frames: [{ key: 'planets', frame: 3 }],
    //   frameRate: 10
    // });
    this.playerSkin.anims.play('0', true);
    this.playerSkin.anims.play('1', true);
    this.playerSkin.setScale(1.5);
    this.playerSkin2.anims.play('2', true);
    this.playerSkin2.setAlpha(0.4);
    this.playerSkin1.setAlpha(0.4);
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
      // tmp.menuSkin.destroy();
      tmp.playerSkin.destroy();
      tmp.playerSkin1.destroy();
      tmp.playerSkin2.destroy();
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
      // tmp.menuSkin.destroy();
      tmp.playerSkin.destroy();
      tmp.playerSkin1.destroy();
      tmp.playerSkin2.destroy();
      tmp.msgBox.destroy();
      console.log(tmp.registry.get("skin"));
    });
    this.btnNext.on("pointerdown", function () {
      current++;
      if (current <= 9) {
        console.log(current - 1 + " - " + current + " - " + (current + 1));
        tmp.playerSkin.anims.play('' + current, true);
        // tmp.playerSkin.setScale(1.5);
        tmp.playerSkin2.anims.play('' + ((current + 1 > 9 ? 0 : current + 1)), true);
        tmp.playerSkin1.anims.play('' + ((current - 1)), true);
        tmp.playerSkin2.setAlpha(0.4);
        tmp.playerSkin1.setAlpha(0.4);
        tmp.playerSkin.x = tmp.backgroundPopup.width / 2 - 50;
        tmp.playerSkin1.x = tmp.backgroundPopup.width / 2 - 250;
        tmp.playerSkin2.x = tmp.backgroundPopup.width / 2 + 50;
        tmp.tweens.add({
          targets: tmp.playerSkin,
          x: tmp.backgroundPopup.width / 2,
          ease: 'Power2',
          duration: 200,
          delay: 0,
          onStart: function () {
            tmp.playerSkin.setScale(1);
          },
          onComplete: function () {
            tmp.playerSkin.setScale(1.4);
          }
        });

        tmp.tweens.add({
          targets: tmp.playerSkin1,
          x: tmp.backgroundPopup.width / 2 - 200,
          ease: 'Power1',
          duration: 250,
          delay: 0,
        });
        tmp.tweens.add({
          targets: tmp.playerSkin2,
          x: tmp.backgroundPopup.width / 2 + 200,
          ease: 'Power1',
          duration: 250,
          delay: 0,
        });
        // tmp.tweens.add({
        //   targets: tmp.playerSkin1,
        //   x: tmp.backgroundPopup.width / 2 + 10,
        //   ease: 'Power1',
        //   duration: 250,
        //   delay: 0,
        //   onStart: function () {
        //     tmp.playerSkin.setScale(1);
        //   },
        //   onComplete: function (){
        //     tmp.playerSkin.setScale(1.4);
        //   }
        // });
      } else {
        current = tmp.registry.get("skin");
      }
    });
    this.btnPrev.on("pointerdown", function () {
      current--;
      console.log(current - 1 + " - " + current + " - " + (current + 1));
      if (current >= 0) {
        tmp.playerSkin.anims.play('' + current, true);
        tmp.playerSkin2.anims.play('' + ((current + 1)), true);
        tmp.playerSkin1.anims.play('' + ((current - 1 < 0 ? 3 : current - 1)), true);
        tmp.playerSkin2.setAlpha(0.4);
        tmp.playerSkin1.setAlpha(0.4);
        tmp.playerSkin.x = tmp.backgroundPopup.width / 2 + 50;
        tmp.playerSkin1.x = tmp.backgroundPopup.width / 2 - 150;
        tmp.playerSkin2.x = tmp.backgroundPopup.width / 2 + 250;
        tmp.tweens.add({
          targets: tmp.playerSkin,
          x: tmp.backgroundPopup.width / 2,
          ease: 'Power2',
          duration: 200,
          delay: 0,
          onStart: function () {
            tmp.playerSkin.setScale(1);
          },
          onComplete: function () {
            tmp.playerSkin.setScale(1.4);
          }
        });
        tmp.tweens.add({
          targets: tmp.playerSkin1,
          x: tmp.backgroundPopup.width / 2 - 200,
          ease: 'Power1',
          duration: 250,
          delay: 0,
        });
        tmp.tweens.add({
          targets: tmp.playerSkin2,
          x: tmp.backgroundPopup.width / 2 + 200,
          ease: 'Power1',
          duration: 250,
          delay: 0,
        });
      } else {
        current = tmp.registry.get("skin");
      }
    });
  }
  private generateHexColor() {
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
  }
}