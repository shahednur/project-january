//@flow

import React, { Component } from 'react';
import R from 'ramda';
import { matchPath } from './lib/router';
import routes from './routes';
import Navigation from './components/Navigation';
import type { State } from './Root/model';

type Props = {|
  location: {| pathname: string |},
  dispatch: Function,
  state: State,
|};

class App extends Component<*, Props, *> {
  render() {
    const { location, dispatch, state } = this.props;
    const pathname = location.pathname;

    const routePair = R.compose(
      R.find(pair => !!matchPath(pathname, pair[1].path)),
      R.reverse,
      R.toPairs,
    )(routes);

    if (!routePair) {
      return <div>404</div>;
    }

    const routeObj = routePair[1];

    const path_ = routeObj.path;

    const matching = matchPath(pathname, path_);

    if (!matching) {
      return <div>404</div>;
    }
    const ComponentToRender = routeObj.render;
    const { params } = matching;

    return (
      <div>
        <Navigation />
        <ComponentToRender
          params={params}
          dispatch={dispatch}
          state={state}
        />
      </div>
    );
  }
}

export default App;
