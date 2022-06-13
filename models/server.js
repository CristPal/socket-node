const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server{ // Clase del server con sus metodos
     
    constructor(){

        // Creacion del server
        this.app    = express(); // Llamado al express
        this.port   = process.env.PORT; // Usando puerto como variable en .env
        this.server = require('http').createServer(this.app); // Usando socket.io
        this.io     = require('socket.io')(this.server);

        this.paths = {}
    
        // Middlewares (Son funciones que añaden funcionalidades al webserver)
        // Son funciones que siempre se van a ejecutar cuando levantemos el server
        this.middlewares();     
        
        // Rutas de mi aplicacion
        this.routes();

        // Sockets 
        this.sockets();
    }

    middlewares(){
        // Middlewares
        // cors:
        this.app.use(cors());

        // Directorio publico:
        this.app.use(express.static('public'));

    }   

    routes(){
        // Nuestras rutas. Paths para llamar a los controladores
        // this.app.use(this.paths.auth, require('../routes/auth')); 
    }

    sockets(){
        // io: lo que ve el servidor
        // socket: lo que ve el cliente

        // Acciones en funcion a eventos
        this.io.on('connection', socketController );
        
    }

    listen(){
        // Listening del puerto
        this.server.listen(this.port, () =>{
            console.log('Server corriendo en puerto' , this.port);
        });
    }

}

module.exports = Server;