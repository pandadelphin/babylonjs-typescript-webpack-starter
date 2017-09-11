import * as BABYLON from 'babylonjs';

/**
 * Because there is no WaterMaterial in BABYLON module we have to merge
 * this module with the actual BABYLON Module
 */
declare module "babylonjs" {
    class WaterMaterial extends Material {
        public bumpTexture;
        public windForce;
        public waveHeight;
        public windDirection;
        public waterColor;
        public colorBlendFactor;
        public bumpHeight;
        public waveLength;
        constructor(name, scene);
        public addToRenderList(mesh);
    }
}