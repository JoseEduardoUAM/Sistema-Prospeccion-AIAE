if( process.env.NODE_ENV === 'desarrollo' ){
    require('dotenv').config();
}

// Dependencias
const express = require('express');
const mysql = require('mysql');
const myConexion = require('express-myconnection');
const cookieParser = require('cookie-parser');
const path = require('path');

// Utilizando Dependencias
const app = express();

// Agregadondo variables al servidor ExpressJS
app.set( 'port' , process.env.PORT );
app.set( 'view engine' , 'ejs' );

// Agregadon Middleware al servidor ExpressJS
app.use( express.json() );
app.use( express.urlencoded({extended:true}) );
app.use( myConexion( mysql , require('./config').config , 'single' ) );
app.use( cookieParser() );
app.use( express.static( path.join( process.cwd() , 'public' ) ) );
app.use( '/' , require('./routers') );

// Se indica al servidor que escuche en el puerto app.get('port)
app.listen( app.get('port') , () => {
    console.log('Servidor corriendo en el puerto ' + app.get('port'));
})