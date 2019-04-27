import { Game } from './game';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import CANNON = require('cannon');
import { RenderCanvas } from './RenderCanvas';
import { Scene } from './scene';
import { Camera } from './camera';
import { World } from './world';
import { GameUtils } from './game-utils';
import * as GUI from 'babylonjs-gui';
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
  // test(renderCanvas3, false);

  let renderCanvas4 = new RenderCanvas('renderCanvas4');
  // test(renderCanvas4, true);

  let scene3 = new Scene(renderCanvas3);
  let scene4 = new Scene(renderCanvas4);

  let camera3 = new Camera(scene3, 3);
  let camera4 = new Camera(scene4, 3);

  // let gui = GameUtils.createGUI(scene3);
  // GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

  // Fill world
  let world3 = new World(scene3, true, false);
  let world4 = new World(scene4, true, false);


});

function test (renderCanvas, wut) {
  let scene3 = new Scene(renderCanvas);
  let camera3 = new Camera(scene3, 3);
  // Fill world
  let world3 = new World(scene3, wut, false);

}
