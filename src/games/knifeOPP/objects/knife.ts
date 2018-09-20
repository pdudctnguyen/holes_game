export class Knife extends Phaser.GameObjects.Sprite{
    public currentScene: Phaser.Scene;
    private changePositionTimer: Phaser.Time.TimerEvent;
    private canThrow;
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        this.initVariables(params);
        this.initSprite();
        this.initEvents();
        // params.scene.physics.world.enable(this);
        this.currentScene.add.existing(this);
    }
    public setCanThrow(value):void{
        this.canThrow = value;
    }
    public getCanThrow():void{
        return this.canThrow;
    }
    private initVariables(params): void {
        this.currentScene = params.scene;
        this.canThrow = true;
    }
    private initSprite(): void {
        this.setOrigin(0.5, 0.5);
    }

    private initEvents(): void {
    }
}