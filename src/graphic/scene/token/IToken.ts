export interface ITokenData {
    name: string;
    url: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default interface IToken extends ITokenData {
    /** возвращает простой объект с текущими значениями полей токена */
    extractState(): ITokenData;
}
