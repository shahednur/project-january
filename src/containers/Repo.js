// @flow
import React, { PureComponent } from 'react';

import * as RepoController from '../components/Repo/controller';
import Repo from '../components/Repo';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch(action: Controller.Action): void,
  state: Model.State,
  params: { author: string, repoName: string },
};

export default class extends PureComponent<void, Props, void> {
  handleDispatchRepo = (
    action: RepoController.Action,
  ): void =>
    {
      this.props.dispatch({ type: 'Repo', action });
    };

  render() {
    return (
      <Repo
        dispatch={this.handleDispatchRepo}
        state={this.props.state.repo}
        params={this.props.params}
      />
    );
  }
}
