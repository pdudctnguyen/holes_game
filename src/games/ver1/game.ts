/**
 * @copyright NguyenNS
 */
/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene.1";
import { HUDScene } from "./scenes/hud-scene";
import { customConfig } from './const/config';
let cusConfig = customConfig;
import { MenuScene } from "./scenes/menu-scene";
const config: GameConfig = {
    title: cusConfig.title,
    url: cusConfig.url,
    version: cusConfig.version,
    width: cusConfig.width,
    height: cusConfig.height,
    zoom: cusConfig.zoom,
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
    backgroundColor: cusConfig.backgroundColor,
    pixelArt: false,
    antialias: true,
    banner: false
};
let game;
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// FBInstant.initializeAsync().then(function() {
//     FBInstant.setLoadingProgress(100);
//     FBInstant.startGameAsync().then(function() {
//        game = new Game(config);
//     })
// })

window.onload = () => {
    config.width = window.innerWidth;
    config.height = window.innerHeight;
    game = new Game(config);
    // resize();
    // game.state.add("Play",play);
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