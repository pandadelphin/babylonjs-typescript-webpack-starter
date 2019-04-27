import * as BABYLON from 'babylonjs';
import { RenderCanvas } from './RenderCanvas';

export class View {

    public renderCanvas: RenderCanvas;

  constructor (renderCanvas: RenderCanvas) {
    this.renderCanvas = renderCanvas;
  }
}
