// @flow

export type State =
  | { status: 'initial' }
  | { status: 'loading' }
  | { status: 'loaded', statsText: string };

export const initialState: State = { status: 'initial' };

export type Commit =
  | {| type: 'LoadStart' |}
  | {| type: 'LoadSuccess', statsText: string |};

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'LoadStart':
      return { status: 'loading' };
    case 'LoadSuccess':
      return { status: 'loaded', statsText: commit.statsText };
    default:
      return state;
  }
}
