const { DataTypes } = require('sequelize');
const sequelize = require('../config/DatabaseConnection');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true
});




sequelize
  .sync()
  .then(() => {
    console.log('User Model synchronized with the database.');
  })
  .catch((err) => {
    console.error('Error synchronizing models:', err);
  });

module.exports = { User };
