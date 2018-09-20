export class Ball extends Phaser.GameObjects.Sprite {
    public currentScene: Phaser.Scene;
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        // this.
        // this.setOrigin()
        // console.log(params);
        params.scene.physics.world.enable(this);
        // this.body.setBounceX(0.2);
        // this.body.setGravityY(20);
        // this.body.setCollideWorldBounds(true);
        // this.body.setCircle(20);
        
        console.log("ball");
        params.scene.add.existing(this);
    }
    public moveUp(): void {
        this.body.setVelocityY(-20);
    }
    public moveRight():void{
        this.body.setVelocityX(10);
        this.body.setVelocityY(10);
    }
    public moveLeft():void{
        this.body.setVelocityX(-10);
    }
}