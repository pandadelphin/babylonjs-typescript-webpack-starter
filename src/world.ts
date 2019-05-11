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

      // Physics engine also works
      let gravity = new BABYLON.Vector3(0, -0.9, 0);
      this.sceneInstance.scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin());

  }

}
