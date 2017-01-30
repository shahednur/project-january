// @flow
import * as Ship from '../redux-ship';
import * as RepoController from '../components/Repo/controller';
import * as StatsController from '../components/Stats/controller';
import * as GitCommitController from '../components/GitCommit/controller';
import * as Model from './model';

export type Action =
  | { type: 'Stats', action: StatsController.Action }
  | { type: 'Repo', action: RepoController.Action }
  | { type: 'GitCommit', action: GitCommitController.Action };

export function* control(
  action: Action
): Ship.Ship<*, Model.Commit, Model.State, void> {
  switch (action.type) {
    case 'Repo':
      return yield* Ship.map(
        commit => ({ type: 'Repo', commit }),
        state => state.repo,
        RepoController.control(action.action)
      );
    case 'Stats':
      return yield* Ship.map(
        commit => ({ type: 'Stats', commit }),
        state => state.stats,
        StatsController.control(action.action)
      );
    case 'GitCommit':
      return yield* Ship.map(
        commit => ({ type: 'GitCommit', commit }),
        state => state.gitCommit,
        GitCommitController.control(action.action)
      );
    default:
      return;
  }
}
