const mongoose = require('mongoose')

const dbConnection = async() => {

    try {

        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
           /*  useCreateIndex:true,
            useFindAndModify:false */
        })

        console.log('Base de datos conectada')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar el proceso')        
    }

}


module.exports = {
    dbConnection
}