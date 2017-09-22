/*
 * The babylonjs fileloader plugins need to be added by imports-loader webpack plugin.
 * imports-loader gives us the ability to inject BABYLON global variable into babylonjs plugins.
 */
import 'imports-loader?BABYLON=babylonjs!babylonjs/dist/preview release/loaders/babylonjs.loaders.js';
import 'imports-loader?__extends=typescript-extends,__decorate=typescript-decorate,BABYLON=babylonjs!babylonjs/dist/preview release/materialsLibrary/babylonjs.materials.js';

export class  BabylonJsPluginLoader {
    constructor() { 
        console.log("BabylonJsPluginLoader created.");
    }
}