const validator = require('validator');
const Articulo = require('../models/Articulo')

const prueba = (req, res)=>{

    return res.status(200).json({
        mensaje: "Hola desde la ruta de prueba"
    });
};

/**Funcion para crear un articulo en la base de datos */
const crear = async (req, res)=>{
    ///Recoger los parametros por POST
    let parametros = req.body;
    
    ///validaciones
    if(!parametros || !parametros.titulo || !parametros.contenido){
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos obligatorios'
        });
    }

    try{
        let validar_titulo = !validator.isEmpty(parametros.titulo);
        let validar_contenido =!validator.isEmpty(parametros.contenido);

        if(!validar_titulo ||!validar_contenido){
            throw new Error("La validacion de los datos ha fallado");
        }

    }catch(error){
        return res.status(400).json({
            status: 'error',
            mensaje: 'Error al crear el articulo'
        });
    }

    try{
        //Creacion de datos a guardar
        const aritculo= new Articulo(parametros);

        //Guardar los registros en la base de datos
        const articuloGuardado = await aritculo.save();

        //Devolver el articulo creado
        return res.status(200).json({
            status:'success',
            mensaje: 'Articulo creado correctamente',
            articulo: articuloGuardado
        });

    }catch(error){
        return res.status(500).json({
            status: 'error',
            mensaje: 'No se a podido guardar el articulo',
            error: error.message
        });
    }
};

//Funcion para obtener todos los articulos de la base de datos/

const listar = async(req, res) => {
    try{
        //Obtener todos los articulos
        const articulos = await Articulo.find();
        
        //Devolver los resultados
        return res.status(200).json({
            status:'success',
            mensaje: 'Articulos obtenidos correctamente',
            articulos: articulos
        });
    }catch(error){
        return res.status(500).json({
            status: 'error',
            mensaje: 'No se ha podido obtener los articulos',
            error: error.message
        });
    }
};

const mostrarUno = async (req,res)=>{
    try{
        //recoger el ID por URL
        let id = req.params.id
        //Buscar el articulo por ID
        const articulo = await Articulo.findById(id);


        //si es que no encuentra el articulo
        if(!articulo){
            return res.status(404).json({
                status: 'error',
                mensaje: "El articulo no existe"
            })
        };


        //si es que si encuentra el articulo
        return res.status(200).json({
            status: 'ok',
            mensaje: "Articulo encontrado",
            articulo: articulo
        });



    }catch(error){
        console.log("Error al buscar el articulo")
        return res.status(500).json({
            status: 'error',
            mensaje: "Hubo un error al buscar el articulo"
        })
    }
};


const eliminar = async (req, res)=>{
    try{
        let articulo_id = req.params.id;

        //buscar y borrar el articulo por ID
        const articulo = await Articulo.findByIdAndDelete(articulo_id);

    //si no se encuentra el articulo
    if(!articulo){
        return res.status(404).json({
            status: 'error',
            mensaje: "El articulo no existe"
        })
    };

    //si se encuentra y se borra el articulo correctamente
    return res.status(200).json({
        status: 'ok',
        mensaje: "Articulo eliminado correctamente"
        });


    }catch (error){
        console.log("Error al eliminar el articulo" + error)
        return res.status(500).json({
            status: 'error',
            mensaje: "Hubo un error al eliminar el articulo"
    })
    
    }
    
}


module.exports = {
    prueba,
    crear,
    listar, 
    mostrarUno,
    eliminar
};
