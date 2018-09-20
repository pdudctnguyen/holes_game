export class Zone{
    private zone;
    constructor(params) {
        this.zone = params.scene.add.sprite(params.x, params.y, params.key);
    }
    public setSizeZone(w,h){
        this.zone.setDisplaySize(w,h);
    }
    public setInteractive(config){
        this.zone.setInteractive(config);
    }
    public setYOnDrag(dragY,limitY,distanceY){
        let rs;
        if (dragY < limitY - distanceY) {
            rs = limitY - distanceY;
          } else if (dragY > limitY + distanceY) {
            rs= limitY + distanceY;
          } else {
            rs = dragY;
          }
      return rs;  
    }
    public setX(x){
        this.zone.x = x;
    }
    public getX(){
        return this.zone.x;
    }
    public setY(y){
        this.zone.y = y;
    }
    public getY(){
        return this.zone.y;
    }
}