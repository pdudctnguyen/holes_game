/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Flappy Bird: Game
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/main";
const config: GameConfig = {
  title: "Hello World",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 405,
  height: 600,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: [],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  backgroundColor: "#98d687",
  pixelArt: true,
  antialias: false
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
