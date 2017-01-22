// @flow
import * as Ship from 'redux-ship';
import { Effect } from '../../Root';
import * as RepoModel from './model';
import { createAction } from 'redux-actions';

export type Payload = { author: string, repoName: string };

export const AC = (payload: Payload) =>
  createAction('Repo');

export type Action = { type: 'Load', payload: Payload };

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
