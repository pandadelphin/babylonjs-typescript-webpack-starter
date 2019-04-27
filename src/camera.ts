
import * as BABYLON from 'babylonjs';
import { Scene } from './scene';
import { RenderCanvas } from './RenderCanvas';

export class Camera {
  private _camera: BABYLON.ArcRotateCamera;
  public renderCanvas: RenderCanvas;

  constructor(sceneInstance: Scene, nr: number) {
    this._camera = new BABYLON.ArcRotateCamera(`Camera-${nr}`, 3 * Math.PI / 2, Math.PI / 2.5, 30, BABYLON.Vector3.Zero(), sceneInstance.scene);
    // const canvas = sceneInstance.renderCanvas.canvas;
    // console.log(canvas);
    this._camera.attachControl(sceneInstance.renderCanvas.canvas, true);
  }
}
