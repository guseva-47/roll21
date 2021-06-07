import * as PIXI from 'pixi.js';
import IPrivateToken from './IPrivateToken';
import { ITokenData } from './IToken';

export default class Token implements IPrivateToken {
    readonly sprite: PIXI.Sprite;
    readonly url: string;

    constructor(
        name: string,
        url: string,
        texture: PIXI.Texture,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    ) {
        this.url = url;

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.name = name;
        x != null && (this.sprite.x = x);
        y != null && (this.sprite.y = y);
        width != null && (this.sprite.width = width);
        height != null && (this.sprite.height = height);
    }

    get name(): string {
        return this.sprite.name;
    }

    get x(): number {
        return this.sprite.x;
    }
    set x(value: number) {
        this.sprite.x = value;
    }

    get y(): number {
        return this.sprite.y;
    }
    set y(value: number) {
        this.sprite.y = value;
    }

    get width(): number {
        return this.sprite.width;
    }
    set width(value: number) {
        this.sprite.width = value;
    }

    get height(): number {
        return this.sprite.height;
    }
    set height(value: number) {
        this.sprite.height = value;
    }

    extractState(): ITokenData {
        const { name, url, x, y, width, height } = this;
        return { name, url, x, y, width, height };
    }
}
