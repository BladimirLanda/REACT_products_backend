//MODEL PRODUCT
import { Model, Table, Column, DataType, Default } from "sequelize-typescript"

/*
Decoradores
Los decoradores en Sequelize se usan en combinación con TypeScript y la librería sequelize-typescript,
que extiende Sequelize para admitir una sintaxis más elegante y orientada a objetos. 
Son funciones especiales que se pueden usar para agregar metadatos a clases, propiedades o métodos. 
En el contexto de sequelize-typescript, permiten definir modelos y sus atributos de una manera más declarativa.

-@Table({...}): Define la tabla en la base de dato
-@Column({...}): Define una columna dentro de la tabla.
    1) type: Especifica el tipo de dato (STRING, INTEGER, etc.).
    2) allowNull: Indica si el campo puede ser NULL.
    3) unique: Hace que la columna tenga valores únicos.
-Default(): Valor Default
-declare: Declaración de propiedad gestionada por Sequelize (Getters/Setters)
-User extends Model: Extiende la clase Modelo de Sequelize (conversión a Model-Sequelize)

https://sequelize.org/docs/v7/models/data-types/
*/

@Table({ tableName: 'products' }) // Define la Tabla

class Product extends Model {
    @Column({ //Define la Columna
        type: DataType.STRING(50) 
    })
    declare name: string

    @Column({
        type: DataType.FLOAT()
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN()
    })
    declare availability: boolean
}

export default Product;