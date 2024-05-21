const { DataTypes } = require('sequelize');
const sequelize = require('../config/DatabaseConnection');
const { Test } = require('./Test');


const Package = sequelize.define('Package', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'Health_Packages',
  timestamps: true
});

Package.associate = (models) => {
  Package.belongsToMany(models.Test, {
    through: 'PackageTest',
    as: 'tests',
    foreignKey: 'packageId',
    otherKey: 'testId'
  });
};

module.exports ={Package} ;
