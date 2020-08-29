export enum DataState {
    NOT_LOADED,
    LOADED_NO_DATA,
    LOADED_WITH_DATA
}

export default class DataStateManager<T> {
    private _state: DataState = DataState.NOT_LOADED;

    public updateState(items: T[]): void {
        this._state = items.length > 0 ? DataState.LOADED_WITH_DATA : DataState.LOADED_NO_DATA;
    }

    public hasNoItems(): boolean {
        return this._state === DataState.LOADED_NO_DATA;
    }

    public get state(): DataState {
        return this._state;
    }
}
