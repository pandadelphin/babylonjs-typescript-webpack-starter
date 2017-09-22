import { Game } from './game';
import { BabylonJsPluginLoader } from './babylonjs-plugin-loader';


window.addEventListener('DOMContentLoaded', () => {
  new BabylonJsPluginLoader();
  let game = new Game('renderCanvas');
  game.createScene();
  game.animate();
});
