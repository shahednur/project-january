// @flow
import * as RepoModel from '../components/Repo/model';
import * as GitCommitModel from '../components/GitCommit/model';

export type State = { repo: RepoModel.State, gitCommit: GitCommitModel.State };

export const initialState: State = {
  repo: RepoModel.initialState,
  gitCommit: GitCommitModel.initialState
};

export type Commit =
  | { type: 'Repo', commit: RepoModel.Commit }
  | { type: 'GitCommit', commit: GitCommitModel.Commit };

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'Repo':
      return { ...state, repo: RepoModel.reduce(state.repo, commit.commit) };
    case 'GitCommit':
      return {
        ...state,
        gitCommit: GitCommitModel.reduce(state.gitCommit, commit.commit)
      };
    default:
      return state;
  }
}
