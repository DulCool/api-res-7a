const conexion = require('./database/conexion');
const express = require('express');
const cors= require('cors');

///Inicializar App
console.log("aplicacion arrancada.....!!");

//conectar a la base de datos
conexion.conexion()

//crear servidor de express
const app= express();
const puerto= 3900;

//configurar cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends:true}));

//Rutas
const rutas_articulo= require('./routes/ArticuloRutas');

//Usar las rutas
app.use("/api", rutas_articulo);

//Arrancar el servidor y ecuchar las peticiones
app.listen(puerto, ()=>{
    console.log("Servidor corriendo en el puerto: " + puerto);
});