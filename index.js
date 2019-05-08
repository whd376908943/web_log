var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ssh = require('./ssh').ssh

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ssh', function(req,res){
  ssh().then(data=>{
    res.send(data.toString())
  }).catch(error=>{
    res.send(error.toString())
  })
})

io.on('connection', function (socket) {
  /*
  ssh().then(data=>{
    console.log(111)
    socket.emit("log",data.toString())
  }).catch(error=>{
    console.log(222)
    socket.emit("error",error.toString())
  });
  */
  console.log('client connected')
  socket.on('con', function (data) {
    setInterval(function(){
      ssh().then(data=>{
        console.log('logging')
        socket.emit("log",data.toString())
      }).catch(error=>{
        console.log('error')
        socket.emit("error",error.toString())
      });
    },1000);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
