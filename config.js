dotenv = require('dotenv'),
_      = require('underscore');
dotenv.load();

module.exports = function(){
    var config = function(env){
      switch(env){
          case 'development':
              return {
              };

          default:
              console.log("default environment set");
              return {
                port: 3001,
                redis : {port: 6379, host: "127.0.0.1", options: {}},
                mongodb: {url: 'mongodb://localhost/rr_bot'},
                slack_api: {
                  client_id: process.env.SLACK_CLIENT_ID,
                  secret: process.env.SLACK_SECRET
                }
              };
      }
    }

    var env = process.env.NODE_ENV || 'development'
    var base_conf = {env: env}
    var conf = _.extend(_.extend(base_conf, config(null)), config(env))
    console.log(conf)
    return conf;
};
