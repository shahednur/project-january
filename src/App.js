import React, { Component } from 'react';
import R from 'ramda'
import routes from './routes'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const matchRoute = (pattern:string, locationStr:string)=>{
  return pattern === locationStr;
}

class App extends Component {
  render() {
    console.log(history.location)
    const route = R.find((pair)=>matchRoute(pair[1].path, history.location.pathname))(R.toPairs(routes));

    if(!route) {
      return <div>404</div>
    }

    console.log('routeMatch', route[0])

    const ComponentToRender = route[1].render

    return (
      <div>
        <ComponentToRender/>
      </div>
    );
  }
}

export default App;
