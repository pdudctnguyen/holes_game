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
            frameRate: 10,
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
        if (current - 1 >= 0) {
            start = current - 1;
        }
        if (current + 1 < this.listHoles.length) {
            end = current + 1;
        }
        for (let t = start; t < end; t++) {
            arr = this.listHoles[t];
            for (let k = 0; k < arr.length; k++) {
                if (Phaser.Math.Distance.Between(x, y, arr[k].getX(), arr[k].getY()) < customConfig.collider.holeWithHole) {
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
    public createChildren() {
        let warn;
        let x, y, yc, diembd, t, k1;
        let current = -1;
        this.listHoles = [];
        y = customConfig.hole.startY;
        t = customConfig.width / customConfig.hole.radius + 1;
        while (y > -customConfig.height) {
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
                num = Phaser.Math.Between(1, 2);
            } else {
                num = Phaser.Math.Between(1, 3);
                this.hideWarn(k, "E", num);
            }
            rand = Phaser.Math.Between(0, 2);
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
            listarr.push({ x: this.gifts[i].getX(), y: this.gifts[i].getY() });
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
