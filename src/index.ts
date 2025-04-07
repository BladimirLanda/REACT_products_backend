//INDEX
/*
Dependencias:
npm i -D typescript ts-node 

1) typescript: Es el compilador de TypeScript.
Convierte el código TypeScript (.ts y .tsx) en JavaScript (.js).
Es necesario para trabajar con TypeScript en un proyecto.
(npx tsc). Requiere archivo de configuración tsconfig.json

📌 compilerOptions: {}
1️⃣ outDir: "./dist"`
Especifica la carpeta de salida para los archivos compilados en JavaScript.
En este caso, TypeScript guardará los archivos .js en la carpeta dist/.

2️⃣ rootDir: "./src"`
Define la carpeta raíz del código fuente.
Solo los archivos dentro de src/ serán compilados.

3️⃣ lib: ["ESNext"]
Indica qué características de JavaScript estarán disponibles.
"ESNext" habilita las últimas versiones de ECMAScript (por ejemplo, async/await, Promise, etc.).

4️⃣ strict: false
Desactiva todas las verificaciones estrictas de TypeScript.
Si fuera true, habilitaría reglas como strictNullChecks, noImplicitAny, etc.

5️⃣ sourceMap: true
Genera mapas de fuente (.map) para depuración.
Permite que las herramientas como Chrome DevTools muestren TypeScript en lugar 
del código JavaScript transpilado.

6️⃣ esModuleInterop: true
Habilita la interoperabilidad entre módulos CommonJS y ESModules.
Permite importar módulos de Node.js (require) usando import.

7️⃣ declaration: true
Genera archivos .d.ts con definiciones de tipos.
Útil si vas a publicar una librería en TypeScript.

8️⃣ removeComments: true 
Elimina todos los comentarios en el código de salida compilado. 
Los comentarios se descartan completamente y no aparecerán en los archivos JavaScript generados.

9️⃣ experimentalDecorators: true
Habilita el uso de decoradores en TypeScript.

🔟 emitDecoratorMetadata": true
Permite que TypeScript genere metadatos de tipo para los decoradores, lo cual es clave para que 
Sequelize pueda inferir los tipos de datos correctamente.

1️⃣1️⃣ target: "ESNext"
La opción target controla la versión de JavaScript a la que TypeScript compilará tu código.
Con "ESNext", le estás diciendo a TypeScript que compile tu código a la versión más reciente 
de ECMAScript disponible.

1️⃣2️⃣ moduleResolution: "Nodenext"
La opción moduleResolution le dice a TypeScript cómo resolver los módulos al importar archivos.
Con "Nodenext", se le dice a TypeScript que use el mismo algoritmo de resolución de 
módulos que Node.js con soporte de módulos ES (import/export).

1️⃣3️⃣ module: "NodeNext"
La opción module controla cómo TypeScript genera los módulos cuando compila el código.
"NodeNext" le dice a TypeScript que compile los módulos usando el formato ECMAScript Modules (ESM) 
de Node.js, que es lo más moderno y estándar.

📌 include: []
Define qué archivos deben ser compilados.
En este caso significa todos los archivos .ts dentro de src/ y sus subcarpetas.

📌 exclude: []
Define qué archivos no deben ser compilados.

2) ts-node:  Permite ejecutar archivos TypeScript directamente en Node.js, sin necesidad 
de compilarlos previamente.
Es útil para scripts, pruebas rápidas o entornos de desarrollo donde no quieres compilar 
manualmente el código.
Se usa comúnmente junto con nodemon para recargar automáticamente los cambios.
(npx ts-node src/index.ts)

npm i -D nodemon

1) nodemon: Es una herramienta que reinicia automáticamente la aplicación cuando 
detecta cambios en los archivos.
Muy útil en entornos de desarrollo para no tener que ejecutar manualmente 'node app.js '
cada vez que se cambia algo.
Funciona con JavaScript y TypeScript (junto con ts-node).
*"dev": "nodemon --exec ts-node src/index.ts" -> npm run dev

npm i express

1) express: Framework minimalista para construir servidores y APIs en Node.js.
Maneja rutas (GET, POST, PUT, DELETE...) fácilmente.
Permite trabajar con middlewares para modificar solicitudes/respuestas.
Facilita el manejo de JSON, archivos estáticos y sesiones.
Compatible con WebSockets, autenticación, bases de datos, etc.

npm i -D @types/express

1) @types/express: Esto proporciona autocompletado y validación de tipos para el código TypeScript.
En este caso utilizamos la versión @4.17.20 compatible con express-validator.

npm i dotenv

1) dotenv: Permite cargar variables de entorno desde un archivo .env en Node.js.
En la raíz del proyecto, crea un archivo .env con las variables de entorno

npm i colors

1) colors: Es una biblioteca de Node.js que te permite dar formato y color a 
la salida en la terminal. Es útil cuando quieres mejorar la visualización de logs, 
mensajes de error, o cualquier texto que se muestre en la consola.

npm i express-validator

1) express-validator: Es una librería de validación para Express.js, basada en validator.js, 
que permite validar y sanitizar datos de las solicitudes (req.body, req.params, req.query).
*/

