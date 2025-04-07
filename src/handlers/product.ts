//HANDLE PRODUCT
import { Request, Response } from "express"
import { body, param, validationResult } from "express-validator"
import Product from "../models/Product"
import colors from 'colors'

//GET ALL
const getProducts = async (req : Request, res : Response) => {
    //Acción DB
    try {
        //Product.action: Crea la instancia y efecuta la acción
        const products = await Product.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]},
            order: [
                ['id', 'DESC']
            ]
        });
        console.log(colors.yellow.bold('ACTION: SELECT ALL'));

        res.json({
            //Express efecuta JSON.stringify(products.dataValues)
            data: products, 
            success:true
        });
    } catch (error) {
        console.log(colors.bgRed.bold(`Hubo un Error: '${error}'`));
    }
}

//GET BY ID
const getProductById = async (req : Request, res : Response) => {

    //Validación ID
    //.run(req): Ejecuta la validación y almacena en req
    await param('id')
            .isInt().withMessage('ID no válido')
            .run(req);

    //validationResult(req): Obtiene el resultado de las validaciones del req {Special Object}
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            //.array(): Método de Express Validator de extracción de los errors en formato array
            errors: errors.array(), 
            success: false
        });
    }

    //Acción DB
    try {
        //.params: Ingreso a los parametros dinámicos (:) de la URI del req
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        });
        console.log(colors.yellow.bold('ACTION: SELECT BY ID'));

        //Validación Obtención
        if(!product) {
            return res.status(404).json({
                errors: 'Producto no encontrado',
                success: false
            });
        }
        //--

        res.json({
            data: product, 
            success:true
        });
    } catch (error) {
        console.error(colors.bgRed.bold(`Hubo un Error: '${error}'`));
    }
}

//POST
const createProduct = async (req : Request, res : Response) => {

    //Validación Campos
    await body('name')
                .notEmpty().withMessage('El nombre es obligatorio')
                .run(req);
    await body('price')
                .isNumeric().withMessage('Valor no válido')
                .notEmpty().withMessage('El precio es obligatorio')
                .custom( value => value > 0 ).withMessage('Precio no válido')
                .run(req);

    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            success: false
        });
    }

    //Acción DB
    try {
        const product = await Product.create(req.body);
        console.log(colors.yellow.bold('ACTION: INSERT'));

        res.status(201).json({
            data: product, 
            success: true
        });
    } catch (error) {
        console.error(colors.bgRed.bold(`Hubo un Error: '${error}'`));
    }
}

//PUT
const updateProduct = async (req : Request, res : Response) => {

    //Validación Campos
    await param('id')
                .isInt().withMessage('ID no válido')
                .run(req);
    await body('name')
                .notEmpty().withMessage('El nombre es obligatorio')
                .run(req);
    await body('price')
                .isNumeric().withMessage('Valor no valido')
                .notEmpty().withMessage('El precio es obligatorio')
                .custom( value => value > 0 ).withMessage('Precio no válido')
                .run(req);
    await body('availability')
                .isBoolean().withMessage('Valor de disponibilidad no válido')
                .run(req);

    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            success: false
        });
    }

    //Validación Obtención
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        return res.status(404).json({
            errors: 'Producto no encontrado',
            success: false
        });
    }

    //Acción DB
    try {
        //.update(req.body): Actualiza los Campos Módelo
        //.save(): Método de inserción a la DB
        await product.update(req.body);
        await product.save();
        console.log(colors.yellow.bold('ACTION: UPDATE'));

        res.json({
            data: product, 
            success:true
        });
    } catch (error) {
        console.error(colors.bgRed.bold(`Hubo un Error: '${error}'`));
    }
}

//PATCH
const updateAvailability = async (req : Request, res : Response) => {

    //Validación Campos
    await param('id')
    .isInt().withMessage('ID no válido')
    .run(req);

    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            success: false
        });
    }

    //Validación Obtención
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        return res.status(404).json({
            errors: 'Producto no encontrado',
            success: false
        });
    }

    //Acción DB
    try {
        //Instancia.campo: Campo Módelo
        //Instancia.dataValues: Valores DB
        product.availability = !product.dataValues.availability;
        await product.save();
        console.log(colors.yellow.bold('ACTION: PATCH'));

        res.json({
            data: product, 
            success:true
        });

    } catch (error) {
        console.error(colors.bgRed.bold(`Hubo un Error: '${error}'`));
    }
}

//DELETE
const deleteProduct = async (req : Request, res : Response) => {

    //Validación Campos
    await param('id')
                .isInt().withMessage('ID no válido')
                .run(req);

    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            success: false
        });
    }

    //Validación Obtención
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        return res.status(404).json({
            errors: 'Producto no encontrado',
            success: false
        });
    }

    //Acción DB
    try {
        await product.destroy();
        console.log(colors.yellow.bold('ACTION: DELETE BY ID'));

        res.json({
            data: `Producto ${id} Eliminado`, 
            success:true
        });
    } catch (error) {
        console.error(colors.bgRed.bold(`Hubo un Error: '${error}'`));
    }
}

export {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    updateAvailability,
    deleteProduct
}