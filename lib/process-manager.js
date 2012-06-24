var moment = require('moment');
var _ = require('underscore');
var Process = require('./process');

var ProcessManager = function() {
  var started = moment();
  var _processes = [];

  var getOrCreateProcess = function(name) {
    var process = _.find(_processes, function(p) {
      return p.getName() === name;
    });

    if (!process) {
      process = new Process(name);
      _processes.push(process);
    }

    return process;
  };

  var getProcessesSnapshot = function() {
    var snapshot = {started: moment(started).from(moment()), processes: [] };

    _processes.forEach(function(process) {
      var logs = _.map(_.sortBy(process.getLogs(), 'date').reverse(), function(log) { 
        return { message: log.message, when: moment(log.date).from(moment()) };
      });

      var processStats = process.getStats();
      var stats = [];

      for (var key in processStats) {
        stats.push({ 
          name: key, 
          values: processStats[key], 
          last_value: _.last(processStats[key]),
          numeric_values: _.all(processStats[key], function(item) { return typeof item === 'number' })
        });
      }

      snapshot.processes.push({
        name: process.getName(),
        logs: logs,
        stats: stats
      });
    });

    return snapshot;
  };

  return {
    getOrCreateProcess: getOrCreateProcess,
    getProcessesSnapshot: getProcessesSnapshot
  };
};

module.exports = new ProcessManager;