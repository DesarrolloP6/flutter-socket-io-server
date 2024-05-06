const { io } = require('../index')
// MENSAJES DE SOCKETS

io.on('connection', client => {
    console.log('CLIENTE CONECTADO');
//   client.on('event', data => { /* … */ });
  client.on('disconnect', () => { console.log('CLIENTE DESCONECTADO'); });

  client.on('mensaje', (payload ) =>{
    console.log('mensaje!!', payload.nombre)

    io.emit('mensaje',{admin:'Nuevo Mensaje'})
  })

});


// ===================