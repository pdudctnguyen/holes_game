/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>
let game;
import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {

    // render type
    type: Phaser.CANVAS,

    // game width, in pixels
    width: 750,

    // game height, in pixels
    height: 1334,

    // game background color
    // backgroundColor: 0x444444,

    // scenes used by the game
    scene: [GameScene]
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}
window.onload = () => {
    game = new Game(config);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
};
function resize() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
