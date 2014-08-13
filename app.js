var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , socketio = require('socket.io')
  , path = require('path');
 
var app = express();


app.set('port', process.env.OPENSHIFT_NODEJS_PORT  || 3000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
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

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
var server = app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
var io = socketio.listen(server);

var clients = {};
 
var socketsOfClients = {};

io.sockets.on('connection', function(socket) {
  socket.on('set username', function(userName) {
    // Is this an existing user name?
    if (clients[userName] === undefined) {
      // Does not exist ... so, proceed
      clients[userName] = socket.id;
      socketsOfClients[socket.id] = userName;
      userNameAvailable(socket.id, userName);
      userJoined(userName);
    } else
    if (clients[userName] === socket.id) {
      // Ignore for now
    } else {
      userNameAlreadyInUse(socket.id, userName);
    }
  });
  socket.on('message', function(msg) {
    var srcUser;
    if (msg.inferSrcUser) {
      // Infer user name based on the socket id
      srcUser = socketsOfClients[socket.id];
    } else {
      srcUser = msg.source;
    }
 
    if (msg.target == "All") {
      // broadcast
      io.sockets.emit('message',
          {"source": srcUser,
           "message": msg.message,
           "target": msg.target});
    } else {
      // Look up the socket id
      io.sockets.sockets[clients[msg.target]].emit('message',
          {"source": srcUser,
           "message": msg.message,
           "target": msg.target});
    }
  });
  socket.on('disconnect', function() {
    var uName = socketsOfClients[socket.id];
    delete socketsOfClients[socket.id];
    delete clients[uName];
 
    // relay this message to all the clients
 
    userLeft(uName);
  })
});
 
function userJoined(uName) {
    Object.keys(socketsOfClients).forEach(function(sId) {
      io.sockets.sockets[sId].emit('userJoined', { "userName": uName });
    })
};
 
function userLeft(uName) {
    io.sockets.emit('userLeft', { "userName": uName });
};
 
function userNameAvailable(sId, uName) {
  setTimeout(function() {
 
    console.log('Sending welcome msg to ' + uName + ' at ' + sId);
    io.sockets.sockets[sId].emit('welcome', { "userName" : uName, "currentUsers": JSON.stringify(Object.keys(clients)) });
 
  }, 500);
};
 
function userNameAlreadyInUse(sId, uName) {
  setTimeout(function() {
    io.sockets.sockets[sId].emit('error', { "userNameInUse" : true });
  }, 500);
};

