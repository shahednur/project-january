//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import history from './routes/history';

const render = () => {
  ReactDOM.render(
    <App location={history.location} />,
    document.getElementById('root'),
  );
};

history.listen(render);

render();
