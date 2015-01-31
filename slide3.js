var app = require('./app'),
    url = require('url');

app.get('/', function(req, res){
  app.redisClient.get('session-accessToken', function(err, token){

    var apiCallUrl = url.parse('https://slack.com/api/channels.list');

    app.modules.request( { json:true, url:  apiCallUrl, qs: { "token": token}},
      function(error, response, body){
        console.log(body);
        res.send(body['channels']);
      }
    )

  })
});
