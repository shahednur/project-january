// @flow
import React from 'react';
import { Element } from 'react-stylesheet';
import * as StatsController from './controller';
import * as StatsModel from './model';
import MdText from '../MdText';

type Props = {
  dispatch(action: StatsController.Action): void,
  state: StatsModel.State,
  params: {}
};

export default class extends React.Component<*, Props, *> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'Load', payload: {} });
  }
  render() {
    const { state } = this.props;

    return (
      <div>
        {state.status === 'loading' && 'Loading...'}
        {
          state.status === 'loaded' && (
            <Element height={30}>
              <MdText text={state.statsText} />
            </Element>
            )
        }
      </div>
    );
  }
}
