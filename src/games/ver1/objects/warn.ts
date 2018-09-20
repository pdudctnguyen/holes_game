export class Warn{
  private warn;
  constructor(params) {
      this.warn = params.scene.matter.add.sprite(params.x, params.y, params.key);
      this.warn.setDisplaySize(params.w,params.h);
      this.setCircle(params.radius);
      this.warn.setStatic(params.isStatic);
    //   console.log(this.warn);
  }
  public setCircle(radius){
      if(radius){
          this.warn.setCircle(radius);
      }else{
          this.warn.setCircle();
      }
  }
  public getX(){
      return this.warn.x;
  }
  public getY(){
      return this.warn.y;
  }
  public moveDown(){
      this.warn.y+=1;
  }
}