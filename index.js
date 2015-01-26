var koa    = require('koa');
var app    = koa();
var router = require('koa-router');
var mount  = require('koa-mount');
var api    = require('./api/api');


var APIv1 = new router();
APIv1.get('/all', api.all)
APIv1.get('/single', api.single);

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.type = 'json';
    this.status = err.status || 500;
    this.body = { 'error': 'The application just blew up...' };
    this.app.emit('error', err, this);
  }
});

app.use(mount('/v1', APIv1.middleware()));

if (!module.parent) app.listen(3000);
console.log('Application is running on port: 3000');
