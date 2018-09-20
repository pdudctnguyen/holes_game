import { gameOptions } from "../const/config";
export class Target extends Phaser.GameObjects.Sprite {
    public currentScene: Phaser.Scene;
    private changePositionTimer: Phaser.Time.TimerEvent;
    public newRotationSpeed;
    public currentRotationSpeed;
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);

        this.initVariables(params);
        this.initSprite();
        // this.initEvents();
        // params.scene.physics.world.enable(this);
        this.currentScene.add.existing(this);
    }
    private initVariables(params): void {
        this.currentScene = params.scene;
        this.newRotationSpeed = 0;
        this.currentRotationSpeed = 0;
    }

    private initSprite(): void {
        this.setOrigin(0.5, 0.5);
    }
    update(): void {}
}