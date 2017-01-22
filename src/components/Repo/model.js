// @flow

export type State = {
  readmeText: ?string,
  isLoading: boolean,
};

export const initialState: State = {
  readmeText: null,
  isLoading: false,
};

export type Commit =
  | { type: 'LoadStart' }
  | { type: 'LoadSuccess', readmeText: string };

export function reduce(
  state: State,
  commit: Commit,
): State {
  switch (commit.type) {
    case 'LoadStart':
      return { ...state, isLoading: true };
    case 'LoadSuccess':
      return {
        ...state,
        readmeText: commit.readmeText,
        isLoading: false,
      };
    default:
      return state;
  }
}
