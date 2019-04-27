import { Game } from './game';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import CANNON = require('cannon');
import { RenderCanvas } from './RenderCanvas';
import { Scene } from './scene';
import { Camera } from './camera';
import { World } from './world';
import { View } from './view';

window.addEventListener('DOMContentLoaded', () => {
  // Set global variable for cannonjs physics engine
  window.CANNON = CANNON;
  let game = new Game('renderCanvas');
  game.createScene();
  // game.animate();

  let game2 = new Game('renderCanvas2');
  game2.createScene();
  // game2.animate();

  let renderCanvas3 = new RenderCanvas('renderCanvas3');
  let renderCanvas4 = new RenderCanvas('renderCanvas4');

  let scene3 = new Scene(renderCanvas3);
  // let scene4 = new Scene(renderCanvas4);
  // let view = new View(renderCanvas4);

  let camera3 = new Camera(scene3);
  let camera4 = new Camera(scene3, renderCanvas4);

  // Fill world
  let world = new World(scene3);

  world.animate(renderCanvas3);


});
