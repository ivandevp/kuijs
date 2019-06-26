const Kui = require('../../src/index');

const app = new Kui();

app.use(ctx => {
  ctx.body = 'Hola mundo';
});

app.listen(1234, () => console.log('Running on http://localhost:1234'));
