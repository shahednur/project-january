// @flow
import React from 'react';

import * as GitCommitController from '../components/GitCommit/controller';
import GitCommit from '../components/GitCommit';
import { Controller, Model } from '../Root';

type Props = {
  dispatch(action: Controller.Action): void,
  state: Model.State,
  params: *
};

export default ({ dispatch, state, params }: Props) => (
  <GitCommit
    dispatch={(action: GitCommitController.Action) => {
      dispatch({ type: 'GitCommit', action });
    }}
    state={state.gitCommit}
    params={params}
  />
);
