//@flow

import Koa from 'koa';
import route from 'koa-route';
import Kefir from 'kefir';
import websockify from 'koa-websocket';
import { create } from './messages';
import getStats from './stats';

const app = websockify(new Koa());

const sendFct = websocket => json => {
  try {
    websocket.send(JSON.stringify(json));
  } catch (ex) {
    console.log(ex);
  }
};

app.ws.use(
  route.all('/commit', ({ websocket }) => {
    const send = sendFct(websocket);
    const usualCIText = [
      'git clone repo xxx',
      'yarn/npm install',
      'build...',
      'deploy...',
      'run app'
    ];

    const createCIMessage = create('CI');

    Kefir.sequentially(1000, usualCIText).observe({
      value(value) {
        send(createCIMessage(value));
      },
      error(error) {
        send(error);
      },
      end() {
        send(createCIMessage('end'));
      }
    });
  })
);

app.ws.use(
  route.all('/ping', ({ websocket }) => {
    const send = sendFct(websocket);
    websocket.on('message', message => {
      const createSystemMessage = create('SYSTEM');
      console.log(message);
      send(createSystemMessage(message));
    });
  })
);

app.ws.use(
  route.all('/stats', ({ websocket }) => {
    const send = sendFct(websocket);
    const createStatsMessage = create('STATS');

    const run = () => {
      send(createStatsMessage(getStats()));
    };

    run();

    const interval = setInterval(run, 5000);
    websocket.on('close', message => {
      clearInterval(interval);
      console.log('close stats');
    });
  })
);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

try {
  app.listen(4000);
  console.log('Api listening 4000 ...');
} catch (ex) {
  console.log(ex);
}
