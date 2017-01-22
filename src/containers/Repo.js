// @flow
import React from 'react';

import * as RepoController from '../components/Repo/controller';
import Repo from '../components/Repo';
import { Controller, Model } from '../Root';

type Props = {
  dispatch(action: Controller.Action): void,
  state: Model.State,
  params: { author: string, repoName: string },
};

export default ({ dispatch, state, params }: Props) => (
  <Repo
    dispatch={(action: RepoController.Action) => {
        dispatch(RepoController.AC(action));
      }}
    state={state.repo}
    params={params}
  />
);
