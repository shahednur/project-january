// @flow

import * as Ship from 'redux-ship';
import { Effect } from '../../Root';
import { createAction } from 'redux-actions';
import * as StatsModel from './model';
export type Payload = {};

export const AC = (payload: Payload) => createAction('Stats')(payload);

export type Action = { type: 'Load', payload: Payload };

export function* control(
  action: Action
): Ship.Ship<*, StatsModel.Commit, StatsModel.State, void> {
  switch (action.type) {
    case 'Load': {
      yield* Ship.commit({ type: 'LoadStart' });

      const wsListen = yield* Effect.wsCreate('ws://localhost:3000/stats');

      while (1) {
        /*wsListen.getConnection()*/
        const { done, value } = yield* Effect.wsGet();

        yield* Ship.commit({
          type: 'LoadSuccess',
          statsText: JSON.stringify(value, null, 2)
        });
      }

      return;
    }
    default:
      return;
  }
}
