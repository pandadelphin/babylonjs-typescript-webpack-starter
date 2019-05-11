import { GameUtils } from './game-utils';
import { Shark } from './shark';
import * as GUI from 'babylonjs-gui';
import { Scene } from './scene';

export class Gui {

  private _shark: Shark;
  private _txtCoordinates: { txtX: GUI.TextBlock, txtY: GUI.TextBlock, txtZ: GUI.TextBlock } = null;

  public guiTexture: GUI.AdvancedDynamicTexture;

  constructor (shark: Shark, scene: Scene) {
    console.log(shark);
    this._shark = shark;

    // finally the new ui
    this.guiTexture = GameUtils.createGUI(scene);

    // Button to start shark animation
    GameUtils.createButtonSwim(this.guiTexture, "Start Swimming",
        (btn) => {
            let textControl = btn.children[0] as GUI.TextBlock;
            this._shark._swim = !this._shark._swim;
            if (this._shark._swim) {
                textControl.text = "Stop Swimming";
            }
            else {
                this._shark._sharkAnimationTime = 0;
                textControl.text = "Start Swimming";
            }
        });

      // Debug Text for Shark coordinates
    this._txtCoordinates = GameUtils.createCoordinatesText(this.guiTexture);
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
