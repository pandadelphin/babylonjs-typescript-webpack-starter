import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { GameUtils } from './game-utils';
import { Scene } from './scene';
import { Shark } from './shark';
import { Gui } from './gui';

export class World {
  private _light: BABYLON.Light;
  private _shark: any;
  private _txtCoordinates: { txtX: GUI.TextBlock, txtY: GUI.TextBlock, txtZ: GUI.TextBlock } = null;

  private gui: Gui;

  public sceneInstance: Scene;


  constructor(sceneInstance: Scene, groundOrNot: boolean, sky: boolean) {
      this.sceneInstance = sceneInstance;


      // create a basic light, aiming 0,1,0 - meaning, to the sky
      this._light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.sceneInstance.scene);


      // creates the sandy ground
      let ground = GameUtils.createGround(this.sceneInstance.scene);
      // creates the watermaterial and adds the relevant nodes to the renderlist
      let waterMaterial = GameUtils.createWater(this.sceneInstance.scene);

      // create the skybox
      if (sky) {
        let skybox = GameUtils.createSkybox("skybox", "./assets/texture/skybox/TropicalSunnyDay", this.sceneInstance.scene);
        waterMaterial.addToRenderList(skybox);
        // console.log(skybox);
      }


      groundOrNot ? waterMaterial.addToRenderList(ground) : null;

      this._shark = new Shark(this.sceneInstance.renderCanvas.engine, this.sceneInstance.scene);

      this._shark.createShark(this.sceneInstance.scene, waterMaterial);


      this.gui = new Gui(this._shark);


      // Debug Text for Shark coordinates
      this._txtCoordinates = GameUtils.createCoordinatesText(this.gui.guiTexture);

      // Physics engine also works
      let gravity = new BABYLON.Vector3(0, -0.9, 0);
      this.sceneInstance.scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin());


      this.animate();
  }

  /**
   * Starts the animation loop.
   */
  animate(): void {
      // run the render loop
      this.sceneInstance.renderCanvas.engine.runRenderLoop(() => {
          this.sceneInstance.scene.render();
          this.updateCoordinateTexture(this._shark._firstVertex)
      });

      // the canvas/window resize event handler
      window.addEventListener('resize', () => {
          this.sceneInstance.renderCanvas.engine.resize();
      });
  }


  /**
   * Prints the given Vector3
   * @param coordinates
   */
  public updateCoordinateTexture(coordinates: BABYLON.Vector3) {
      if(!coordinates) {
          return;
      }
      this._txtCoordinates.txtX.text = "X: " + coordinates.x;
      this._txtCoordinates.txtY.text = "Y: " + coordinates.y;
      this._txtCoordinates.txtZ.text = "Z: " + coordinates.z;
  }
}
