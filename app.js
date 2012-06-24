var path = require('path');
var express = require('express');
var app = module.exports = express.createServer();
var processManager = require('./lib/process-manager');

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register(".html", require('ejs'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure(function() {
  var logoPath = __dirname + "/public/img/logo.png";
  if (path.existsSync(logoPath)) app.enable('showlogo');
});

require('./routes/web')(app, processManager);
require('./routes/api')(app, processManager);

app.listen(process.argv[2] || 5000);