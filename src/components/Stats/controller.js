// @flow
import * as Ship from '../../redux-ship';
import { Effect } from '../../Root';
import * as StatsModel from './model';
import { createAction } from 'redux-actions';
export type Payload = {};

export const AC = (payload: Payload) => createAction('Stats')(payload);

export type Action = { type: 'Load', payload: Payload };

export function* control(
  action: Action
): Ship.Ship<*, StatsModel.Commit, StatsModel.State, void> {
  switch (action.type) {
    case 'Load': {
      yield* Ship.commit({ type: 'LoadStart' });

      const iterator = yield* Effect.wsRequest('ws://localhost:3000/stats');
      var run = async function() {
        for await (let n of iterator()) {
          console.log(n);
        }
      };

      run();
      // while (1) {
      //   const statsText = yield await iterator.next();
      //   console.log(statsText);
      //   yield* Ship.commit({ type: 'LoadSuccess', statsText });
      // }
    }
    default:
      return;
  }
}
