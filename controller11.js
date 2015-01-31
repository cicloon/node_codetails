var url = require('url');

module.exports = function(app){
  var async = app.modules.async,
      Q     = app.modules.Q;

  var HomeController = function(){};

  var processChannel = function(channel, cb){
    process.nextTick( function(){
      console.log( 'procesando canal ' +  channel.id );
      cb();
    });
  };

  var doSomething = function(channels){
    async.each( channels, processChannel, function(err){
      console.log('canales procesados');
    });
  };

  var performRequest = function(token){
    var deferred = Q.defer();
    var apiCallUrl = url.parse('https://slack.com/api/channels.list');
    app.modules.request( { json:true, url:  apiCallUrl, qs: { "token": token}},
      function(error, response, body){
        deferred.resolve(body['channels']);
      }
    );
    return deferred.promise;
  };

  var getAccessToken = function(){
    var deferred = Q.defer();
    app.redisClient.get("session-accessToken", function(err, token){
      deferred.resolve(token);
    });
    return deferred.promise;
  };


  HomeController.prototype.index = function(req, res){

    getAccessToken()
    .then( function(token){
      return performRequest(token);
    })
    .then( function(channels){
      doSomething(channels)
    });

    res.send('procesando canales');
  };

  return new HomeController();
}
