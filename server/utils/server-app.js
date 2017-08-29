const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

io.sockets.on('connection', newConnection)

function newConnection(socket) {
  console.log('User ' + socket.id + ' connected')
  socket.emit('connectionId', socket.id)
}

module.exports = { app, server, express }
