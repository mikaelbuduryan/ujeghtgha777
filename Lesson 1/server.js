var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs')

app.use(express.static("."));
fs.writeFileSync('data.json','')
app.get('/', function (req,res){
    res.redirect('index.html');
});

io.on('connection',(socket) => {
    socket.on('send data', (data) => {
        console.log(data);
        fs.appendFileSync('data.json', JSON.stringify(data) + endl);
        io.sockets.emit('show data', data)
    })
})

server.listen(3000);