// @flow
import * as Ship from 'redux-ship';
import * as Effect from '../../containers/effect';
import * as RepoModel from './model';

export type Action = { type: 'Load' };

export function* control(
  action: Action,
): Ship.Ship<*, RepoModel.Commit, RepoModel.State, void> {
  switch (action.type) {
    case 'Load': {
      yield* Ship.commit({ type: 'LoadStart' });
      const r2d2 = yield* Effect.httpRequest(
        'http://swapi.co/api/people/3/',
      );
      const eyeColor = JSON.parse(r2d2).eye_color;
      yield* Ship.commit({
        type: 'LoadSuccess',
        color: eyeColor,
      });
      return;
    }
    default:
      return;
  }
}
