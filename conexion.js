const mongoose= require('mongoose');


const conexion= async ()=>{

    try{
        await mongoose.connect("mongodb://localhost:27017/mi_blog_7a");
        console.log("Conexion exitosa a la base de datos")
    }catch(error){
        console.log(error)
        throw new Error("No se ha podido iniciar la conexion")
    }
}

module.exports={
    conexion
}

