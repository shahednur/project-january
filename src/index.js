//@flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import history from './routes/history';
import * as Ship from './redux-ship';
import { logControl } from 'redux-ship-logger';
import { createMessageAction } from './Root/middlewares/ws';

import { store, Controller, Effect } from './Root';

console.log(process.env);

const effectRun = Effect.run(store);

function dispatch(action: Controller.Action): void {
  Ship.run(effectRun, store, logControl(Controller.control)(action));
}

setTimeout(
  () => {
    const t = store.dispatch(
      createMessageAction('ws://localhost:3000/ping')({ message: 'ping' })
    );
  },
  1000
);

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
