import IResizable from '../../common/IResizable';
import IClosable from '../../common/IClosable';
import IScene from '../scene/IScene';
import IToken from '../scene/token/IToken';

export default interface IGraphicApp extends IResizable, IClosable {
    isSnappingGrid: boolean;
    
    tokenList: IToken[];

    setScene(scene: IScene): void;
    addToken(token: IToken): void;
    removeTokenByName(name: string): void;
}
