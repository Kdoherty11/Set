
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function (req, res, next) {
	res.set('X-Powered-By', 'Set Game Server');
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
app.post('/games/:number/remove', routes.removeCards);
app.post('/games/:number/replace', routes.replaceCards);
app.post('/games/:number/incrementscore', routes.incrementScore);

app.delete('/games/:number', routes.delete);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = http.createServer(app);
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});

