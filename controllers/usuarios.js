const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



//Mostrar usuarios
const usuariosGet = async(req = request, res = response) => {  
    /* const { q, nombre = 'No name', apikey, page = 1, limit } = req.query; */

    const query = { estado:true }
    const {limite = 5, desde = 0  } = req.query;
    // const usuarios =  await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
       total,
       usuarios    
    });
}


//Crear usuario
const usuariosPost = async(req, res = response) => {

    /* const { nombre, edad } = req.body; */
   
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } )   

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    //Guardar en base de datos
    await usuario.save();

    res.json({       
        usuario       
    });
}


//Actualizar usuario

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, correo, ...resto  } = req.body;

    //TODO validar contra db

    if (password) {         
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({         
        usuario
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

//Borrar usuario
const usuariosDelete =async (req, res = response) => {

    const { id } = req.params;

    //Fisicamente borrado
   // const usuario = await Usuario.findByIdAndDelete( id )

   const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json({
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}