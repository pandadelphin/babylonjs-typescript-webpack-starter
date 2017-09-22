import { GameUtils } from './game-utils';
import * as BABYLON from 'babylonjs';

export class Game {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _sharkMesh: BABYLON.AbstractMesh;

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
        GameUtils.createShark(this._scene)
            .subscribe(sharkMesh => {
                this._sharkMesh = sharkMesh;   
                this._sharkMesh.getChildren().forEach(
                     mesh => { waterMaterial.addToRenderList(mesh) }
                );
            });
    }

    private time = 0;

    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
            let deltaTime: number = (1 / this._engine.getFps());         
            if(this._sharkMesh && this._sharkMesh.material)   {
                this.time += 3 * deltaTime;
                (<BABYLON.ShaderMaterial>this._sharkMesh.material).setFloat("time", this.time);            
            }
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

}