declare module 'redux-actions' {
  declare function createAction<NAME, T>(
    type: NAME,
    payloadCreator?: Function,
    metaCreator?: Function,
  ): (a: T) => { type: NAME, payload: T };
  declare function handleAction(
    type: string,
    reducer: Object | Function,
  ): Function;
  declare function handleActions(
    reducerMap: Object,
    defaultState?: Object,
  ): Function;
}
