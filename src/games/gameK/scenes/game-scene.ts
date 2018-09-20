
export class GameScene extends Phaser.Scene {
    private background;
    private s_circle;
    private circle;
    private circles;
    private platform;
    private player;
    private cursors;
    constructor() {
        super({
            key: "GameScene"
        });
    }
    preload(): void {
        this.load.image("circle", "./src/games/gameK/assets/circle.png");
        this.load.image("s_circle", "./src/games/gameK/assets/circle_s.png");
        this.load.image("ball", "./src/games/gameK/assets/ball1.png");
        this.load.image("plaform", "./src/games/gameK/assets/btnu.png");
    }
    init(): void {
        this.circles = [];
    }
    create(): void {

        // this.circles = this.add.group();
        // this.platform = this.physics.add{allowGravity:false});
        // this.platform.enableBody = true;
        this.platform = this.physics.add.sprite(400, 1100, 'plaform');
        // this.platform
        // this.angle = 30;
        // this.platform.anchor.setTo(0.5, 0.5);
        let repeat = 15;
        let y = -60
        let x = 0;
        let stepX = 90;
        let start = 60;
        let end = 130;
        for (let i = 0; i < 12; i++) {
            y += 80;
            if (i % 2 == 0) {
                x = Phaser.Math.Between(20, 85);
            }
            start += 10;
            stepX = Phaser.Math.Between(start, end);
            repeat = (this.sys.canvas.width - x) / stepX;
            this.s_circle = this.physics.add.group({
                key: 's_circle',
                repeat: repeat,
                setXY: { x: x, y: y, stepX: stepX, stepY: Phaser.Math.Between(0, 20) },
                allowGravity: false,
            });
            this.circles.push(this.s_circle);
            this.circle = this.physics.add.group({
                key: 'circle',
                repeat: 1,
                setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 1000) },
                allowGravity: false,
            });
        }
        this.player = this.physics.add.sprite(100, 1070, 'ball');

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounceX(0.2);
        this.player.setGravityY(20);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platform);
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.circles);
    }
    private playGame(): void {
    }
    private throwKnife(): void {

    }
    update() {
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-45);
            this.platform.setVelocityY(-20);
            // this.platform.anchor.setTo(0.5,0.5);
            // this.physics.add.collider(this.player, this.platform);
            // this.player.angle++;
        }else if(this.cursors.left.isDown){
            this.platform.angle-=10;
            this.player.setVelocityX(-10);
        }else if(this.cursors.right.isDown){
            this.platform.angle+=0.5;
            this.player.setVelocityX(10);
        }
    }
}