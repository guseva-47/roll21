import * as PIXI from 'pixi.js';
import DefaultLoggerBuilder from '../DefaultLoggerBuilder';
import IGraphicApp from './IGraphicApp';
import IPrivateScene from '../scene/IPrivateScene';
import IScene, { TokenLayerType } from '../scene/IScene';
import IToken from '../scene/token/IToken';

export default class PixiApp implements IGraphicApp {
    /** parent html element */
    readonly root: HTMLElement;

    /** replaceable logger writes to browser console by default */
    logger = DefaultLoggerBuilder.inst.build(this);

    /** if true then image fitting to the cells */
    isSnappingGrid: boolean = true;

    private readonly app: PIXI.Application;
    private scene!: IPrivateScene;

    constructor(
        root: HTMLElement,
        scene: IScene,
        width: number = root.clientWidth,
        height: number = root.clientHeight,
    ) {
        this.root = root;

        this.app = new PIXI.Application({
            backgroundColor: 0x002000,
            width,
            height,
        });
        root.appendChild(this.app.view);

        this.setScene(scene);

        this.app.ticker.add(() => {
            this.scene.render(this.app.renderer);
        });
    }

    setScene(scene: IScene) {
        this.scene = scene as IPrivateScene;

        this.app.stage.removeChildren();
        this.app.stage.addChild(this.scene.container);

        scaleTo(this.scene, this.width, this.height);
        centerTo(this.scene, this.width / 2, this.height / 2);
    }

    changeLayer(layer: TokenLayerType): void {
        this.scene.changeLayer(layer);
    }

    addToken(token: IToken): void {
        this.scene.addToken(token, this.isSnappingGrid);
        // assert(!this.scene.hasToken(name));

        // if (!this.scene.hasToken(name)) {
        //     this.scene.addToken(name, url, x, y, this.isSnappingGrid);
        // }
    }

    removeTokenByName(name: string): void {
        this.scene.removeToken(name);
    }

    get tokenList(): IToken[] {
        return this.scene.tokenList;
    }

    get width() {
        return this.app.screen.width;
    }
    get height() {
        return this.app.screen.height;
    }

    close() {
        this.app.destroy(true);
    }

    resize(width: number, height: number) {
        this.app.renderer.resize(width, height);
        centerTo(this.scene, width / 2, height / 2);
    }
}

function centerTo(scene: IPrivateScene, x: number, y: number) {
    const updatedX = x - scene.container.width / 2;
    const updatedY = y - scene.container.height / 2;
    scene.container.position.set(updatedX, updatedY);
}

function scaleTo(scene: IPrivateScene, width: number, height: number) {
    const scaledWidth = width / scene.width;
    const scaledHeight = height / scene.height;
    scene.scale = Math.min(scaledWidth, scaledHeight);
}
