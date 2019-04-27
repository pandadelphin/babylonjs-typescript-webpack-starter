import { Game } from './game';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import CANNON = require('cannon');
import { RenderCanvas } from './RenderCanvas';
import { Scene } from './scene';
import { Camera } from './camera';
import { World } from './world';
// import { View } from './view';

window.addEventListener('DOMContentLoaded', () => {
  // Set global variable for cannonjs physics engine
  window.CANNON = CANNON;

  // Top
  let game = new Game('renderCanvas');
  game.createScene();

  let game2 = new Game('renderCanvas2');
  game2.createScene();

  // Bottom
  let renderCanvas3 = new RenderCanvas('renderCanvas3');
  test(renderCanvas3);

  let renderCanvas4 = new RenderCanvas('renderCanvas4');
  test(renderCanvas4);


});

function test (renderCanvas) {
  let scene3 = new Scene(renderCanvas);
  let camera3 = new Camera(scene3, 3);
  // Fill world
  let world3 = new World(scene3, false, false);

}
