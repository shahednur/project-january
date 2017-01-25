// @flow

export type State =
  | { status: 'initial', branches: Array<string>, branch: string }
  | { status: 'loading', branches: Array<string>, branch: string }
  | {
    status: 'loaded',
    gitRepoText: string,
    branches: Array<string>,
    branch: string
  };

export const initialState: State = {
  status: 'initial',
  branches: [],
  branch: 'master'
};

export type Commit =
  | { type: 'LoadStart', branch: string }
  | { type: 'LoadSuccess', gitRepoText: string, branches: Array<string> };

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'LoadStart':
      return {
        status: 'loading',
        branches: state.branches,
        branch: commit.branch
      };
    case 'LoadSuccess':
      return {
        status: 'loaded',
        branch: state.branch,
        gitRepoText: commit.gitRepoText,
        branches: commit.branches
      };
    default:
      return state;
  }
}
