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

  var restoreProcessesFromSnapshot = function(snapshot) {
    var processes = (snapshot instanceof Array) ? snapshot : snapshot.processes;
    
    if (!processes) return;

    _.each(processes, function(p) {
      var process = getOrCreateProcess(p.name);

      _.each(p.logs, function(log) {
        process.addLog(log.message, log.systemWhen);
      });

      _.each(p.stats, function(stat) {
        _.each(stat.values, function(value) {
          process.setStat(stat.name, value);
        });
      });
    });
  };

  return {
    getOrCreateProcess: getOrCreateProcess,
    deleteProcess: deleteProcess,
    getProcessesSnapshot: getProcessesSnapshot,
    restoreProcessesFromSnapshot: restoreProcessesFromSnapshot
  };
};

module.exports = new ProcessManager;