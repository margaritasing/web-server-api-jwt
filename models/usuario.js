const { Schema, model }  = require('mongoose');

const UsuariosSchema = Schema({
    nombre:{
        type:String,
        required:[true, "El nombre es obligado"]
    }, 
    correo:{
        type:String,
        required:[true, "El correo es obligado"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "La contraseña es obligatoria"]        
    },
    img:{
        type:String             
    },
    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE', 'USER_ROLE']             
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:true
    }
});


UsuariosSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario
}



module.exports = model( 'Usuario', UsuariosSchema );