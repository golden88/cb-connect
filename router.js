const Router = require('koa-router');
const router = new Router();

router
  .get('/', async (ctx, next) => {
    ctx.body = 'Hello World';
  })
  .get('/callback', async (ctx, next) => {
    console.log(ctx.request.query);
    ctx.body = 'Hello cb';
  })
  .get('/login', async (ctx, next) => {
    ctx.body = 'Hello login';
  });

module.exports = router;
