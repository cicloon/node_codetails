var app = require('./app');

app.redisClient.set('somekey', 'somevalue');

app.get('/', function(req, res){
  app.redisClient.get('somekey', function(err, someKeyValue){
    res.send( someKeyValue );
  })
});
