import * as BABYLON from 'babylonjs';
import { RenderCanvas } from './RenderCanvas';

export class Scene {

  public scene: BABYLON.Scene;
  public renderCanvas: RenderCanvas;

  constructor (renderCanvas: RenderCanvas) {
    // create a basic BJS Scene object
    this.renderCanvas = renderCanvas;
    this.scene = new BABYLON.Scene(this.renderCanvas.engine);
  }
}
