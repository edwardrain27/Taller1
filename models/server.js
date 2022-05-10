const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnect } = require('../database/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.path = {
            "demo":"/api/demo"
        }
        this.conectarDB();
        this.middlewares();
        this.routes();
        
    }

    middlewares(){
        this.app.use( express.json() );
        this.app.use( morgan('dev') );
        this.app.use( cors() );
        this.app.use(express.urlencoded({extended:false}));
    }

    routes(){
        this.app.use(this.path.demo, require('../routes/demo.routes'));
    }

    async conectarDB(){
        await dbConnect();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;