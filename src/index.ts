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
import { RenderLoop } from './RenderLoop';
import { Shark } from './shark';
// import { View } from './view';

window.addEventListener('DOMContentLoaded', () => {
  // Set global variable for cannonjs physics engine
  window.CANNON = CANNON;

  // Top
  let game = new Game('renderCanvas');
  game.createScene();

  let game2 = new Game('renderCanvas2');
  game2.createScene();

  // Add Objects
  let object1 = new Shark(game.renderScene.renderCanvas.engine, game.renderScene.scene, game.world.waterMaterial);
  let object2 = new Shark(game2.renderScene.renderCanvas.engine, game2.renderScene.scene, game2.world.waterMaterial);


  // Render top
  let renderLoop1 = new RenderLoop(game.renderScene);
  let renderLoop2 = new RenderLoop(game2.renderScene);


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


  // Add Objects
  let object3 = new Shark(scene3.renderCanvas.engine, scene3.scene, world3.waterMaterial);
  let object4 = new Shark(scene4.renderCanvas.engine, scene4.scene, world4.waterMaterial);

  // Render bottom
  let renderLoop3 = new RenderLoop(scene3);
  let renderLoop4 = new RenderLoop(scene4);


});

function test (renderCanvas, wut) {
  let scene3 = new Scene(renderCanvas);
  let camera3 = new Camera(scene3, 3);
  // Fill world
  let world3 = new World(scene3, wut, false);

}
