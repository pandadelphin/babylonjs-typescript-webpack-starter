import { Game } from './game';
import 'babylonjs-materials';
import 'babylonjs-loaders';

window.addEventListener('DOMContentLoaded', () => {
  let game = new Game('renderCanvas');
  game.createScene();
  game.animate();
});
