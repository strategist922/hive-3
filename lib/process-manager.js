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

  var deleteProcess = function(name) {
    _processes = _.reject(_processes, function(p) {
      return p.getName() === name;
    });
  };

  var getProcessesSnapshot = function() {
    var snapshot = {started: moment(started).from(moment()), processes: [] };

    _processes.forEach(function(process) {
      var logs = _.map(_.sortBy(process.getLogs(), 'date').reverse(), function(log) { 
        return { message: log.message, when: moment(log.date).from(moment()), systemWhen: log.date };
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

  var restoreProcessesFromSnapshot = function(incoming) {
      var incoming_count = incoming.length;
      for (var i=0; i < incoming_count; i++){
        var iProcess = incoming[i];

        // Create the process
        var process = getOrCreateProcess(iProcess.name);

        // Add any logs
        var logs_count = iProcess.logs.length;
        for (var j=0; j < logs_count; j++){
          process.addLog(iProcess.logs[j].message, iProcess.logs[j].systemWhen);
        }

        // And any stats
        var stats_count = iProcess.stats.length;
        for (var j=0; j < stats_count; j++){
          var value_count = iProcess.stats[j].values.length;
          for (var k=0; k < value_count; k++){
            process.setStat(iProcess.stats[j].name, iProcess.stats[j].values[k]);
          }
        }

    }
  };

  return {
    getOrCreateProcess: getOrCreateProcess,
    deleteProcess: deleteProcess,
    getProcessesSnapshot: getProcessesSnapshot,
    restoreProcessesFromSnapshot: restoreProcessesFromSnapshot
  };
};

module.exports = new ProcessManager;