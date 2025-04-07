//GESTIÓN DATA
import { exit } from 'node:process'
import db from '../config/db'
import colors from 'colors';

/*
Sequelize
{force: true} en sync(): Borra TODAS las tablas y las vuelve a crear.
Se usa cuando necesitas limpiar la base de datos en desarrollo o pruebas.

Node
exit(): Son atajos para process.exit(0) y process.exit(1), que terminan la ejecución del script.
-exit(0) Sale del proceso de forma exitosa.
-exit(1) Sale del proceso con error.

process.argv[]: Es un array que contiene los argumentos pasados en la línea de comandos 
al ejecutar el script.
-process.argv[2] obtiene el tercer argumento en la ejecución del script.
-Si ese argumento es "--clear", ejecuta clearDB() y borra la base de datos.
Ej. 'typeNode /ruta --clear'

pretest/posttest
Estos scripts son parte del sistema de hooks de npm.
-npm run test
1️⃣ Ejecuta pretest → "Ejecutando antes de las pruebas...".
2️⃣ Ejecuta test → Corre jest --detectOpenHandles.
3️⃣ Ejecuta posttest → "Pruebas finalizadas".

*/
const clearDB = async () => {
    try {
        await db.sync({force: true});
        console.log(colors.yellow.bold('Datos Eliminados'));
        exit(0);
    } catch (error) {
        console.error(colors.bgRed.bold(`Hubo un Error: '${error}'`));
        exit(1);
    }
}

if(process.argv[2] === '--clear' ) {
    clearDB();
}

