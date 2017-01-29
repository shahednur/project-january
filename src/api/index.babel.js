//@flow

import Koa from 'koa';
import route from 'koa-route';
import Kefir from 'kefir';
import websockify from 'koa-websocket';

const app = websockify(new Koa());

app.ws.use(
  route.all('/', ({ websocket }) => {
    const send = json => websocket.send(JSON.stringify(json));
    const usualCIText = [
      'git clone repo xxx',
      'yarn/npm install',
      'build...',
      'deploy...',
      'run app'
    ];

    Kefir.sequentially(1000, usualCIText).observe({
      value(value) {
        send({ type: 'CI', value });
      },
      error(error) {
        send(error);
      },
      end() {
        send({ type: 'CI', value: 'end' });
      }
    });
    send({ type: 'SYSTEM', value: 'Hello World' });
    websocket.on('message', message => {
      console.log(message);
      send({ type: 'SYSTEM', value: message + '!' });
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

app.use(async ctx => {
  ctx.body = { result: 'lol' }; // ctx instead of this
});

console.log('Api listening 4000 ...');
app.listen(4000);
