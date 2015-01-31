var app = require('./app'),
    url = require('url');

var async = app.modules.async;

var HomeController = function(){};

var processChannel = function(channel, cb){
  process.nextTick( function(){
    console.log( 'procesando canal ' +  channel.id );
    cb();
  });
}

HomeController.prototype.index = function(req, res){
  app.redisClient.get('session-accessToken', function(err, token){
    var apiCallUrl = url.parse('https://slack.com/api/channels.list');

    app.modules.request( { json:true, url:  apiCallUrl, qs: { "token": token}},
      function(error, response, body){

        async.each( body['channels'], processChannel, function(err){
          console.log('canales procesados');
          res.send('canales procesados');
        });
        console.log('algo');
      }
    )
  })
};

var homeController = new HomeController();

app.get('/', homeController.index );
