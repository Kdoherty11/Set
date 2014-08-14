var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, os = require('os')
, net = require('net');

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

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = http.createServer(app);
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});

var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({
	server: server,
	autoAcceptConnections:false
});
wss.on('connection', function(ws) {
  console.log("New connection");
  ws.on('message', function(message) {
    ws.send("Received: " + message);
  });
  ws.send('Welcome!');
});

console.log("Listening to " + server_ip_address + ":" + server_port + "...");
// var networkInterfaces=os.networkInterfaces();

// var port = 8081;
// var count = 1;

// function callback_server_connection(socket){
//     var remoteAddress = socket.remoteAddress;
//     var remotePort = socket.remotePort;
//     socket.setNoDelay(true);
//     console.log("connected: ", remoteAddress, " : ", remotePort);
    
//     var msg = 'Hello ' + remoteAddress + ' : ' +  remotePort + '\r\n'
//         + "You are #" + count + '\r\n';
//     count++;

//     socket.end(msg);
    
//     socket.on('data', function (data) {
//         console.log(data.toString());
//     });
    
//     socket.on('end', function () {
//         console.log("ended: ", remoteAddress, " : ", remotePort);
//     });
// }

// console.log("node.js net server is waiting:");
// for (var interface in networkInterfaces) {

//     networkInterfaces[interface].forEach(function(details){
        
//         if ((details.family=='IPv4') && !details.internal) {
//             console.log(interface, details.address);  
//         }
//     });
// }

// console.log("port: ", port);

// var netServer = net.createServer(callback_server_connection);
// netServer.listen(port);