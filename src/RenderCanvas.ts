import * as BABYLON from 'babylonjs';

export class RenderCanvas {
  public canvas: HTMLCanvasElement;

  public engine: BABYLON.Engine;

  constructor (canvasElement: string) {
    // Create canvas and engine
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
    this.engine = new BABYLON.Engine(this.canvas, true);
  }
}
