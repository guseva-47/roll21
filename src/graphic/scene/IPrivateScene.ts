import * as PIXI from 'pixi.js';
import IScene from './IScene';

/**
 * private scane interface
 * it's using inside app
 */
export default interface IPrivateScene extends IScene {
    /** sprite container. do not use it */
    container: PIXI.Container;
    /** render by renderer of pixi app */
    render(renderer: PIXI.Renderer): void;
}
