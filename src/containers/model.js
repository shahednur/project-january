// @flow
import * as RepoModel from '../components/Repo/model';

export type State = { repo: RepoModel.State };

export const initialState: State = {
  repo: RepoModel.initialState,
};

export type Commit = {
  type: 'Repo',
  commit: RepoModel.Commit,
};

export function reduce(
  state: State,
  commit: Commit,
): State {
  switch (commit.type) {
    case 'Repo':
      return {
        ...state,
        repo: RepoModel.reduce(state.repo, commit.commit),
      };
    default:
      return state;
  }
}
