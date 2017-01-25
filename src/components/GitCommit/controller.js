// @flow
import * as Ship from 'redux-ship';
import { Effect } from '../../Root';
import * as GitCommitModel from './model';
import { createAction } from 'redux-actions';
import { getCommits } from '../GitCommitCard';

export type Payload = { repoName: string, author: string, commit: string };

export const AC = (payload: Payload) => createAction('Commit')(payload);

export type Action = { type: 'Load', payload: Payload };

export function* control(
  action: Action
): Ship.Ship<*, GitCommitModel.Commit, GitCommitModel.State, void> {
  switch (action.type) {
    case 'Load': {
      const { repoName, author, commit } = action.payload;
      yield* Ship.commit({ type: 'LoadStart' });
      const gitCommitText = yield* Effect.httpRequest(
        `https://api.github.com/repos/${author}/${repoName}/commits/${commit}`
      );
      const parsed = JSON.parse(gitCommitText);

      yield* Ship.commit({
        type: 'LoadSuccess',
        gitCommitText,
        commit: getCommits(parsed)
      });
      return;
    }
    default:
      return;
  }
}
