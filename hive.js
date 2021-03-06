var express = require('express');
var app = module.exports = express.createServer();
var processManager = require('./lib/process-manager');

var existsSync = (process.versions.node.substr(0,3) >= 0.8) ? require('fs').existsSync : require('path').existsSync;

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register('.html', require('ejs'));
  app.use(require('./lib/ip-filter'));
  app.use(require('./lib/basic-auth'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure(function() {
  var logoPath = __dirname + '/public/img/logo.png';
  if (existsSync(logoPath)) app.enable('showlogo');
});

require('./routes/web')(app, processManager);
require('./routes/api')(app, processManager);

app.listen(process.env.PORT || 5000);
