// @flow
import type { Ship } from '../../redux-ship';
import { call } from '../../redux-ship';
import { createMessageAction } from '../middlewares/ws';

export type Effect =
  | { type: 'HttpRequest', url: string }
  | { type: 'WsRequest', ws: string, data?: Object };

export const run = ({ dispatch }: { dispatch: Function }) =>
  async (effect: Effect): any => {
    switch (effect.type) {
      case 'HttpRequest': {
        const { url } = effect;
        const response = await fetch(url);
        return await response.text();
      }
      case 'WsRequest': {
        const { ws, data } = effect;

        const connection = dispatch(
          createMessageAction(ws)({
            message: data ? JSON.stringify(data) : undefined
          })
        );

        const source = connection.socket;

        let deferred;

        source.onmessage = event => {
          if (deferred) {
            deferred.resolve(JSON.parse(event.data));
            deferred = null;
          }
        };

        const iterator = {
          next() {
            if (!deferred) {
              deferred = {};
              deferred.promise = new Promise(
                //$FlowIssue
                resolve => deferred.resolve = resolve
              );
            }
            return deferred.promise;
          }
        };

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        var res = async function*() {
          var i = 0;
          while (true) {
            await delay(Math.random() * 1000);
            yield i++;
          }
        };

        return res;
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

export function wsRequest<Commit, State>(
  ws: string,
  data?: Object
): Ship<Effect, Commit, State, *> {
  return call({ type: 'WsRequest', ws, data });
}
