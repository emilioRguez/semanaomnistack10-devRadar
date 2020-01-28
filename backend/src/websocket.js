const socketio = require('socket.io');

exports.setupWebsocket = (server) => {
   const io = socketio(server);

   io.on('connection', socket => {  // cuando haya una conexion con un nuevo cliente
     console.log(socket.id);
   });
};