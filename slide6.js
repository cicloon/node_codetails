var app = require('./app'),
    url = require('url');

var _ = app.modules._;

var HomeController = function(){};

var processChannel = function(channel){
  console.log( 'procesando canal ' +  channel.id );
}


HomeController.prototype.index = function(req, res){
  app.redisClient.get('session-accessToken', function(err, token){
    var apiCallUrl = url.parse('https://slack.com/api/channels.list');

    app.modules.request( { json:true, url:  apiCallUrl, qs: { "token": token}},
      function(error, response, body){
        _.each(body['channels'], processChannel);
        console.log('canales procesados');
        res.send('canales procesados');
      }
    )
  })
};

var homeController = new HomeController();

app.get('/', homeController.index );
