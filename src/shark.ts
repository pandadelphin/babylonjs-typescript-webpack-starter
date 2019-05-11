import { AbstractMesh, Scene, Engine } from "babylonjs";
import { GameUtils } from "./game-utils";



export class Shark {

  public _sharkMesh: AbstractMesh;
  public _swim: boolean = false;
  public _sharkAnimationTime = 0;
  public _firstVertex: any;

  constructor (engine: Engine, scene: Scene, waterMaterial) {
    scene.registerBeforeRender(() => {
        let deltaTime: number = (1 / engine.getFps());
        this.debugFirstMeshCoordinate(this._sharkMesh as BABYLON.Mesh);
        this.animateShark(deltaTime);
    });
    this.createShark(scene, waterMaterial);
  }

  createShark (scene: Scene, waterMaterial) {
    // create a shark mesh from an obj file
    GameUtils.createShark(scene)
        .subscribe(sharkMesh => {
            this._sharkMesh = sharkMesh;
            this._sharkMesh.getChildren().forEach(
                mesh => {
                    waterMaterial.addToRenderList(mesh);
                }
            );
        });
  }

  animateShark(deltaTime: number): void {
      if (this._sharkMesh && this._swim) {
          this._sharkAnimationTime += 0.01;
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
   * Sets the coordinates of the first vertex of mesh
   */
  public debugFirstMeshCoordinate(mesh: BABYLON.Mesh) {
      if(!mesh || !mesh.getChildren()) {
          return;
      }
      let firstMesh = (mesh.getChildren()[0] as BABYLON.Mesh)
      let vertexData = BABYLON.VertexData.ExtractFromMesh(firstMesh);
      let positions = vertexData.positions;
      this._firstVertex = new BABYLON.Vector3(positions[0], positions[1], positions[3]);
  }

}
