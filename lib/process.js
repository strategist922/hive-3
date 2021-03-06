var moment = require('moment');
var _ = require('underscore');

var Process = function(name, maxLogBacklog) {
  var _name = name;
  var _logs = [];
  var _stats = {};

  var getName = function() {
    return _name;
  };

  var addLog = function(message, timestamp) {
    _logs.push({ message: message, date: moment(timestamp).toDate() });
    
    if (_logs.length > (maxLogBacklog || 500)) _logs.shift();
  };

  var getLogs = function(max) {
    return _.last(_logs, max || 30);
  };

  var setStat = function(key, value) {
    if (!_stats[key]) _stats[key] = [];
    _stats[key].push(value);

    if (_stats[key].length > 10) _stats[key].shift();
  };

  var updateStat = function(key, by) {
    if (!_stats[key]) _stats[key] = [0];
    var lastValue = _.last(_stats[key]);

    if (typeof lastValue === 'number') {
      _stats[key].push(lastValue + by);
      if (_stats[key].length > 10) _stats[key].shift();
    }
  };

  var resetStats = function(key) {
    var keys = key.match(/\,/) ? key.split(',') : [key];
    _.each(keys, function(k) { _stats[k] = [0]; });
  };

  var incStat = function(key, by) {
    updateStat(key, by);
  };

  var decStat = function(key, by) {
    updateStat(key, -by);
  };

  var getStats = function() {
    return _stats;
  };

  var removeStat = function(key) {
    delete _stats[key];
  };

  return {
    getName: getName,
    addLog: addLog,
    getLogs: getLogs,
    setStat: setStat,
    incStat: incStat,
    decStat: decStat,
    getStats: getStats,
    resetStats: resetStats,
    removeStat: removeStat
  };
};

module.exports = Process;