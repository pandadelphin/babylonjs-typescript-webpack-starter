import './style.css'
import { Game } from './game';

window.addEventListener('DOMContentLoaded', () => {
  let game = new Game('renderCanvas');
  game.createScene();
  game.animate();
});
