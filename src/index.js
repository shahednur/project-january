//@flow
console.log('start');
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import history from './routes/history';
import * as Ship from 'redux-ship';
import { logControl } from 'redux-ship-logger';
import { createMessageAction } from './Root/middlewares/ws';

import { store, Controller, Effect } from './Root';

function dispatch(action: Controller.Action): void {
  Ship.run(Effect.run(store), store, logControl(Controller.control)(action));
}

// setTimeout(
//   () => {
//     store.dispatch(
//       createMessageAction('ws://ping')({ message: 'ping' })
//     );
//   },
//   5000
// );

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
