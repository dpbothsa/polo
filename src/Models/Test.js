const { DataTypes } = require('sequelize');
const sequelize = require('../config/DatabaseConnection');

const Test = sequelize.define('Test', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tests',
  timestamps: true
});

Test.associate = (models) => {
  Test.belongsToMany(models.Package, {
    through: 'PackageTest',
    as: 'packages',
    foreignKey: 'testId',
    otherKey: 'packageId'
  });
};

module.exports = {Test};
