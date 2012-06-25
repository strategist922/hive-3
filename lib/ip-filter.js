var _ = require('underscore');
var allowedIPs = require('../ip-allow');

var ipfilter = function(req, res, next) {
  var ipAllowed = _.any(allowedIPs, function(ip) {
    return ip === req.connection.remoteAddress;
  });

  return (ipAllowed) ? next() : res.send(403);
};

module.exports = ipfilter;