import { RenderCanvas } from './RenderCanvas';
import { Scene } from './scene';
import { Camera } from './camera';
import { World } from './world';

export class Game {

    private renderCanvas: RenderCanvas;
    private camera: Camera;
    
    public renderScene: Scene;
    public world: World;

    constructor(canvasElement: string) {
        // Create canvas and engine
        this.renderCanvas = new RenderCanvas(canvasElement);
    }

    /**
     * Creates the BABYLONJS Scene
     */
    createScene(): void {
        this.renderScene = new Scene(this.renderCanvas);

        this.camera = new Camera(this.renderScene, 1);

        this.world = new World(this.renderScene, true, true);

    }



}
