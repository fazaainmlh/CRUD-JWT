const { Sequelize } = require("sequelize");
const sequelize = require("../Config/Database.js");

const { DataTypes } = Sequelize;

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true
});

module.exports = User;