const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';   
        
        //conectar a base de datos
        this.conectarDb()

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }
  

      async conectarDb() {
        await dbConnection();
      }

    middlewares() {

        // CORS
         this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;