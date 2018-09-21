export class Warn {
    private warn;
    private x;
    private y;
    constructor(params) {
        this.warn = params.scene.matter.add.sprite(params.x, params.y, params.key);
        params.scene.anims.create({
            key: 'hole1',
            frames:params.scene.anims.generateFrameNumbers('holes', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
            yoyo:true
        });
        this.warn.anims.play('hole1', true);
        this.warn.setDisplaySize(params.w, params.h);
        this.setCircle(params.radius);
        this.warn.setStatic(params.isStatic);
        this.x = params.x;
        this.y = params.y;
        this.warn.isactive = true;
        //   console.log(this.warn);
    }
    public setCircle(radius) {
        if (radius) {
            this.warn.setCircle(radius);
        } else {
            this.warn.setCircle();
        }
    }
    public getX() {
        return this.x;
    }
    public getY() {
        return this.y;
    }
    public moveDown() {
        this.warn.y += 1;
    }
    public setDestroy() {
        this.warn.isactive = false;
        this.warn.destroy();
    }
    public getActive(){
        return this.warn.isactive;
    }
}