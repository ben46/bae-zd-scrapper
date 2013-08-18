var express = require('express')
, routes = require('./routes')
, http = require('http')

, app = express()

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});











