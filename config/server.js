require('dotenv').config();


const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
//const contactos = require('../routes/contactos');
//const upload = require('../routes/upload');

const db = require('../db');

class Server{
    constructor(){
        this.app = express();
        //this.path = __dirname + '/views/';
        this.port = process.env.PORT || '8080';
       
        this.setTemplateEngine()
       
        this.middlewares()
       
        this.routes()

    }

    setTemplateEngine(){      
        this.app.set('view engine','html');
        this.app.engine('html', require('ejs').renderFile);
        /*this.app.engine('hbs',exphbs.engine({
            extname:'hbs',
            defaultLayout:'',
            layoutsDir:''
        }));*/
    }


    middlewares(){
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
        this.app.use(express.json())
        this.app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        debug: true
        }))
    }


    routes(){
        this.app.use('/contactos',require('../routes/contactos'))
        //this.app.use('/upload',require('../routes/upload'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Listening on port',this.port)
          })
    }

}

module.exports = Server





