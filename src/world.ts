import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { GameUtils } from './game-utils';
import { Scene } from './scene';
import { Shark } from './shark';

export class World {
  private _light: BABYLON.Light;
  private _shark: any;

  public sceneInstance: Scene;

  constructor(sceneInstance: Scene) {
      this.sceneInstance = sceneInstance;
      // create a basic light, aiming 0,1,0 - meaning, to the sky
      this._light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.sceneInstance.scene);
      // create the skybox
      let skybox = GameUtils.createSkybox("skybox", "./assets/texture/skybox/TropicalSunnyDay", this.sceneInstance.scene);
      // creates the sandy ground
      let ground = GameUtils.createGround(this.sceneInstance.scene);
      // creates the watermaterial and adds the relevant nodes to the renderlist
      let waterMaterial = GameUtils.createWater(this.sceneInstance.scene);
      waterMaterial.addToRenderList(skybox);
      waterMaterial.addToRenderList(ground);

      this._shark = new Shark(this.sceneInstance.renderCanvas.engine, this.sceneInstance.scene);
      this._shark.createShark(this.sceneInstance.scene, waterMaterial);
      // finally the new ui
      // let guiTexture = GameUtils.createGUI();

      // Button to start shark animation
      // GameUtils.createButtonSwim(guiTexture, "Start Swimming",
      //     (btn) => {
      //         let textControl = btn.children[0] as GUI.TextBlock;
      //         this._shark._swim = !this._shark._swim;
      //         if (this._shark._swim) {
      //             textControl.text = "Stop Swimming";
      //         }
      //         else {
      //             this._shark._sharkAnimationTime = 0;
      //             textControl.text = "Start Swimming";
      //         }
      //     });

      // Debug Text for Shark coordinates
      // this._txtCoordinates = GameUtils.createCoordinatesText(guiTexture);

      // Physics engine also works
      let gravity = new BABYLON.Vector3(0, -0.9, 0);
      this.sceneInstance.scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin());


      // this.animate();
  }

  /**
   * Starts the animation loop.
   */
  animate(): void {
      // run the render loop
      this.sceneInstance.renderCanvas.engine.runRenderLoop(() => {
          this.sceneInstance.scene.render();
          // this.updateCoordinateTexture(this._shark._firstVertex)
      });

      // the canvas/window resize event handler
      window.addEventListener('resize', () => {
          this.sceneInstance.renderCanvas.engine.resize();
      });
  }

}
