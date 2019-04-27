
import * as BABYLON from 'babylonjs';
import { Scene } from './scene';
import { RenderCanvas } from './RenderCanvas';

export class Camera {
  private _camera: BABYLON.ArcRotateCamera;
  public renderCanvas: RenderCanvas;

  constructor(sceneInstance: Scene, renderCanvas?: RenderCanvas) {
    this._camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 30, BABYLON.Vector3.Zero(), sceneInstance.scene);
    const canvas = renderCanvas ? renderCanvas.canvas: sceneInstance.renderCanvas.canvas;
    console.log(canvas);
    this._camera.attachControl(canvas, true);
  }
}
