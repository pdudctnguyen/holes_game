export class Gift{
    private gift;
    constructor(params) {
        this.gift = params.scene.matter.add.sprite(params.x, params.y, params.key);
        this.setCircle(params.radius);
        this.gift.typeGift = params.type;
        this.gift.setStatic(true);
        // console.log(this.gift);
    }
    public setCircle(radius){
        if(radius){
            this.gift.setCircle(radius);
        }else{
            this.gift.setCircle();
        }
    }
    public getPoitWithType() {
        return this.gift.typeGift == 0 ? 5 : 10;
    }
    public disableGift(): void {
        this.gift.destroy();
        // this.gift.disableBody(true, true);
    }
    public enableGift(gift): void {
        this.gift.enableBody(true, this.gift.getX(), 0, true, true);
    }
    public getX(){
        return this.gift.x;
    }
    public getY(){
        return this.gift.y;
    }
    public setDestroy(){
        this.gift.destroy();
    }
    
  }