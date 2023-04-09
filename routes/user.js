const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/dbValidator');


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

//Mostrar los usuarios
router.get('/', usuariosGet );


//Ruta para actualizar usuarios
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ), 
    validarCampos
], usuariosPut );


//Ruta para crear usuarios
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor a 6 letras').isLength({ min:6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ).isEmail(),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost );


//Ruta para borrar usuario
router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );


router.patch('/', usuariosPatch );





module.exports = router;