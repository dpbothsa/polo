const { DataTypes } = require('sequelize');
const sequelize = require('../config/DatabaseConnection');

const PackageTest = sequelize.define('PackageTest', {
  packageId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  testId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: 'PackageTests',
  timestamps: false
});

module.exports = {PackageTest};
