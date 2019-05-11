import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { GameUtils } from './game-utils';
import { Scene } from './scene';
import { Shark } from './shark';
import { Gui } from './gui';
import { WaterMaterial } from 'babylonjs';

export class World {
  private _light: BABYLON.Light;
  private _shark: any;

  private gui: Gui;

  public sceneInstance: Scene;
  public waterMaterial: WaterMaterial;


  constructor(sceneInstance: Scene, groundOrNot: boolean, sky: boolean) {
      this.sceneInstance = sceneInstance;

      // create a basic light, aiming 0,1,0 - meaning, to the sky
      this._light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.sceneInstance.scene);

      // creates the sandy ground
      let ground = GameUtils.createGround(this.sceneInstance.scene);
      // creates the watermaterial and adds the relevant nodes to the renderlist
      this.waterMaterial = GameUtils.createWater(this.sceneInstance.scene);

      // create the skybox
      if (sky) {
        let skybox = GameUtils.createSkybox("skybox", "./assets/texture/skybox/TropicalSunnyDay", this.sceneInstance.scene);
        this.waterMaterial.addToRenderList(skybox);
      }

      if (groundOrNot) {
        this.waterMaterial.addToRenderList(ground)
     }

      // this._shark = new Shark(this.sceneInstance.renderCanvas.engine, this.sceneInstance.scene, waterMaterial);
      //
      // this.gui = new Gui(this._shark, this.sceneInstance);

      // Physics engine also works
      let gravity = new BABYLON.Vector3(0, -0.9, 0);
      this.sceneInstance.scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin());

      // this.animate();
  }

  /**
   * Starts the animation loop.
   */
  // animate(): void {
  //     // run the render loop
  //     this.sceneInstance.renderCanvas.engine.runRenderLoop(() => {
  //         this.sceneInstance.scene.render();
  //         // this.updateCoordinateTexture(this._shark._firstVertex)
  //         // this.gui.updateCoordinateTexture(this._shark._firstVertex);
  //     });
  //
  //     // the canvas/window resize event handler
  //     window.addEventListener('resize', () => {
  //         this.sceneInstance.renderCanvas.engine.resize();
  //     });
  // }
}
