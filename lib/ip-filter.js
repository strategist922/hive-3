var _ = require('underscore');
var allowedIPs = require('../ip-allow');

var ipfilter = function(req, res, next) {
  var publicAccessAllowed = (allowedIPs.length === 1 && allowedIPs[0] === '*');

  var ipAllowed = _.any(allowedIPs, function(ip) {
    return ip === req.connection.remoteAddress;
  });

  return (publicAccessAllowed || ipAllowed) ? next() : res.send(403);
};

module.exports = ipfilter;