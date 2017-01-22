//@flow

import React, { Component } from 'react';
import R from 'ramda';
import { matchPath } from './lib/router';
import routes from './routes';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    const { location, dispatch, state } = this.props;
    const pathname = location.pathname;
    console.log(location);

    const route = R.find(
      pair => matchPath(pathname, pair[1].path),
    )(R.reverse(R.toPairs(routes)));

    if (!route) {
      return <div>404</div>;
    }

    console.log('routeMatch', route[0]);

    const matching = matchPath(pathname, route[1].path);
    const ComponentToRender = route[1].render;

    return (
      <div>
        <Navigation />
        <ComponentToRender
          {...matching.params}
          dispatch={dispatch}
          state={state}
        />
      </div>
    );
  }
}

export default App;
