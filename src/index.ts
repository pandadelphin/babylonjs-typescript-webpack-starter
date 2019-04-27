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

  let game2 = new Game('renderCanvas2');
  game2.createScene();
  // game.animate();

  // let game2 = new Game('renderCanvas2');
  // game2.createScene();
  // game2.animate();

  // let renderCanvas2 = new RenderCanvas('renderCanvas2');
  let renderCanvas3 = new RenderCanvas('renderCanvas3');
  let renderCanvas4 = new RenderCanvas('renderCanvas4');

  // let scene2 = new Scene(renderCanvas2);
  let scene3 = new Scene(renderCanvas3);
  let scene4 = new Scene(renderCanvas4);

  // let camera2 = new Camera(scene2, 2);
  let camera3 = new Camera(scene3, 3);
  let camera4 = new Camera(scene4, 4);

  // Fill world
  // let world2 = new World(scene2, true, true);
  let world3 = new World(scene3, false, false);
  let world4 = new World(scene4, true, false);

  // world2.animate();
  // world3.animate();
  // world4.animate();


});
