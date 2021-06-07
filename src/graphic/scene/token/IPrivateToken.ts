import * as PIXI from 'pixi.js';
import IToken from './IToken';

export default interface IPrivateToken extends IToken {
    sprite: PIXI.Sprite;
}
