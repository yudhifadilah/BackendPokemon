import {Sequelize} from "sequelize";

//192.168.159.130
const db = new Sequelize('pokemondb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;