import { customConfig } from '../const/config';
export class Bar{
    private bar;
    constructor(params) {
        this.bar = params.scene.matter.add.image(params.x, params.y, params.key);
        console.log(customConfig.width + " - " + this.bar.width);
        let scale = customConfig.width/this.bar.width;
        this.bar.setScale(scale, scale);
        this.setAngle(params.angle);
        this.setFriction(params.friction);
        this.bar.setStatic(params.isStatic);
        params.scene.cameras.main.startFollow(this.bar, true);
        
    }
    public setFriction(val){
        this.bar.setFriction(val);
    }
    public setAngle(val){
        if(this.getAngle() != val){
            this.bar.setAngle(val);
            return true;
        }
        return false;
    }
    public getAngle(){
        return this.bar.angle;
    }
    public setCollision(cat){
        this.bar.setCollisionCategory(cat)
    }
    public setX(x){
        this.bar.x = x;
    }
    public getX(){
        return this.bar.x;
    }
    public setY(y){
        this.bar.y = y;
    }
    public getY(){
        return this.bar.y;
    }
    public update(direction){
        switch(direction){
            case "up":{
                this.bar.y -= customConfig.bar.stepMoveUp;
                break;
            }
            case "down":{
                this.bar.y += customConfig.bar.stepMoveDown;
                break;
            }
            default:{
                break;
            }
        }
    }
}