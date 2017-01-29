//@flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import history from './routes/history';
import * as Ship from 'redux-ship';
import { logControl } from 'redux-ship-logger';
import * as ShipDevTools from 'redux-ship-devtools';

import { store, Controller, Effect } from './Root';

console.log(process.env);

function dispatch(action: Controller.Action): void {
  Ship.run(
    Effect.run,
    store,
    ShipDevTools.inspect(logControl(Controller.control))(action)
  );
}

console.log(store.getState());

const render = () => {
  ReactDOM.render(
    <App
      location={history.location}
      dispatch={dispatch}
      state={store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
history.listen(render);

render();
