// @flow
import * as Ship from 'redux-ship';
import * as RepoController from '../components/Repo/controller';
import * as Model from './model';

export type Action = {
  type: 'Repo',
  action: RepoController.Action,
};

export function* control(
  action: Action,
): Ship.Ship<*, Model.Commit, Model.State, void> {
  switch (action.type) {
    case 'Repo':
      return yield* Ship.map(
        commit => ({ type: 'Repo', commit }),
        state => state.repo,
        RepoController.control(action.action),
      );
    default:
      return;
  }
}
