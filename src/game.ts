import { GameUtils } from './game-utils';
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { Shark } from './shark';

export class Game {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    // private _sharkMesh: BABYLON.AbstractMesh;
    // private _sharkAnimationTime = 0;
    // private _swim: boolean = false;
    private _txtCoordinates: { txtX: GUI.TextBlock, txtY: GUI.TextBlock, txtZ: GUI.TextBlock } = null;

    private _shark: any;

    constructor(canvasElement: string) {
        // Create canvas and engine
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    /**
     * Creates the BABYLONJS Scene
     */
    createScene(): void {
        // create a basic BJS Scene object
        this._scene = new BABYLON.Scene(this._engine);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 30, BABYLON.Vector3.Zero(), this._scene);
        this._camera.attachControl(this._canvas, true);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);
        // create the skybox
        let skybox = GameUtils.createSkybox("skybox", "./assets/texture/skybox/TropicalSunnyDay", this._scene);

        // creates the sandy ground
        let ground = GameUtils.createGround(this._scene);
        // creates the watermaterial and adds the relevant nodes to the renderlist
        let waterMaterial = GameUtils.createWater(this._scene);
        waterMaterial.addToRenderList(skybox);
        waterMaterial.addToRenderList(ground);

        this._shark = new Shark(this._engine, this._scene);
        this._shark.createShark(this._scene, waterMaterial);
        // finally the new ui
        let guiTexture = GameUtils.createGUI();

        // Button to start shark animation
        GameUtils.createButtonSwim(guiTexture, "Start Swimming",
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
        this._txtCoordinates = GameUtils.createCoordinatesText(guiTexture);

        // Physics engine also works
        let gravity = new BABYLON.Vector3(0, -0.9, 0);
        this._scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin());


        this.animate();

    }


    /**
     * Starts the animation loop.
     */
    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
            this.updateCoordinateTexture(this._shark._firstVertex)
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
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
