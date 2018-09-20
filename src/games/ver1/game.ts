/**
 * @copyright NguyenNS
 */
/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene.1";
import { HUDScene } from "./scenes/hud-scene";
import { MenuScene } from "./scenes/menu-scene";
// import FBInstant from 'fb-instant-games';
import FBInstant =  require('fb-instant-games');

const config: GameConfig = {
    title: "Flappy Bird",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "1.0",
    width: 800,
    height: 600,
    // resolution: window.devicePixelRatio,
    zoom: 1,
    type: Phaser.AUTO,
    parent: "game",
    scene: [BootScene, MenuScene, GameScene, HUDScene],
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: true
    },
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 1 },
            debug: false
        }
    },
    backgroundColor: "#ffffff",
    pixelArt: true,
    antialias: false,
    banner: false
};
let game;
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

FBInstant.initializeAsync().then(function() {
    FBInstant.setLoadingProgress(100);
    FBInstant.startGameAsync().then(function() {
       game = new Game(config);
    })
})

// window.onload = () => {
//     let FBInstant = null;
//     if ( !!window.FBInstant === true ) FBInstant = window.FBInstant;
//     console.log(window);
//     game = new Game(config);
//     // resize();
//     // game.state.add("Play",play);
// };
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