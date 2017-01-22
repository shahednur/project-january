// @flow
import * as Ship from 'redux-ship';
import * as Effect from '../../containers/effect';
import * as RepoModel from './model';

export type Action = {
  type: 'Load',
  payload: { author: string, repoName: string },
};

export function* control(
  action: Action,
): Ship.Ship<*, RepoModel.Commit, RepoModel.State, void> {
  switch (action.type) {
    case 'Load': {
      const { author, repoName } = action.payload;
      yield* Ship.commit({ type: 'LoadStart' });
      const readmeText = yield* Effect.httpRequest(
        `https://raw.githubusercontent.com/${author}/${repoName}/master/README.md`,
      );
      yield* Ship.commit({
        type: 'LoadSuccess',
        readmeText,
      });
      return;
    }
    default:
      return;
  }
}
