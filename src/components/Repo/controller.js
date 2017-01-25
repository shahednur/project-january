// @flow
import * as Ship from 'redux-ship';
import R from 'ramda';
import { Effect } from '../../Root';
import * as RepoModel from './model';
import { createAction } from 'redux-actions';
import { getCommits } from '../GitCommitCard';
export type Payload = { author: string, repoName: string, branch: string };

export const AC = (payload: Payload) => createAction('Repo')(payload);

export type Action = { type: 'Load', payload: Payload };

export function* control(
  action: Action
): Ship.Ship<*, RepoModel.Commit, RepoModel.State, void> {
  switch (action.type) {
    case 'Load': {
      const { author, repoName, branch } = action.payload;
      console.log(branch);
      yield* Ship.commit({ type: 'LoadStart', branch });

      const selectedBranch = branch || 'master';

      const branches = yield* Effect.httpRequest(
        `https://api.github.com/repos/${author}/${repoName}/branches`
      );

      const branchesNames = R.compose(R.pluck('name'), JSON.parse)(branches);

      const gitRepoText = yield* Effect.httpRequest(
        `https://api.github.com/repos/${author}/${repoName}/commits?sha=${selectedBranch}`
      );

      const parsed = JSON.parse(gitRepoText);

      yield* Ship.commit({
        type: 'LoadSuccess',
        gitRepoText,
        commits: parsed.map(getCommits),
        branches: branchesNames
      });
      return;
    }
    default:
      return;
  }
}
