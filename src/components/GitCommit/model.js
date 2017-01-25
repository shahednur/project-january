// @flow
import type { Props as GitCommitCardType } from '../GitCommitCard';
export type State =
  | { status: 'initial' }
  | { status: 'loading' }
  | { status: 'loaded', gitCommitText: string, commit: GitCommitCardType };

export const initialState: State = { status: 'initial' };

export type Commit =
  | {| type: 'LoadStart' |}
  | {| type: 'LoadSuccess', gitCommitText: string, commit: GitCommitCardType |};

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'LoadStart':
      return { status: 'loading' };
    case 'LoadSuccess':
      return {
        gitCommitText: commit.gitCommitText,
        commit: commit.commit,
        status: 'loaded'
      };
    default:
      return state;
  }
}
