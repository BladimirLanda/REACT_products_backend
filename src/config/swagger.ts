import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express";

/* 
swaggerJSDoc: Genera la documentación OpenAPI desde anotaciones 
en los comentarios del código.

options: Objeto opciones que sigue la estructura swaggerJSDoc.Options

swaggerDefinition: Configuración principal

openapi: Indica la versión OpenAPI 3.0.2

tags: Definición de categoría, útil para organizar la documentación en Swagger UI

info: Información API
-Título: Nombre de la API.
-Versión: Versión actual de la API.
-Descripción: Explicación breve sobre su propósito.

apis: Especifica dónde buscar anotaciones
-Indica que los comentarios con anotaciones Swagger están en ./src/router.ts.
-Si se tiene varias rutas, puedes usar ./src/routes/*.ts para incluir todos los 
archivos dentro de routes.

swaggerJSDoc(options): Genera la documentación en swaggerSpec 
según las opciones establecidas.
*/
const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypesScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

//Configuración Extra (Opcional)
const swaggerUiOptions : SwaggerUiOptions = {
    customSiteTitle: 'Doc REST API Express / TypeScript'
}

export default swaggerSpec;
export {
    swaggerUiOptions
}