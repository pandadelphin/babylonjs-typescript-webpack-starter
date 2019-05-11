import { Scene } from './scene';

export class RenderLoop {

  public sceneInstance: Scene;
  public renderCallback: () => any;

  constructor(sceneInstance: Scene, renderCallback?: () => any) {
    this.sceneInstance = sceneInstance;
    this.renderCallback = renderCallback;
    this.animate();
  }

  /**
   * Starts the animation loop.
   */
  animate(): void {
      // run the render loop
      this.sceneInstance.renderCanvas.engine.runRenderLoop(() => {
          this.sceneInstance.scene.render();          
          if (this.renderCallback) {
            this.renderCallback();
            // this.gui.updateCoordinateTexture(this._shark._firstVertex);
          }
      });

      // the canvas/window resize event handler
      window.addEventListener('resize', () => {
          this.sceneInstance.renderCanvas.engine.resize();
      });
  }
}
