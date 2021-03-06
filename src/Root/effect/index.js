// @flow
import type { Ship } from 'redux-ship';
import { call } from 'redux-ship';
import { createMessageAction } from '../middlewares/ws';

export type Effect =
  | { type: 'HttpRequest', url: string }
  | { type: 'wsCreate', ws: string }
  | { type: 'wsGet', data?: Object };

let iterator;
export const run = ({ dispatch }: { dispatch: Function }) => async (
  effect: Effect
): any => {
  switch (effect.type) {
    case 'HttpRequest': {
      const { url } = effect;
      const response = await fetch(url);
      return await response.text();
    }
    case 'wsCreate': {
      const { ws, data } = effect;

      const connection = dispatch(createMessageAction(ws)({
          message: data ? JSON.stringify(data) : undefined
        }));

      const source = connection.socket;

      let deferred;

      source.onmessage = event => {
        if (deferred) {
          deferred.resolve(JSON.parse(event.data));
          deferred = null;
        }
      };
      iterator = {
        next() {
          if (!deferred) {
            deferred = {};
            deferred.promise = new Promise(
              resolve => deferred.resolve = resolve
            );
          }
          return deferred.promise;
        }
      };

      return {};
    }
    case 'wsGet': {
      // const { data } = effect;

      return await iterator.next();
    }
    default:
      return;
  }
};

export function httpRequest<Commit, State>(
  url: string
): Ship<Effect, Commit, State, string> {
  return call({ type: 'HttpRequest', url });
}

export function wsCreate<Commit, State>(
  ws: string,
  data?: Object
): Ship<Effect, Commit, State, *> {
  return call({ type: 'wsCreate', ws, data });
}

export function wsGet<Commit, State>(
  data?: Object
): Ship<Effect, Commit, State, *> {
  return call({ type: 'wsGet', data });
}
