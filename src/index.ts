import 'babylonjs-loaders';
import { Game } from './game';
import CANNON = require('cannon');

window.addEventListener('DOMContentLoaded', () => {
  // Set global variable for cannonjs physics engine
  window.CANNON = CANNON;
  let game = new Game('renderCanvas');
  game.createScene();
  game.animate();
});
