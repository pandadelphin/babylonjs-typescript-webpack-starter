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
import { Gui } from './gui';

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

  // Gui
  let gui = new Gui(object1, game.renderScene);
  let gui2 = new Gui(object2, game2.renderScene);


  // Render top
  let renderLoop1 = new RenderLoop(game.renderScene, () => {
    gui.updateCoordinateTexture(object1._firstVertex);
  });
  let renderLoop2 = new RenderLoop(game2.renderScene, () => {
    gui2.updateCoordinateTexture(object2._firstVertex);
  });



  // Bottom
  let renderCanvas3 = new RenderCanvas('renderCanvas3');
  let renderCanvas4 = new RenderCanvas('renderCanvas4');

  let scene3 = new Scene(renderCanvas3);
  let scene4 = new Scene(renderCanvas4);

  let camera3 = new Camera(scene3, 3);
  let camera4 = new Camera(scene4, 3);

  // Fill world
  let world3 = new World(scene3, true, false);
  let world4 = new World(scene4, false, true);


  // Add Objects
  let object3 = new Shark(scene3.renderCanvas.engine, scene3.scene, world3.waterMaterial);
  let object4 = new Shark(scene4.renderCanvas.engine, scene4.scene, world4.waterMaterial);

  // Gui
  let gui3 = new Gui(object3, scene3);
  let gui4 = new Gui(object4, scene4);

  // Render bottom
  let renderLoop3 = new RenderLoop(scene3, () => {
    gui3.updateCoordinateTexture(object3._firstVertex);
  });
  let renderLoop4 = new RenderLoop(scene4, () => {
    gui4.updateCoordinateTexture(object4._firstVertex);
  });


});
