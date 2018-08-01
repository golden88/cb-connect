const fetch = require('node-fetch');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const secret = 'spacedog';
module.exports = async (ctx, next) => {
  if (!isGithubResponse(ctx)) {
    ctx.redirect(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&${encodeURIComponent(
        redirect_uri
      )}&state=${secret}`
    );
  } else {
    if (ctx.request.query.state !== secret) {
      ctx.throw('Unknown error');
    } else {
      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: {
          client_id,
          client_secret,
          code: ctx.request.query.code,
          state: secret
        }
      });
      const theresult = await res.json();
      console.log(theresult);
    }
  }
  await next();
};

const isGithubResponse = ctx =>
  ctx.request.query.code && ctx.request.query.state;
