// Controlador de la comunicacion por socket

const socketController = (socket) => {

    console.log('cliente conectado', socket.id);

    socket.on('disconnect', () =>{
        console.log('cliente desconectado', socket.id);
    })

    socket.on('enviar-mensaje', (payload, callback) =>{ // callback: funcion que venga en el cliente
        
        const id = 123456;
        callback({id, fecha: new Date().getTime()});

        socket.broadcast.emit('enviar-mensaje', payload);

    })

}

module.exports = {
    socketController
}