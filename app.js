// ******************************************

var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, os = require('os')
, net = require('net');

var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('port', server_port);
app.set('ipaddress', server_ip_address);

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
app.post('/games/:id/remove', routes.remove);
app.post('/games/:id/removeall', routes.removeAll);

app.delete('/games/:id', routes.delete);

var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	console.log('connected to socket');
    socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
        console.log('some more code here');
});


server.listen(app.get('port'), app.get('ipaddress'), function(){
    console.log('Express server listening at ' + app.get('ipaddress') + ' on port ' + app.get('port'));
});
