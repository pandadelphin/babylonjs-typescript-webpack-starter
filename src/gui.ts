import { GameUtils } from './game-utils';
import { Shark } from './shark';
import * as GUI from 'babylonjs-gui';
import { Scene } from './scene';

export class Gui {

  private _shark: Shark;
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


  }
}
