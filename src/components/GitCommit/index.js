// @flow
import React from 'react';
import * as GitCommitController from './controller';
import * as GitCommitModel from './model';
import MdText from '../MdText';
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
        {state.gitCommitText && <MdText text={state.gitCommitText} />}
        {state.isLoading ? 'Loading...' : ''}
      </div>
    );
  }
}
