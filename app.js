var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    request = require('request'),
    mongoose = require('mongoose'),
    _ = underscore = require('underscore'),
    async = require('async'),
    config = require('./config'),
    q = require('q'),
    qx = require('qx');


var app = express();

app.serverPath = serverPath;

app.config = config();

app.modules = {};
app.modules._ = underscore;
app.modules.async = async;
app.modules.Q = q;
app.modules.request = request;

var serverPath = function(route){
  return path.join(__dirname, 'server', route);
}

app.models = require( serverPath( path.join('models', 'index') ) )(app);

app.redisClient = require( serverPath( 'redisClient' ))(app);

var server = app.listen(app.config.port, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = app;
