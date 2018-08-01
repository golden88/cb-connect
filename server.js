const Koa = require('koa');
const app = new Koa();
const checkAuth = require('./lib/checkAuth');
const router = require('./router');

app.use(checkAuth);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
