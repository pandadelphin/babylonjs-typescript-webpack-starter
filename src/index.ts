/**
 * The babylonjs fileloader plugins need to be added by imports-loader webpack plugin.
 * imports-loader gives us the ability to inject BABYLON global variable into babylonjs plugins.
 */
import 'imports-loader?BABYLON=babylonjs!babylonjs/dist/preview release/loaders/babylon.objFileLoader.min.js'
import 'imports-loader?__extends=typescript-extends,__decorate=typescript-decorate,BABYLON=babylonjs!babylonjs/dist/preview release/materialsLibrary/babylon.waterMaterial.min.js';

import { Game } from './game';

window.addEventListener('DOMContentLoaded', () => {
  let game = new Game('renderCanvas');
  game.createScene();
  game.animate();
});
