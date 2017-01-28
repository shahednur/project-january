//@flow

import Koa from 'koa';

// Koa application is now a class and requires the new operator.
const app = new Koa();

// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(async ctx => {
  // throw Error('error');
  // await instead of yield
  ctx.body = { result: 'lol' }; // ctx instead of this
});

console.log('Api listening 4000 ...');
app.listen(4000);
