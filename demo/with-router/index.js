const Kui = require('../../src/index');
const Router = require('./router');

const app = new Kui();
const router = new Router();

router.get('/home', ctx => {
  ctx.body = 'Hola desde home';
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();

  console.log(`${ctx.req.method} ${ctx.req.url} ${start - end}ms`);
});

app.use((ctx, next) => {
  ctx.body = 'Hola mundo';
  next();
});

app.use(router.routes());

app.listen(7890, () => console.log('Running on http://localhost:7890'));
