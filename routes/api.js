var _ = require('underscore');

var routes = function(app, processManager) {
  app.post('/log', function(req, res) {
    if (requiredParamsMissing(['name', 'message'], req, res)) return;
    
    var process = processManager.getOrCreateProcess(req.body.name);
    process.addLog(req.body.message);

    res.json({ status: true });
  });

  app.post('/set', function(req, res) {
    console.log('setting...');
    if (requiredParamsMissing(['name', 'key', 'value'], req, res)) return;

    console.log('oops...');

    var process = processManager.getOrCreateProcess(req.body.name);
    process.setStat(req.body.key, req.body.value);

    res.json({ status: true });
  });

  app.post('/inc', function(req, res) {
    if (requiredParamsMissing(['name', 'key'], req, res)) return;

    var process = processManager.getOrCreateProcess(req.body.name);
    process.incStat(req.body.key, req.body.by);

    res.json({ status: true });
  });

  app.post('/dec', function(req, res) {
    if (requiredParamsMissing(['name', 'key'], req, res)) return;

    var process = processManager.getOrCreateProcess(req.body.name);
    process.decStat(req.body.key, req.body.by);

    res.json({ status: true });
  });

  app.post('/reset', function(req, res) {
    if (requiredParamsMissing(['name', 'key'], req, res)) return;

    var process = processManager.getOrCreateProcess(req.body.name);
    process.resetStats(req.body.key);

    res.json({ status: true });
  });

  app.post('/remove', function(req, res) {
    if (requiredParamsMissing(['name', 'key'], req, res)) return;

    var process = processManager.getOrCreateProcess(req.body.name);
    process.removeStat(req.body.key);

    res.json({ status: true });
  });

  var requiredParamsMissing = function(keys, req, res) {
    var paramsMissing = false;

    _.each(keys, function(key) {
      if (req.body[key] === undefined) {
        res.json({ error: key + ' required' });
        paramsMissing = true;
      }
    });

    return paramsMissing;
  };
};

module.exports = routes;