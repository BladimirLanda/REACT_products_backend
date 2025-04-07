//SERVER
import express from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import SwaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

//Instancia del servidor Express
const server = express(); 

//Interprectación y manejo de cuerpos de solicitudes (req.body) en formato JSON.
server.use(express.json());

/*
CORS
-CorsOptions: Definiendo un objeto que cumple con el tipo CorsOptions

-origin: Opción que define el dominio desde donde viene la petición
-callBack(error, autorización): Es una función que permite o bloquea la solicitud

-cors(opciones): Uso del middleware cors
*/
const corsOptions : CorsOptions = {
    origin: function(origin, callBack) {
        if(origin === process.env.FRONTEND_URL) {
            callBack(null, true);
        } else {
            callBack(new Error('Origen no permitido por CORS'));
        }
    }
}
server.use(cors(corsOptions));

//--Conexión DB
async function connectDB() {
    try {
        await db.authenticate(); //Verifica la autenticación de la base de datos
        db.sync(); //Sincroniza los modelos de Sequelize con la base de datos (si no existen, los crea-Ej. tablas)
        console.log(colors.bgGreen.bold('Conexión Establecida con la DB'));
        console.log(colors.bgBlue.bold(`Modelos Cargados [${Object.keys(db.models)}]`)); //Módelos Registrados
    } catch (error) {
        console.log(colors.bgRed.bold('Hubo un Error de Conexión'));
    }
}
connectDB();

/*
MORGAN
-morgan('formato predefinido')
Ejemplo ('dev'): GET / 200 5.123 ms - 12
    -GET es el método,
    -/ la ruta,
    -200 el status code,
    -5.123 ms el tiempo de respuesta,
    -12 es el tamaño de la respuesta.

-Formatos disponibles
    -'dev': muy útil en desarrollo (el más usado).
    -'combined': como los logs de Apache, ideal para producción.
    -'common': versión simplificada de combined.
    -'short': resumen rápido.
    -'tiny': aún más corto.

Por defecto, Morgan envía los logs directamente a la consola 
usando console.log() internamente.
*/
server.use(morgan('dev'));

//--Router
server.use('/api/products', router); //Enrutador Base

//--Router-Testing
server.get('/api', (req, res) => {
    res.json({
        msg: 'Probando API', 
        success: true
    })
});

/*
Documentación.
-Define que la documentación estará disponible en la ruta /docs (interfaz de Swagger UI).
-swaggerUi.serve: Middleware que sirve los archivos estáticos de Swagger UI.
Es necesario para que Express cargue la interfaz visual de Swagger, creación del cliente.
-swaggerUi.setup(swaggerSpec): swaggerSpec es la configuración generada con swagger-jsdoc.
Carga y muestra la documentación de la API en la interfaz de Swagger UI.
*/
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions));


export default server;
export {
    connectDB
}
