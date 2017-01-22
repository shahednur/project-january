//@flow

import React, { Component } from 'react';
import R from 'ramda';
import { matchPath } from './lib/router';
import routes from './routes';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    const pathname = this.props.location.pathname;
    console.log(this.props.location);

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
        <ComponentToRender {...matching.params} />
      </div>
    );
  }
}

export default App;
