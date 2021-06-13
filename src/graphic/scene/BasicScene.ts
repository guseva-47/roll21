import * as PIXI from 'pixi.js';
import assert from 'assert';
import { clamp } from '../../common/Utils';
import IScene, { TokenLayerType } from './IScene';
import DefaultLoggerBuilder from '../DefaultLoggerBuilder';
import SquareGridCollider from '../grid/collider/SquareGridCollider';
import DefaultDnDLogicBuilder from '../dragAndDrop/DefaultDnDLogicBuilder';
import DragAndDropArea from '../dragAndDrop/DragAndDropArea';
import IGridView from '../grid/view/IGridView';
import SquareGridView from '../grid/view/SquareGridView';
import IPrivateScene from './IPrivateScene';
import IToken from './token/IToken';
import IPrivateToken from './token/IPrivateToken';

export default class BasicScene implements IPrivateScene {
    /** replaceable logger writes to browser console by default */
    logger = DefaultLoggerBuilder.inst.build(this);

    readonly tokenList: IToken[] = [];

    readonly container: PIXI.Container;

    private grid: IGridView;
    private dndArea: DragAndDropArea;

    private layerType: TokenLayerType = TokenLayerType.PLAYER;
    private readonly tokens: PIXI.Container[];

    static create(rowLen: number, columnLen: number, cellSize: number) {
        return new BasicScene(rowLen, columnLen, cellSize);
    }

    constructor(rowLen: number, columnLen: number, cellSize: number) {
        assert(Number.isInteger(rowLen) && rowLen > 0);
        assert(Number.isInteger(columnLen) && columnLen > 0);
        assert(Number.isInteger(cellSize) && cellSize > 0);

        const [width, height] = [rowLen * cellSize, columnLen * cellSize];

        this.container = new PIXI.Container();

        const gridCollider = new SquareGridCollider(
            rowLen,
            columnLen,
            cellSize,
        );

        const alphaOnDrag = 0.5;
        const dndLogic = DefaultDnDLogicBuilder.inst.build(
            gridCollider,
            alphaOnDrag,
        );

        // контейнер со слоями
        const layerContainer = new PIXI.Graphics()
            .beginFill(0x222222)
            .drawRect(0, 0, width, height);

        // tokens' collection
        this.tokens = Array(Object.keys(TokenLayerType).length / 2)
            .fill(null)
            .map((_, i) => {
                const layer = new PIXI.Container();
                layer.name = TokenLayerType[i];
                return layer;
            });
        layerContainer.addChild(...this.tokens);

        // drag and drop area
        this.dndArea = new DragAndDropArea(layerContainer, dndLogic);

        // контейнер со слоями первый, чтобы сетка была выше
        this.container.addChild(layerContainer);
        this.grid = new SquareGridView(this.container, gridCollider);
    }

    changeLayer(layer: TokenLayerType): void {
        this.logger.info(
            `change layer ${TokenLayerType[this.layerType]} to ${
                TokenLayerType[layer]
            }`,
        );

        this.layerType = layer;
    }

    render(_renderer: PIXI.Renderer): void {}

    async addToken(token: IToken, isSnappingGrid: boolean) {
        if (this.hasToken(token.name)) {
            throw Error(`token with name '${token.name}' already exist`);
        }

        this.tokenList.push(token);

        let { x, y, width, height } = token;

        x = clamp((x - this.container.x) / this.scale, 0, this.width);
        y = clamp((y - this.container.y) / this.scale, 0, this.height);

        if (isSnappingGrid) {
            const snapToGrid = (v: number) => this.grid.collider.snapToGrid(v);

            [x, y] = [snapToGrid(x), snapToGrid(y)];

            if (width > this.cellSize) {
                width = snapToGrid(width);
            }
            if (height > this.cellSize) {
                height = snapToGrid(height);
            }
        }

        const sprite = (token as IPrivateToken).sprite;
        sprite.width = width;
        sprite.height = height;
        sprite.position.set(x, y);

        this.logger.info(
            `new token <id=${sprite.name}, x=${sprite.x}, y=${sprite.y}, w=${sprite.width}, h=${sprite.height}>`,
        );

        this.dndArea.attach(sprite);
        this.layer.addChild(sprite);
    }

    removeToken(name: string): boolean {
        const idx = this.tokenList.findIndex(token => token.name === name);

        if (idx >= 0) {
            const token = this.tokenList.splice(idx, 1)[0] as IPrivateToken;
            this.dndArea.detach(token.sprite);
            this.layer.removeChild(token.sprite);
        }
        return idx >= 0;
    }

    hasToken(name: string): boolean {
        return this.layer.getChildByName(name) != null;
    }

    get rowLen(): number {
        return this.grid.collider.rowLen;
    }
    get columnLen(): number {
        return this.grid.collider.columnLen;
    }
    get cellSize(): number {
        return this.grid.collider.cellSize;
    }

    get scale(): number {
        return this.container.scale.x;
    }
    set scale(scale: number) {
        this.container.scale.set(scale);
        this.grid.redraw();
    }

    get width() {
        return this.rowLen * this.cellSize;
    }
    get height() {
        return this.columnLen * this.cellSize;
    }

    private get layer(): PIXI.Container {
        return this.tokens[this.layerType];
    }
}
