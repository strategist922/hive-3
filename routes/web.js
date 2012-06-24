var _ = require('underscore');

var routes = function(app, processManager) {
  app.get('/', function(req, res) {
	  var locals = { 
      snapshot: processManager.getProcessesSnapshot(),
      showlogo: app.enabled('showlogo'),
      _: _
    };

    res.render('index', { layout: false, locals: locals });
	});

	app.get('/snapshot', function(req, res) {
		res.json(processManager.getProcessesSnapshot());
	});
};

module.exports = routes;