import { GameUtils } from './game-utils';
import * as BABYLON from 'babylonjs';

export class Game {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _rootMesh: BABYLON.AbstractMesh;

    constructor(canvasElement: string) {
        // Create canvas and engine
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        // create a basic BJS Scene object
        this._scene = new BABYLON.Scene(this._engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 30, BABYLON.Vector3.Zero(), this._scene);
        this._camera.attachControl(this._canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);

        let skybox = GameUtils.createSkybox("skybox", "./assets/texture/skybox/TropicalSunnyDay", this._scene);

        // Ground
        let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this._scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("./assets/texture/ground.jpg", this._scene);
        //groundMaterial.diffuseTexture.uScale = groundMaterial.diffuseTexture.vScale = 4;
        let ground = BABYLON.Mesh.CreateGround("ground", 512, 512, 32, this._scene, false);
        ground.position.y = -1;
        ground.material = groundMaterial;

        // Water
        let waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 512, 512, 32, this._scene, false);        
        let waterMaterial = GameUtils.createWaterMaterial("water", "./assets/texture/waterbump.png", this._scene);
        waterMesh.material = waterMaterial;
        waterMesh.position.y = 4;
        // Add skybox and ground to the reflection and refraction
        waterMaterial.addToRenderList(skybox);
        waterMaterial.addToRenderList(ground);

        // create a mesh object with loaded from file
        this._rootMesh = BABYLON.MeshBuilder.CreateBox("rootMesh", { size: 1 }, this._scene);
        this._rootMesh.isVisible = false;
        this._rootMesh.position.y = 0.4;
        this._rootMesh.rotation.y = -3 * Math.PI / 4;
        GameUtils.createMeshFromObjFile("mesh/", "mesh.obj", this._scene, new BABYLON.Vector3(1, 1, 1)) 
            .subscribe(meshes => {
                meshes.forEach((mesh) => {
                    mesh.parent = this._rootMesh;
                    waterMaterial.addToRenderList(mesh);
                });
            });

    }

    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

}