// @flow

export type State =
  | { status: 'initial' }
  | { status: 'loading' }
  | {
    status: 'loaded',
    gitCommitText: string,
    author: string,
    avatar: string,
    title: string,
    date: Date
  };

export const initialState: State = { status: 'initial' };

export type Commit =
  | { type: 'LoadStart' }
  | {
    type: 'LoadSuccess',
    gitCommitText: string,
    author: string,
    avatar: string,
    title: string,
    date: Date
  };

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'LoadStart':
      return { status: 'loading' };
    case 'LoadSuccess':
      return {
        gitCommitText: commit.gitCommitText,
        author: commit.author,
        avatar: commit.avatar,
        title: commit.title,
        date: commit.date,
        status: 'loaded'
      };
    default:
      return state;
  }
}
