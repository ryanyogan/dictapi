var koa = require('koa');
var app = koa();

app.use(function *(next) {
  this.type = 'json';
  this.status = 200;
  this.body = {'Welcome': 'This is a not express :)'};
});

if (!module.parent) app.listen(3000);
console.log('Application is running on port: 3000');
