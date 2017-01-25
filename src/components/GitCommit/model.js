// @flow

export type State = { gitCommitText: ?string, isLoading: boolean };

export const initialState: State = { gitCommitText: null, isLoading: false };

export type Commit =
  | { type: 'LoadStart' }
  | { type: 'LoadSuccess', gitCommitText: string };

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'LoadStart':
      return { ...state, isLoading: true };
    case 'LoadSuccess':
      return {
        ...state,
        gitCommitText: commit.gitCommitText,
        isLoading: false
      };
    default:
      return state;
  }
}
