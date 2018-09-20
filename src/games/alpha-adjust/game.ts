/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Alpha Adjust
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {
  title: "Alpha Adjust",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 800,
  height: 600,
  type: Phaser.CANVAS,
  parent: "game",
  scene: [GameScene],
  input: {
    mouse: true
  },
  backgroundColor: "#ADB7B9",
  pixelArt: true
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
var game;
window.onload = () => {
  game = new Game(config);
  window.focus()
    resize();
    window.addEventListener("resize", resize, false);
};
function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + "px";
      canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
      canvas.style.width = (windowHeight * gameRatio) + "px";
      canvas.style.height = windowHeight + "px";
  }
}
