var auth = require('../auth-allow');

var authfilter = function(req, res, next) {
	if (!auth.username){ return next(); }
	return require('express').basicAuth(auth.username, auth.password, 'Hive Login')(req,res,next);
};

module.exports = authfilter;