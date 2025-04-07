//CONFIG DB
import { Sequelize } from "sequelize-typescript"
import dontenv from "dotenv"

dontenv.config(); //lee el archivo .env y carga las variables de entorno en process.env.

/*
-Nueva Intancia Sequelize: esta clase permite interactuar con una base de datosSQL

-ssl=true: La conexión a la DB debe realizarse a través de un canal seguro (SSL-Secure Sockets Layer)

-models[]: Busqueda de todos los achivos de modelos

-__dirname: Variable global de Node.js que representa la ruta al directorio actual (Backend/src/config)
*/
const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*']
});

export default db;

