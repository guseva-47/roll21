import IToken from './token/IToken';

export enum TokenLayerType {
    BACKGROUND = 0,
    BARRIER,
    PLAYER,
}

/**
 * public scene interface
 */
export default interface IScene {
    /** default scale is 1 */
    scale: number;

    /** @readonly cells amount in the row */
    rowLen: number;
    /** @readonly cells amount in the column */
    columnLen: number;
    /** @readonly size of cell in pixels */
    cellSize: number;

    /** scene width without scale */
    width: number;
    /** scene height without scale */
    height: number;

    /** list of scene tokens */
    tokenList: IToken[];

    /**
     * @param token token of image on the scene
     * @param isSnappingGrid if true then image fitting to the cells
     */
    addToken(token: IToken, isSnappingGrid: boolean): Promise<void>;

    /** @param name unique image name */
    removeToken(name: string): boolean;

    /**
     * set active layer
     *
     * it can affect the view, adding and removing tokens
     */
    changeLayer(layer: TokenLayerType): void;
}
