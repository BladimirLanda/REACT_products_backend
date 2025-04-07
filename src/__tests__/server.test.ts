//TEST SERVER

/*
Jest
-La carpeta __test__: Es una convención en Jest para organizar archivos de prueba.
Esta carpeta debe estar en la raíz del código a probar.
-.test.ts: Es un archivo de prueba en TypeScript.

-describe("grupo", () => {})
Agrupa varias pruebas relacionadas en una sola sección.
Ayuda a organizar mejor los tests, dándoles un nombre descriptivo.

-test("prueba", () => {})
Define una prueba individual.

-expect(...) 
Es una aserción, que compara el valor esperado con el valor real.

-toBe(...)
Es una aserción de comparación
Compara valores primitivos con igualdad estricta (===).
Se usa para números, strings, booleanos y null o undefined.
Compara referencias.
No funciona bien con objetos o arrays.

-toEqual()
Es una aserción de comparación
Compara el contenido de objetos y arrays.
Se usa cuando quieres comparar estructuras completas (objetos, arrays).
No compara referencias, solo el contenido.

-toMatch()
Es una aserción de comparación
Se usa para comparar strings con expresiones regulares (RegExp).
Ideal para buscar coincidencias dentro de un string.
1) expect("Hola mundo").toMatch(/mundo/); // ✅ Pasa porque "mundo" está en el string
2) expect("JavaScript").toMatch(/^Java/); // ✅ Pasa porque empieza con "Java"
3) expect("TypeScript").not.toMatch(/Python/); // ✅ Pasa porque "Python" NO está en el string

Supertest
request: Es una función que se usa para hacer peticiones HTTP (GET, POST, PUT, DELETE, etc.) 
a un servidor durante las pruebas.
*/
import request from "supertest"
import server, { connectDB } from "../server"
import db from "../config/db"

//SERVER
describe('SERVER GET /api', () => {
    test('should send back a JSON response', async () => {
        const res = await request(server).get('/api');

        //True
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual(
            {
                msg: 'Probando API', 
                success: true
            }
        );

        //False
        expect(res.status).not.toBe(404);
        expect(res.headers['content-type']).not.toMatch(/xml/);
        expect(res.body).not.toEqual(
            {
                msg: 'Probando Método', 
                success: false
            }
        );
    });
});

//MOCK
/*
.mock() es una función que se utiliza para crear mocks (simulaciones) de funciones, objetos o módulos. 
Esto te permite aislar el código bajo prueba y simular comportamientos específicos de dependencias 
externas sin tener que ejecutarlas realmente.
Jest crea un mock (simulación) para una función o módulo y te permite controlar el comportamiento 
de esa función en las pruebas, verificando si se ha llamado, cuántas veces se ha llamado, con 
qué argumentos, y cuál es su valor de retorno.

jest.fn(): Crea una función simulada.
jest.mock(object): Simula módulos completos o dependencias externas.

.mockReturnValue(value): Define el valor que debe devolver el mock.
.mockResolvedValue(value): Para promesas, simula que la promesa se resuelve con un valor.
.mockRejectedValue(error): Para promesas, simula que la promesa falla con un error.
.mock.calls: Muestra las veces que la función fue llamada y con qué argumentos.
.mockReturnValueOnce(value): Devuelve un valor específico solo la primera vez que se llama.

jest.spyOn(object, methodName): Función que permite espiar (es decir, observar) métodos o funciones 
de objetos existentes sin necesidad de modificarlos. Esto es útil para interceptar 
llamadas a métodos específicos y verificar si se han llamado, cuántas veces, con qué 
parámetros y cuál fue su resultado. A diferencia de jest.fn(), que crea funciones simuladas 
completamente nuevas, jest.spyOn() mantiene el comportamiento original de la función, pero 
te permite monitorearla durante las pruebas.

.toHaveBeenCalledTimes(value): Número de veces que fue llamado
.toHaveBeenCalledWith(value): Valor con el que fue llamado

expect.stringContaining(value): Matcher que verifica que una cadena de texto contenga una subcadena específica.
Es útil en este caso ya que el valor completo de la llamda es 'colors.bgRed.bold('Hubo un Error de Conexión')',
de este modo validamos la existencia del mensaje de error.
*/

//Instancia - Creación del Mock simulado del archivo db importado
jest.mock('../config/db.ts');

describe('Connect DB', () => {
    test('should handle db connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValue(new Error('Hubo un Error de Conexión'));
        
        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy)
            .toHaveBeenCalledWith(expect.stringContaining('Hubo un Error de Conexión'));
    });
});
