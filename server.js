const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {Test} = require('./src/Models/Test')
const sequelize = require('./src/config/DatabaseConnection')
const {Package} = require('./src/Models/HealthPackage')
const db = require('./src/config/DatabaseConnection')
const HealthPackagesRoutes = require('./src/Routes/HealthPackage')
const User = require('./src/Routes/User')
const Tests = require('./src/Routes/Test')
const Booking = require('./src/Routes/Booking')



const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

dotenv.config();

app.use('/v1/api/package',HealthPackagesRoutes)
app.use('/v1/api/user',User)
app.use('/v1/api/test',Tests)
app.use('/v1/api/booking',Booking)


const PackageTest = sequelize.define('PackageTest', {}, { timestamps: false });

Package.associate({ Test });
Test.associate({ Package });

const models = {
  Package,
  Test,
  PackageTest,
  sequelize,
};



const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST
app.listen(PORT,HOST, () => {
  console.log('Server started on port', PORT,HOST);

  
});