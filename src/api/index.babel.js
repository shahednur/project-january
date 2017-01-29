//@flow

import Koa from 'koa';
import route from 'koa-route';
import Kefir from 'kefir';
import websockify from 'koa-websocket';
import { create } from './messages';

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

app.use(async (ctx, next) => {
  console.log('0');
  try {
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(async ctx => {
  console.log('1');
  ctx.body = { result: 'lol' }; // ctx instead of this
});

try {
  app.listen(4000);
  console.log('Api listening 4000 ...');
} catch (ex) {
  console.log(ex);
}
