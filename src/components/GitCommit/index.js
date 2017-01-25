// @flow
import React from 'react';
import * as GitCommitController from './controller';
import * as GitCommitModel from './model';
import GitCommitCard from '../GitCommitCard';

import type { Payload } from './controller';

type Props = {
  dispatch(action: GitCommitController.Action): void,
  state: GitCommitModel.State,
  params: Payload
};

export default class extends React.Component<*, Props, *> {
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch({ type: 'Load', payload: params });
  }
  render() {
    const { state } = this.props;

    return (
      <div>
        {state.status === 'loading' && 'Loading...'}
        {
          state.status === 'loaded' && (
            <div>
              <GitCommitCard {...state.commit} />
            </div>
            )
        }
      </div>
    );
  }
}
// <MdText text={state.gitCommitText} />
