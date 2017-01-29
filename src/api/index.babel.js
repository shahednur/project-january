//@flow

import Koa from 'koa';
import route from 'koa-route';
import Kefir from 'kefir';
import websockify from 'koa-websocket';
import { create } from './messages';

const app = websockify(new Koa());

app.ws.use(
  route.all('/', ({ websocket }) => {
    console.log('1');
    const send = json => websocket.send(JSON.stringify(json));
    const usualCIText = [
      'git clone repo xxx',
      'yarn/npm install',
      'build...',
      'deploy...',
      'run app'
    ];

    const createCIMessage = create('CI');
    const createSystemMessage = create('SYSTEM');

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

    send(createSystemMessage('Hello World'));
    websocket.on('message', message => {
      console.log(message);
      send(createSystemMessage(message + '!'));
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
