// @flow
import R from 'ramda';
import React from 'react';
import { Element } from 'react-stylesheet';
import * as RepoController from './controller';
import * as RepoModel from './model';
import Dropdown from 'react-dropdown';
import GitCommitCard from '../GitCommitCard';

import './dropdown.css';

type Props = {
  dispatch(action: RepoController.Action): void,
  state: RepoModel.State,
  params: { author: string, repoName: string }
};

export default class extends React.Component<*, Props, *> {
  componentDidMount() {
    const { dispatch, params, state: { branch } } = this.props;
    dispatch({ type: 'Load', payload: { ...params, branch } });
  }
  render() {
    const { state, dispatch, params } = this.props;

    return (
      <div>
        {state.status === 'loading' && 'Loading...'}
        {
          state.status === 'loaded' && (
              <div>
                <Element height={30}>
                  <Dropdown
                    options={state.branches}
                    onChange={({ value }) => {
                      dispatch({
                        type: 'Load',
                        payload: { ...params, branch: value }
                      });
                    }}
                    value={state.branch}
                    placeholder="Select branch"
                  />
                </Element>
                {R.map(props => <GitCommitCard {...props} />)(state.commits)}
              </div>
            )
        }
      </div>
    );
  }
}
//  <MdText text={state.gitRepoText} />
