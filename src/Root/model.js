// @flow
import * as RepoModel from '../components/Repo/model';
import * as GitCommitModel from '../components/GitCommit/model';
import * as StatsModel from '../components/Stats/model';

export type State = {
  repo: RepoModel.State,
  gitCommit: GitCommitModel.State,
  stats: StatsModel.State
};

export const initialState: State = {
  repo: RepoModel.initialState,
  gitCommit: GitCommitModel.initialState,
  stats: StatsModel.initialState
};

export type Commit =
  | { type: 'Repo', commit: RepoModel.Commit }
  | { type: 'GitCommit', commit: GitCommitModel.Commit }
  | { type: 'Stats', commit: StatsModel.Commit };

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'Repo':
      return { ...state, repo: RepoModel.reduce(state.repo, commit.commit) };
    case 'Stats':
      return { ...state, stats: StatsModel.reduce(state.stats, commit.commit) };
    case 'GitCommit':
      return {
        ...state,
        gitCommit: GitCommitModel.reduce(state.gitCommit, commit.commit)
      };
    default:
      return state;
  }
}
