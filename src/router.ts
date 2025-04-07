//ROUTER
import { Router } from "express"
import { createProduct, getProducts, getProductById, 
    updateProduct, updateAvailability, deleteProduct } from "./handlers/product";

const router = Router(); // Nuevo "conjunto de rutas" de organización modular

//SCHEMA Definition
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties: 
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product Name
 *                  example: Monitor 54 Pulgadas
 *              price: 
 *                  type: number
 *                  description: The Product Price
 *                  example: 350
 *              availability: 
 *                  type: boolean
 *                  description: The Product Availability
 *                  example: true
 */

//GET Method
/**
 * @swagger
 * /api/products:
 *  get: 
 *      summary: Gets a list of products
 *      tags: 
 *          - Products
 *      description: Returns a list of products
 *      responses: 
 *          200:
 *              description: Successful Response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'            
 */
router.get('/', getProducts);

//GET BY ID Method
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Gets a product by ID
 *      tags:
 *          - Products
 *      description: Returns a product based on its unique ID
 *      parameters:
 *        - in: path 
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                             $ref: '#/components/schemas/Product' 
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad request - Invalid ID
 */
router.get('/:id', getProductById);

//POST Method
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor 45 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Product created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                             $ref: '#/components/schemas/Product' 
 *          400:
 *              description: Bad request - Invalid input data
 */
router.post('/', createProduct);

//PUT Method
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path 
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor 45 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: false
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                             $ref: '#/components/schemas/Product' 
 *          404: 
 *              description: Not found
 *          400:
 *              description: Bad request - Invalid ID or Invalid input data
 */
router.put('/:id', updateProduct);

//PATCH Method
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updates Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path 
 *          name: id
 *          description: The ID of the product to update availability
 *          required: true
 *          schema:
 *              type: integer
 *      responses: 
 *          200:
 *              description: Product updated availability successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                             $ref: '#/components/schemas/Product' 
 *          404: 
 *              description: Not found
 *          400:
 *              description: Bad request - Invalid ID
 */
router.patch('/:id', updateAvailability);

//DELETE Method
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a Product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path 
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses: 
 *          200:
 *              description: Product updated availability successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                             type: string
 *                             value: 'Producto {id} Eliminado'
 *          404: 
 *              description: Not found
 *          400:
 *              description: Bad request - Invalid ID
 */
router.delete('/:id', deleteProduct);

export default router;

/*
PUT:
Actualiza un recurso reemplazándolo completamente
✅ Se debe enviar todos los campos
✅ No se puede actualizar solo una parte
✅ Usa PUT cuando necesitas reemplazar completamente un recurso

PATCH:
Modifica solo los campos específicos que mandas en la petición
✅ Mantiene los datos existentes
✅ Se puede actualizar solo un campo
✅ Usa PATCH cuando solo quieres modificar uno o más campos sin afectar los demás
*/