// ESTE ES EL ARCHIVO QUE MANEJA LO QUE EL CLIENTE VE

// Referencias del html
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

const socket = io() // Para poder hacer cosas

// Listeners del socket on event y emit 
socket.on('connect', () => {
    // console.log('conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect', () => {
    // console.log('desconectado del servidor');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})

socket.on('enviar-mensaje', (payload) => {

    console.log(payload);

})

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('desde el server', id)
    }); // Reacciona al eveneto 'enviar-mensaje'

})







