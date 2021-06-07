import * as PIXI from 'pixi.js';
import assert from 'assert';
import IToken, { ITokenData } from './IToken';
import Token from './Token';

type TokenData = Pick<ITokenData, 'name' | 'url'> & Partial<ITokenData>;

export default class TokenLoader {
    async loadToken(tokenData: TokenData): Promise<IToken> {
        const { name, url, x, y, width, height } = tokenData;
        const texture = await this.loadTexture(name, url);
        return new Token(name, url, texture, x, y, width, height);
    }

    private async loadTexture(
        name: string,
        url: string,
    ): Promise<PIXI.Texture> {
        const loader = new PIXI.Loader();
        loader.add(name, url);
        const resources = await loadAsync(loader);
        const texture = resources[name].texture;

        assert(texture);
        return texture;
    }
}

function loadAsync(loader: PIXI.Loader): Promise<PIXI.IResourceDictionary> {
    return new Promise<PIXI.IResourceDictionary>((resolve, reject) => {
        loader.onComplete.once(
            (_loader: PIXI.Loader, resources: PIXI.IResourceDictionary) => {
                resolve(resources);
            },
        );
        loader.onError.once((_loader: PIXI.Loader, err: Error) => {
            reject(err);
        });

        loader.load();
    });
}
