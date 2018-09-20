
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
  private w_cs;
  private h_cs;
  private group1;
  private group2;
  private char1;
  private char2;
  private slider;
  constructor() {
    super({
      key: "MenuScene"
    });
    this.w_cs = 734;
    this.h_cs = 551;
  }
  preload(): void {
    this.load.image("play", "./src/games/ver1/assets/play.png");
    this.load.image("playwfriends", "./src/games/ver1/assets/playfriends.png");
    this.load.image("cup", "./src/games/ver1/assets/cup.png");
    this.load.image('skin', './src/games/ver1/assets/skinl.png');
    // this.load.image('ok', './src/games/ver1/assets/ok.png');
    this.load.image('close', './src/games/ver1/assets/close.png');
    this.load.image('background', './src/games/ver1/assets/backpopup.png');
    // this.load.image('next', './src/games/ver1/assets/next.png');
    // this.load.image('prev', './src/games/ver1/assets/prev.png');
    this.load.image('menuskin', './src/games/ver1/assets/menuskin.png');
    this.load.spritesheet('listskin', './src/games/ver1/assets/skin.png', { frameWidth: 36.5, frameHeight: 36 });
    this.load.image("ball", "./src/games/ver1/assets/ball.png");
    this.load.image("ball1", "./src/games/ver1/assets/ball11.png");
    this.load.image("prev", "./src/games/ver1/assets/arrow1.png");
    this.load.image("next", "./src/games/ver1/assets/arrow2.png");
    this.load.image("ok", "./src/games/ver1/assets/stripe.png");
  }
  init(): void {
    this.initRegistry();
  }

  create(): void {
    // alert(parseInt(this.w_cs) + " == " + this.h_cs);
    this.holes = this.add.text(parseInt(this.w_cs) / 2 - 60, 50, "HOLES", { fontSize: '60px', fill: 'black' });
    this.imgCup = this.add.image(parseInt(this.w_cs) / 2 - 60 + this.holes.width / 2, 160, 'cup');
    this.btnPlayWithFriends = this.add.image(parseInt(this.w_cs) / 2 + 30, parseInt(this.w_cs) / 2 + 75, 'playwfriends').setInteractive();
    this.btnChooseSkin = this.add.image(parseInt(this.w_cs) / 2 - 100, parseInt(this.w_cs) / 2 + 150, 'skin').setInteractive();
    this.btnPlayGame = this.add.image(parseInt(this.w_cs) / 2 + 160, parseInt(this.w_cs) / 2 + 150, 'play').setInteractive();
    // this.imgCup.setOrigin(0,0)
    //load highscore
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
    if(this.playerSkin){
      this.playerSkin.angle++;
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
    this.btnClosePopup = this.add.image(this.backgroundPopup.width - 5, 50, "close").setInteractive();

    //load btn next, prev, menu
    this.btnNext = this.add.image(this.backgroundPopup.width - 50, this.backgroundPopup.height / 2, "next").setInteractive();
    this.btnPrev = this.add.image(100, this.backgroundPopup.height / 2, "prev").setInteractive();
    this.menuSkin = this.add.image(this.backgroundPopup.width / 2 + 20, this.backgroundPopup.height / 2, "menuskin").setInteractive();
    this.playerSkin = this.add.sprite(this.backgroundPopup.width / 2 + 10, this.backgroundPopup.height / 2 - 5, "listskin").setInteractive();
    this.playerSkin2 = this.add.sprite(this.backgroundPopup.width / 2 + 100, this.backgroundPopup.height / 2 - 5, "listskin").setInteractive();
    
    this.anims.create({
      key: '0',
      frames: [{ key: 'listskin', frame: 0 }],
      frameRate: 20
    });
    this.anims.create({
      key: '1',
      frames: [{ key: 'listskin', frame: 1 }],
      frameRate: 20
    });
    this.playerSkin.anims.play('0', true);
    this.playerSkin.setDisplaySize(100,100);
    this.playerSkin2.anims.play('1', true);
    //add the elements to the group
    this.msgBox.add(this.backgroundPopup);
    this.msgBox.add(this.btnOKPopup);
    this.msgBox.add(this.btnClosePopup);
    let tmp = this;
    this.btnOKPopup.on("pointerdown", function () {
      tmp.registry.set("skin", 1);
      tmp.backgroundPopup.destroy();
      tmp.btnOKPopup.destroy();
      tmp.btnClosePopup.destroy();
      tmp.btnNext.destroy();
      tmp.btnPrev.destroy();
      tmp.menuSkin.destroy();
      tmp.playerSkin.destroy();
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
      tmp.menuSkin.destroy();
      tmp.playerSkin.destroy();
      tmp.msgBox.destroy();
      console.log(tmp.registry.get("skin"));
    });
    this.btnNext.on("pointerdown", function () {
      current++;
      if (current < 2) {
        tmp.playerSkin.anims.play('' + current, true);
        tmp.playerSkin.setDisplaySize(100,100);
        tmp.playerSkin2.anims.play('' + ((current+1)%2),true);
      } else {
        current = tmp.registry.get("skin");
      }
    });
    this.btnPrev.on("pointerdown", function () {
      current--;
      if (current >= 0) {
        tmp.playerSkin.anims.play('' + current, true);
        tmp.playerSkin.setDisplaySize(100,100);
        tmp.playerSkin2.anims.play('' + ((current+1)%2),true);
      } else {
        current = tmp.registry.get("skin");
      }
    });
  }
  private generateHexColor() {
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
  }
}