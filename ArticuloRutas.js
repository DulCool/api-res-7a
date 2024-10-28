const express = require('express');
const router = express.Router();

const AritculoControlador= require('../controllers/ArticuloControlador')

//Rutas para articulos
router.get('/ruta-de-prueba', AritculoControlador.prueba);
router.post('/crear', AritculoControlador.crear);
router.get('/listar-todos', AritculoControlador.listar);
router.get('/mostrar/:id', AritculoControlador.mostrarUno);
router.delete('/eliminar/:id', AritculoControlador.eliminar);

module.exports = router;