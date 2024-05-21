const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch(err => {
    console.error('Error synchronizing models:', err);
  });


module.exports = sequelize;


testConnection();
