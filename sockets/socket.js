const { io } = require('../index');
const Band = require('../model/band');
const Bands = require('../model/bands');

const bands =  new Bands();

bands.addBand(new Band('Heroes del silencio'))
bands.addBand(new Band('Queen'))
bands.addBand(new Band('Bullet For My Valentine'))

console.log(bands);
// MENSAJES DE SOCKETS

io.on('connection', client => {
    console.log('CLIENTE CONECTADO');

    client.emit('active-bands', bands.getBands())

//   client.on('event', data => { /* … */ });
    client.on('disconnect', () => { console.log('CLIENTE DESCONECTADO'); });

    client.on('mensaje', (payload ) =>{
      console.log('mensaje!!', payload.nombre)

      io.emit('mensaje',{admin:'Nuevo Mensaje'})
    })

    client.on('emitir-mensaje', (payload ) =>{
      console.log('mensaje!!', payload)
      // io.emit('nuevo-mensaje',{admin:'Heyyyy!'})
      io.emit('nuevo-mensaje',payload,'broadcast') //EMITE A TODOS MENOS AL QUE LO EMITI[O]
    })

    client.on('vote-band', (payload ) =>{
      bands.voteBand(payload.idBand)
      io.emit('active-bands', bands.getBands())
    })

    
    client.on('new-band', (payload ) =>{
      const _newBand = new Band(payload.name)
      bands.addBand(_newBand)
      io.emit('active-bands', bands.getBands())
    })

    client.on('delete-band', (payload ) =>{
      bands.deleteBand(payload.idBand)
      io.emit('active-bands', bands.getBands())
    })

});


// ===================