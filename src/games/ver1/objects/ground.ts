export class Ground{
    private ground;
    constructor(params) {
        this.ground = params.scene.matter.add.image(params.x, params.y, params.key);
        params.scene.cameras.main.startFollow(this.ground, true);
        this.ground.setStatic(params.isStatic);
        this.ground.setScale(params.scaleX, params.scaleY);
        this.setAngle(params.angle);
        this.setFriction(params.friction);
        
    }
    public setFriction(val){
        this.ground.setFriction(val);
    }
    public setAngle(val){
        this.ground.setAngle(val);
    }
    public getAngle(){
        return this.ground.angle;
    }
    public setCollision(cat){
        this.ground.setCollisionCategory(cat)
    }
    public setX(x){
        this.ground.x = x;
    }
    public getX(){
        return this.ground.x;
    }
    public setY(y){
        this.ground.y = y;
    }
    public getY(){
        return this.ground.y;
    }
}