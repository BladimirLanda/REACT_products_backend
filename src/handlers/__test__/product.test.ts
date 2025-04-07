//TEST PRODUCT
import request from "supertest"
import server from "../../server"

//POST
describe('POST /api/products', () => {
    test('should create a new product', async () => {
        const response = await request(server)
                        .post('/api/products')
                        .send({
                            name: "Mouse - Testing",
                            price: 1500
                        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.body.success).toBe(true);
    });

    test('should display validation error', async () => {
        const response = await request(server)
                        .post('/api/products')
                        .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.success).toBe(false);
    });

    test('should validate that price is greater than 0', async () => {
        const response = await request(server)
                        .post('/api/products')
                        .send({
                            name: "Mouse - Testing",
                            price: 0
                        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.success).toBe(false);
    });

    test('should validate that price is a number and greater than 0', async () => {
        const response = await request(server)
                        .post('/api/products')
                        .send({
                            name: "Mouse - Testing",
                            price: "Valor"
                        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);
        expect(response.body.success).toBe(false);
    });
});

//GET ALL
describe('GET /api/products', () => {
    test('should response with JSON products', async () => {
        const response = await request(server)
                        .get('/api/products');
        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);
        expect(response.body.success).toBe(true);
    });
});
    
//GET BY ID
describe('GET /api/products/id', () => {
    test('should response with JSON product', async () => {;
        const response  = await request(server)
                        .get('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.success).toBe(true);
    });

    test('should check a valid ID in the URL', async () => {;
        const response  = await request(server)
                        .get('/api/products/not-valid-id');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no válido');
        expect(response.body.success).toBe(false);
    });

    test('should return a 404 status code for a non-existent product', async () => {
        const productId = 500;
        const response  = await request(server)
                        .get(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBe('Producto no encontrado');
        expect(response.body.success).toBe(false);
    });
});

//PUT
describe('PUT /api/products/id', () => {
    test('should response with JSON product', async () => {;
        const response  = await request(server)
                        .put('/api/products/1')
                        .send({
                            name: "Mouse - Updated",
                            price: 500,
                            availability: false
                        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.success).toBe(true);
    });

    test('should check a valid ID in the URL', async () => {;
        const response  = await request(server)
                        .put('/api/products/not-valid-id')
                        .send({
                            name: "Mouse - Updated",
                            price: 500,
                            availability: false
                        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no válido');
        expect(response.body.success).toBe(false);
    });
    
    test('should display validation error messages when updating', async () => {
        const response = await request(server)
                        .put('/api/products/1')                        
                        .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(5);
        expect(response.body.success).toBe(false);
    });

    test('should validate that availability is a boolean', async () => {
        const response = await request(server)
                        .put('/api/products/1')                        
                        .send({
                            name: "Mouse - Updated",
                            price: 500,
                            availability: "not-boolean"
                        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Valor de disponibilidad no válido');
        expect(response.body.success).toBe(false);
    });

    test('should return a 404 status code for a non-existent product', async () => {
        const productId = 500;
        const response  = await request(server)
                        .put(`/api/products/${productId}`)
                        .send({
                            name: "Mouse - Updated",
                            price: 500,
                            availability: false
                        });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBe('Producto no encontrado');
        expect(response.body.success).toBe(false);
    });
});

//PATCH
describe('PATCH /api/products/id', () => {
    test('should response with JSON product', async () => {
        const response = await request(server)
                        .patch('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.availability).toBe(true);
        expect(response.body.success).toBe(true);
    });
    
    test('should check a valid ID in the URL', async () => {;
        const response  = await request(server)
                        .patch('/api/products/not-valid-id');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no válido');
        expect(response.body.success).toBe(false);
    });

    test('should return a 404 status code for a non-existent product', async () => {
        const productId = 500;
        const response  = await request(server)
                        .patch(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBe('Producto no encontrado');
        expect(response.body.success).toBe(false);
    });
});

//DELETE
describe('DELETE /api/products/id', () => {
    test('should response with JSON confirmation', async () => {
        const productId = 1;
        const response  = await request(server)
                        .delete(`/api/products/${productId}`)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBe(`Producto ${productId} Eliminado`)
        expect(response.body.success).toBe(true);
    });

    test('should check a valid ID in the URL', async () => {
        const response  = await request(server)
                        .delete('/api/products/not-valid-id');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no válido');
        expect(response.body.success).toBe(false);
    });

    test('should return a 404 status code for a non-existent product', async () => {
        const productId = 500;
        const response  = await request(server)
                        .delete(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBe('Producto no encontrado');
        expect(response.body.success).toBe(false);
    });
});