/*
ORM NodeJs
Un ORM (Object-Relational Mapping, Mapeo Objeto-Relacional) es una herramienta que permite 
interactuar con bases de datos usando objetos y métodos en lugar de SQL puro.
-Traduce código en objetos a consultas SQL automáticamente.
-Facilita la manipulación de datos sin escribir SQL manualmente.
-Abstrae la estructura de la base de datos, permitiendo cambiar de motor fácilmente 
(MySQL, PostgreSQL, etc.).

En Node.js, los ORMs más populares son:
🔹 Sequelize (https://sequelize.org/docs/v6/getting-started/)
Soporta PostgreSQL, MySQL, SQLite y MSSQL.
Usa modelos para definir estructuras de tablas.

🔹 Prisma
ORM moderno y rápido.
Tiene autocompletado de tipos en TypeScript.
Usa un archivo schema.prisma para definir modelos.

🔹 TypeORM
ORM basado en decoradores y clases en TypeScript.
Compatible con MySQL, PostgreSQL, SQLite, MongoDB, etc.

🔹 Mongoose
Mongoose es un ODM (Object-Document Mapping), similar 
a un ORM pero diseñado para MongoDB, que es una base de 
datos NoSQL basada en documentos.

✔ Si quieres flexibilidad y compatibilidad con muchas bases de datos: Sequelize.
✔ Si buscas rendimiento y facilidad con TypeScript: Prisma.
✔ Si prefieres trabajar con decoradores y clases: TypeORM.
✔ Si trabajs exclusivamente con MongoDB (NoSQL): Mongoose

npm i --save sequelize
npm i sequelize-typescript
npm i --save pg pg-hstore

--Render
https://dashboard.render.com/project/prj-cvgq5atds78s73dq9ou0

--DBEaver
DBeaver es una herramienta de código abierto y multiplataforma para la administración 
de bases de datos. Está diseñada para interactuar con diferentes motores de bases de datos, 
tanto relacionales como NoSQL, y proporciona una interfaz gráfica para realizar operaciones 
de gestión, desarrollo y administración de bases de datos.

1) Compatibilidad con múltiples bases de datos:
Soporta una amplia variedad de bases de datos, como:
Relacionales: MySQL, PostgreSQL, SQLite, Oracle, SQL Server, etc.
NoSQL: MongoDB, Cassandra, Redis, etc.
Bases de datos en la nube: Amazon RDS, Google Cloud SQL, Azure SQL, etc.
2) Interfaz gráfica de usuario (GUI).
3) Editor SQL.
4) Gestión de esquemas y datos.
5) Exportación e importación de datos.
6) Soporte para múltiples conexiones.
7) Extensiones y personalización.

||Conexión
Nueva conexión: Host, Puerto, Database, Usuario, Contraseña
*/

/*
Testing
1) Supertest (npm i -D supertest @types/supertest)
Es una librería para pruebas de APIs que funciona sobre SuperAgent.
Permite enviar solicitudes HTTP a servidores y verificar respuestas.
Se usa junto con Jest u otros frameworks de prueba como Mocha o Chai.

2) Jest (npm i -D jest @types/jest ts-jest / npx ts-jest config:init)
Es un framework de testing desarrollado por Facebook.
Se usa para pruebas unitarias e integración en aplicaciones JavaScript y TypeScript.
Incluye funcionalidades como mocking, snapshots y un runner rápido.
No requiere configuraciones adicionales en la mayoría de los casos.
*"test": "jest --detectOpenHandles" -> npm run test¨
*detectOpenHandles: Detecta y muestra recursos abiertos que podrían estar causando que las 
pruebas no terminen correctamente.

-En conjunto
Jest proporciona el entorno de prueba y las aserciones.
SuperTest permite interactuar con la API y hacer peticiones HTTP.
Ambos juntos permiten realizar pruebas de integración para validar 
que la API responde correctamente.

3) Code Coverage
El Code Coverage (cobertura de código) mide qué porcentaje de tu código es ejecutado durante 
las pruebas automatizadas. En un servidor Express con Node.js, puedes usar herramientas como 
Jest con Istanbul (via jest --coverage) para generar un informe de cobertura.
"test:coverage": "jest --detectOpenHandles --coverage"

-File	Archivo analizado.
-% Stmts	Statements: Porcentaje de líneas ejecutadas en total.
-% Branch	Branches: Cobertura de estructuras de control (if, switch, ternarios, etc.).
-% Funcs	Functions: Porcentaje de funciones y métodos ejecutados.
-% Lines	Lines: Similar a Stmts, pero cuenta líneas específicas en vez de declaraciones generales.
-Uncovered Line #s	Líneas específicas que no se ejecutaron en las pruebas.
*/

