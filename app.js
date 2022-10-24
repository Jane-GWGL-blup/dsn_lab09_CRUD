const Server = require('./config/server');

const app = new Server();

app.listen();
/*require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const contactos = require('./routes/contactos');
const upload = require('./routes/upload');
const db = require('./db');


const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const port = process.env.PORT || 8080;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: true
}))
app.use('/contactos', contactos);
app.use('/upload', upload)

app.listen(port, function () {
  console.log(`Example app listening on ${port}!`)
})*/