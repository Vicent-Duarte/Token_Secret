const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ToDo = sequelize.define('ToDo', {
    campo1: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = ToDo;