/*
Documentación.
La documentación de una API es una guía detallada que explica cómo utilizarla, incluyendo 
sus endpoints, métodos HTTP, parámetros, respuestas, autenticación y ejemplos de uso. 
Es esencial para que otros desarrolladores (o incluso tú en el futuro) puedan integrarla sin problemas.

Algunas secciones clave que debe incluir una buena documentación de API:
-Introducción: Explica brevemente qué hace la API y su propósito.
-Autenticación: Si es necesaria, describe cómo obtener y usar las credenciales.
-Endpoints: Lista las rutas disponibles con sus métodos HTTP (GET, POST, PUT, DELETE, etc.).
-Parámetros: Detalla los parámetros requeridos y opcionales en cada endpoint.
-Códigos de estado HTTP: Explica los posibles errores y respuestas exitosas.
-Ejemplos de uso: Muestra cómo hacer llamadas a la API con herramientas como Postman o 
código en distintos lenguajes.
-Esquema de respuesta: Explica la estructura de los datos devueltos por la API.

Para documentarla puedes usar herramientas como:
-Swagger (OpenAPI): Genera documentación interactiva automáticamente.
-Postman: Permite describir la API y compartirla fácilmente.
-Redoc: Ofrece documentación visual basada en OpenAPI.
-GitHub/GitLab Wikis o Markdown: Para documentación más manual pero estructurada.

1) Swagger
npm i swagger-jsdoc swagger-ui-express
Types: npm i -D @types/swagger-jsdoc @types/swagger-ui-express

Swagger es un conjunto de herramientas para documentar, diseñar, probar y visualizar APIs REST.
Su núcleo es OpenAPI Specification (OAS), un estándar que define cómo debe estructurarse la 
documentación de una API.
✅ Genera documentación interactiva
✅ Permite probar endpoints desde la interfaz
✅ Facilita la integración con clientes y otros desarrolladores
✅ Reduce errores al definir la API con un esquema estructurado

Componentes principales de Swagger:
-Swagger UI – Interfaz visual interactiva que permite explorar y probar la API.
-Swagger Editor – Un editor basado en web para escribir documentación en OpenAPI.
-Swagger Codegen – Genera código cliente y servidor basado en la documentación.

1️⃣ swagger-jsdoc
Permite escribir la documentación en formato JSDoc dentro de los comentarios de tu código.
Genera un esquema OAS basado en esas anotaciones.

2️⃣ swagger-ui-express
Sirve la documentación de Swagger en una interfaz web interactiva.
Te permite probar los endpoints directamente desde el navegador.
*/

/*
CORS
npm i cors + npm i -D @types/cors

Cross-Origin Resource Sharing (Compartición de recursos entre orígenes distintos)
Por seguridad, los navegadores bloquean las peticiones HTTP que van de un origen 
diferente al servidor al que se está consultando. CORS permite que ciertos orígenes 
tengan permiso para hacer peticiones a tu backend.

El paquete cors es un middleware para Express (u otros frameworks) que agrega automáticamente 
los encabezados HTTP correctos para permitir esas conexiones.
*/

/*
Morgan - Logging
npm i morgan + npm i -D @types/morgan

Morgan es un middleware para Node.js (usualmente con Express) que sirve para registrar (loggear) 
solicitudes HTTP en ña aplicación. Es útil para ver qué peticiones llegan al servidor, cuándo y 
con qué datos, lo que facilita el debug y el monitoreo.
Morgan se inyecta como middleware en Express, lo que significa que se ejecuta cada vez que se 
recibe una petición HTTP antes de que llegue a la lógica final.
*/
import server from "./server"
import colors from 'colors'

//Puerto del Servidor
//process.env.PORT: despliegue en un servicio, asignado dinámicamente
const port = process.env.PORT || 4000; 

//Arranque del ervidor Express, escuchando en el puerto definido
server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el Puerto ${port}`));
});
