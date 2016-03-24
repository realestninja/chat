var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
  client.on('join', function(name) {
    client.nickname = name;
    console.log(client.nickname + ' connected...');
  });
  /*
  client.emit('messages', "hi");
  */

  client.on('messages', function(data) {
    var nickname = client.nickname;
    var messageString = nickname + ": " + data;
    console.log(messageString);
    client.broadcast.emit('messages', messageString);
    client.emit('messages', messageString);
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

server.listen(8080);