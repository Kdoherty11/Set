var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path');

var app = express();

var server_port = process.env.PORT || 5000;

app.set('port', server_port);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function (req, res, next) {
	res.set('X-Powered-By', 'Set Game Server');
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/games', routes.games);
app.get('/games/:id', routes.getGame);
app.get('/games/:id/cards', routes.cards);
app.get('/games/:id/findset', routes.findSet);

app.post('/games', routes.addGame);
app.post('/games/:id/addplayer', routes.addPlayer);
app.post('/games/:id/deal', routes.deal);
app.post('/games/:id/receiveset', routes.handleSet);
app.post('/games/:id/incrementscore', routes.incrementScore);

app.delete('/games/:id', routes.delete);

var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
	console.log('connected to socket');
    socket.emit('news', { hello: 'world' });
    // have update take in gameId as data
    // and return the game corresponding to the id
    // instead of making them send a post for it
    socket.on('update', function (data) {
        socket.emit('update');
        console.log('***** update *******');
        console.log(data);
    });
        console.log('some more code here');
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

