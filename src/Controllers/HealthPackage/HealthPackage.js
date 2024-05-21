const { Package } = require('../../Models/HealthPackage');
const { Test } = require('../../Models/Test');
const { PackageTest } = require('../../Models/PackagesTests');
const { StatusCodes } = require('../enum');

async function createPackage(req, res) {
  try {
    const { name, price, testIds } = req.body;
    const existingPackage = await Package.findOne({
      where: {
        name
      }
    });

    if (existingPackage) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: 'Package with the same name already exists' });
    }

    const packageInstance = await Package.create({ name, price });

    const tests = await Test.findAll({
      where: {
        id: testIds
      }
    });

    for (const test of tests) {
      await PackageTest.create({
        packageId: packageInstance.id,
        testId: test.id
      });
    }

    return res.status(StatusCodes.CREATED).json({ success: true, package: packageInstance, message: "Successfully Created Package" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
  }
}


async function getPackagesWithTests(req, res) {
  try {
    const packages = await Package.findAll({
      attributes: ['id', 'name', 'price'],
      include: [{
        model: Test,
        as: 'tests',
        attributes: ['name'],
        through: { attributes: [] } 
      }]
    });

    const packagesWithTests = packages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      tests: pkg.tests.map(test => test.name)
    }));

    return res.status(StatusCodes.OK).json({ success: true, packages: packagesWithTests ,message:"Successfully Fetched All Packages",count:packages.length});
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
  }
}


async function updatePackage(req, res) {
  try {
    const { id } = req.params;
    const { name, price, testIds } = req.body;

    const packageInstance = await Package.findByPk(id);
    if (!packageInstance) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, error: 'Package not found' });
    }

    await packageInstance.update({ name, price });

    const tests = await Test.findAll({
      where: {
        id: testIds
      }
    });

    await PackageTest.destroy({
      where: { packageId:id }
    });

    for (const test of tests) {
      await PackageTest.create({
        packageId: packageInstance.id,
        testId: test.id
      });
    }

    return res.status(StatusCodes.OK).json({ success: true, package: packageInstance });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
  }
}



async function deletePackage(req, res) {
  try {
    const { id } = req.params;

   
    const packageInstance = await Package.findByPk(id);
    if (!packageInstance) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, error: 'Package not found' });
    }

    await PackageTest.destroy({
      where: { packageId:id }
    });

  
    await Package.destroy({
      where: { id }
    });

    return res.status(StatusCodes.OK).json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
  }
}

module.exports = {
  createPackage,
  getPackagesWithTests,
  deletePackage,
  updatePackage
};
