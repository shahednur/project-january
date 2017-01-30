// @flow
import React from 'react';

import * as StatsController from '../components/Stats/controller';
import Stats from '../components/Stats';
import { Controller, Model } from '../Root';

type Props = {
  dispatch(action: Controller.Action): void,
  state: Model.State,
  params: *
};

export default ({ dispatch, state, params }: Props) => (
  <Stats
    dispatch={(action: StatsController.Action) => {
      dispatch({ type: 'Stats', action });
    }}
    state={state.stats}
    params={params}
  />
);
