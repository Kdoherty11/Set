
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.configure(function(){
  app.use(express.bodyParser());
});
app.use(express.methodOverride());
app.use(function (req, res, next) {
	res.set('X-Powered-By', 'Set  Game Server');
	next();
});
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/games', routes.games);
app.get('/games/:number', routes.getGame);
app.get('/games/:number/cards', routes.cards);

app.post('/games/add', routes.addGame);
app.post('/games/:number/addplayer', routes.addPlayer);
app.post('/games/:number/deal', routes.deal);
app.post('/games/:number/remove', routes.remove);
app.post('/games/:number/incrementscore', routes.incrementScore);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

