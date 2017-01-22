// @flow
import React from 'react';
import * as RepoController from './controller';
import * as RepoModel from './model';
import MdText from '../MdText';

type Props = {
  dispatch(action: RepoController.Action): void,
  state: RepoModel.State,
  params: { author: string, repoName: string },
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
        {
          state.readmeText &&
            <MdText text={state.readmeText} />
        }
        {state.isLoading ? 'Loading...' : 'Get color'}
      </div>
    );
  }
}
