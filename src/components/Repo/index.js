// @flow
import React from 'react';
import * as RepoController from './controller';
import * as RepoModel from './model';

type Props = {
  dispatch(action: RepoController.Action): void,
  state: RepoModel.State,
};

export default ({ state, dispatch }: Props) => {
  return (
    <div>
      {state.color && <p>{state.color}</p>}
      <button
        disabled={state.isLoading}
        onClick={() => {
          dispatch({ type: 'Load' });
        }}
      >
        {state.isLoading ? 'Loading...' : 'Get color'}
      </button>
    </div>
  );
};
