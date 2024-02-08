const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/js/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/js/main.js'));
});

app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css'));
});

app.get('/node_modules/socket.io/client-dist/socket.io.min.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules/socket.io/client-dist/socket.io.min.js'));
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});