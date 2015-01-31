var app = require('./app'),
    url = require('url');

var HomeController = function(){};

HomeController.prototype.index = function(req, res){
  app.redisClient.get('session-accessToken', function(err, token){
    var apiCallUrl = url.parse('https://slack.com/api/channels.list');

    app.modules.request( { json:true, url:  apiCallUrl, qs: { "token": token}},
      function(error, response, body){
        res.send(body['channels']);
      }
    )
  })
};

var homeController = new HomeController();

app.get('/', homeController.index );
