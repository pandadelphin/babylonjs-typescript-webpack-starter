import { GameUtils } from './game-utils';
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export class Game {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _sharkMesh: BABYLON.AbstractMesh;
    private _sharkAnimationTime = 0;
    private _swim: boolean = false;
    private _txtCoordinates: { txtX: GUI.TextBlock, txtY: GUI.TextBlock, txtZ: GUI.TextBlock } = null;

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
        // create a shark mesh from a .obj file
        GameUtils.createShark(this._scene)
            .subscribe(sharkMesh => {
                this._sharkMesh = sharkMesh;
                this._sharkMesh.getChildren().forEach(
                    mesh => {
                        waterMaterial.addToRenderList(mesh);
                    }
                );
            });
        // finally the new ui
        let guiTexture = GameUtils.createGUI();
        
        // Button to start shark animation
        GameUtils.createButtonSwim(guiTexture, "Start Swimming",
            (btn) => {
                let textControl = btn.children[0] as GUI.TextBlock;
                this._swim = !this._swim;
                if (this._swim) {
                    textControl.text = "Stop Swimming";
                }
                else {
                    this._sharkAnimationTime = 0;
                    textControl.text = "Start Swimming";
                }
            });

        // Debug Text for Shark coordinates
        this._txtCoordinates = GameUtils.createCoordinatesText(guiTexture);

        // Physics engine also works
        let gravity = new BABYLON.Vector3(0, -0.9, 0);
        this._scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin());
    }


    /**
     * Starts the animation loop.
     */
    animate(): void {
        this._scene.registerBeforeRender(() => {
            let deltaTime: number = (1 / this._engine.getFps());
            this.animateShark(deltaTime);
        });

        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

    animateShark(deltaTime: number): void {
        this.debugFirstMeshCoordinate(this._sharkMesh as BABYLON.Mesh);
        if (this._sharkMesh && this._swim) {
            this._sharkAnimationTime += deltaTime;
            this._sharkMesh.getChildren().forEach(
                mesh => {
                    let realMesh = <BABYLON.Mesh> mesh;
                    let vertexData = BABYLON.VertexData.ExtractFromMesh(realMesh);
                    let positions = vertexData.positions;
                    let numberOfPoints = positions.length / 3;
                    for (let i = 0; i < numberOfPoints; i++) {
                        let vertex = new BABYLON.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                        vertex.x += (Math.sin(0.15 * vertex.z + this._sharkAnimationTime * 4 - 1.6) * 0.05);
                        positions[i * 3] = vertex.x;
                        
                    }
                    vertexData.applyToMesh(mesh as BABYLON.Mesh);
                }
            );
        }
    }

    /**
     * Prints the coordinates of the first vertex of a mesh
     */
    public debugFirstMeshCoordinate(mesh: BABYLON.Mesh) {
        if(!mesh || !mesh.getChildren()) {
            return;
        }
        let firstMesh = (mesh.getChildren()[0] as BABYLON.Mesh) 
        let vertexData = BABYLON.VertexData.ExtractFromMesh(firstMesh);
        let positions = vertexData.positions;
        let firstVertex = new BABYLON.Vector3(positions[0], positions[1], positions[3]);
        this.updateCoordinateTexture(firstVertex);
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