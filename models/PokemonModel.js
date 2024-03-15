import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pokemon = db.define('pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
        },
    skill: {
        type: DataTypes.STRING
    },
    height: {
        type: DataTypes.DECIMAL(5, 2)
    },
    width: {
        type: DataTypes.DECIMAL(5, 2)
    },
    length: {
        type: DataTypes.DECIMAL(5, 2)
    },
    hp: {
        type: DataTypes.INTEGER
    },
    damage: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Pokemon;

(async () => {
    await db.sync(); 
})();
