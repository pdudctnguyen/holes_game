import { customConfig } from '../const/config';
import { Hole } from '../objects/hole';
import { Gift } from '../objects/gift';
export class Holes {
    private hole;
    private holes;
    private listHoles;
    private currentScene;
    private gifts;
    constructor(params) {
        this.currentScene = params.scene;
        this.currentScene.anims.create({
            key: 'hole1',
            frames: this.currentScene.anims.generateFrameNumbers('holes', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1,
            yoyo: true
        });
        this.holes = [];
        this.listHoles = [];
        this.gifts = [];
        //   console.log(this.hole);
    }
    checkWarn(x, y, current): boolean {
        let arr;
        let start = 0;
        let end = this.listHoles.length;
        if (current - 4 >= 0) {
            start = current - 4;
        }
        if (current + 4 < this.listHoles.length) {
            end = current + 4;
        }
        for (let t = start; t < end; t++) {
            arr = this.listHoles[t];
            for (let k = 0; k < arr.length; k++) {
                if (Phaser.Math.Distance.Between(x, y, arr[k].getX(), arr[k].getY()) <= customConfig.collider.holeWithHole) {
                    return false;
                }
            }
        }
        return true;
    }
    hideWarn(index, posLER, num): void {
        // console.log("this.listHoles[index]");
        let vtDel;
        let len = this.listHoles[index].length;
        switch (posLER) {
            case "L": {
                vtDel = 0;
                break;
            }
            case "E": {
                let tmp = len / 2 - 1;
                vtDel = parseInt(tmp + "");
                break;
            }
            case "R": {
                vtDel = len - 1 - num;
            }
        }
        if (vtDel + num < len) {
            len = vtDel + num;
        }
        // console.log("disable tu " + vtDel + " den " + len);
        for (let ind = vtDel; ind <= len; ind++) {
            if (this.listHoles[index][ind]) {
                this.listHoles[index][ind].setDestroy();
            }
        }
        // console.log("xoa tu " + vtDel + " " + num + " phan tu ");
        this.listHoles[index].splice(vtDel, num);
    }
    public applyChild(list1, list2) {
        this.listHoles = [];
        let warn;
        let gift;
        let arrWarn;
        let arrGift;
        for (let i = 0; i < list1.length; i++) {
            arrWarn = list1[i];
            this.holes = [];
            for(let j = 0; j < arrWarn.length; j++){
                warn = new Hole({
                    scene: this.currentScene,
                    x: arrWarn[j].x,
                    y: arrWarn[j].y,
                    w: customConfig.hole.radius,
                    h: customConfig.hole.radius,
                    key: "warn",
                    radius: customConfig.hole.radius,
                    isStatic: true
                });
                this.holes.push(warn);
            }
            if (this.holes.length > 0) {
                this.listHoles.push(this.holes);
            }
        }
        for (let i = 0; i < list2.length; i++) {
                gift = new Gift({
                    scene: this.currentScene,
                    x: list2[i].x,
                    y: list2[i].y,
                    type: list2[i].type,
                    key: list2[i].type == 0 ? "gift5" : "gift10",
                    radius: 20,
                    isStatic: true
                }); 
                this.gifts.push(gift);
        }
        // this.listHoles = list1;
        // this.gifts = list2;
    }
    public createChildren(startY, height) {
        let warn;
        let x, y, yc, diembd, t, k1;
        let current = -1;
        this.listHoles = [];
        y = startY;
        t = customConfig.width / customConfig.hole.radius + 1;
        while (y > height) {
            current++;
            y -= customConfig.hole.distanceY;
            diembd = Phaser.Math.Between(0, customConfig.hole.randomStepY);
            k1 = (customConfig.width - diembd) / (t);
            this.holes = [];
            for (let i = 0; i < t; i++) {
                x = diembd + k1 * i + Phaser.Math.Between(-customConfig.hole.randomStepX, customConfig.hole.randomStepX);
                yc = y + Phaser.Math.Between(-customConfig.hole.randomStepY, customConfig.hole.randomStepY);
                if (this.checkWarn(x, yc, current)) {
                    warn = new Hole({
                        scene: this.currentScene,
                        x: x,
                        y: yc,
                        w: customConfig.hole.radius,
                        h: customConfig.hole.radius,
                        key: "warn",
                        radius: customConfig.hole.radius,
                        isStatic: true
                    });
                    this.holes.push(warn);
                }
            }
            if (this.holes.length > 0) {
                this.listHoles.push(this.holes);
            }
            if (current % 4 == 0) {
                let gift;
                let type;
                let xGift;
                let yGift;
                let numItem;
                numItem = current / 4 > 3 ? 4 : 2;
                for (let idx = 0; idx < Phaser.Math.Between(1, numItem); idx++) {
                    type = Phaser.Math.Between(0, 1);
                    xGift = Phaser.Math.Between(0, customConfig.width);
                    yGift = Phaser.Math.Between(y - customConfig.hole.distanceY, y + 10);
                    gift = new Gift({
                        scene: this.currentScene,
                        x: xGift,
                        y: yGift,
                        type: type,
                        key: type == 0 ? "gift5" : "gift10",
                        radius: 20,
                        isStatic: true
                    });
                    this.gifts.push(gift);
                }
            }
        }
        let num;
        let rand;
        for (let k = 0; k < this.listHoles.length; k++) {
            if (k > 4) {
                // num = Phaser.Math.Between(1, 2);
                num = Phaser.Math.Between(3, 4);
            } else {
                num = Phaser.Math.Between(3, 5);
                this.hideWarn(k, "E", num);
            }
            rand = Phaser.Math.Between(2, 5);
            switch (rand) {
                case 0: {
                    this.hideWarn(k, "L", num);
                    break;
                }
                case 1: {
                    this.hideWarn(k, "R", num);
                    break;
                }
                case 2: {
                    this.hideWarn(k, "L", num);
                    this.hideWarn(k, "R", num);
                    break;
                }
            }
        }
    }
    public update() {

    }
    public destroyAll() {
        for (let i = 0; i < this.holes; i++) {
            this.holes[i].setDestroy();
        }
    }
    public destroyLine(index) {

    }
    public setDestroy() {
        this.hole.isactive = false;
        this.hole.destroy();
    }
    public getActive() {
        return this.hole.isactive;
    }
    public getHoles() {
        let arrHoles;
        let arrHolesXY;
        let listarr = [];
        for (let i = 0; i < this.listHoles.length; i++) {
            arrHolesXY = [];
            arrHoles = [];
            arrHoles = this.listHoles[i];
            for (let j = 0; j < arrHoles.length; j++) {
                arrHolesXY.push({ x: arrHoles[j].getX(), y: arrHoles[j].getY(), isActive: arrHoles[j].getActive() });
            }
            listarr.push(arrHolesXY);
        }
        return listarr;
    }
    public getGifts() {
        let listarr = [];
        for (let i = 0; i < this.gifts.length; i++) {
            listarr.push({ x: this.gifts[i].getX(), y: this.gifts[i].getY(),type:this.gifts[i].getType()});
        }
        return listarr;
    }
    public getHolesRoot() {
        return this.listHoles;
    }
    public getGiftsRoot() {
        return this.gifts;
    }
}
