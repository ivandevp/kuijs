const Kui = require('../../src/index');

const app = new Kui();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();

  console.log(`${ctx.req.method} ${ctx.req.url} ${start - end}ms`);
});

app.use(ctx => {
  ctx.body = 'Hola mundo';
});

app.listen(4567, () => console.log('Running on http://localhost:4567'));
