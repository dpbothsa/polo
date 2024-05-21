const { Test } = require('../../Models/Test');
const { StatusCodes } = require('../enum');

const createTest = async (req, res) => {
    const { name, price, type } = req.body;

    try {

        const exist = await Test.findOne({ where: { name } });

        if (exist) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Test Already Exists" });
        }

        const test = await Test.create({ name, price, type });
        res.status(StatusCodes.CREATED).json({ test, message: "Successfully Created Test" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
};

const getAllTests = async (req, res) => {
    try {
        const allTests = await Test.findAll();
        res.status(StatusCodes.OK).json({ tests: allTests, message: "Successfully Fetched All Tests", count: allTests.length })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
}

const updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const labTest = await Test.findByPk(id);
        if (!labTest) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Test Doesn't Exist" });
        }

        if (name) {
            labTest.name = name;
        }
        if (price) {
            labTest.price = price;
        }

        await labTest.save();

        res.status(StatusCodes.OK).json({ message: 'Lab test updated successfully', labTest });
    } catch (error) {
        console.error('Error updating lab test:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;

        const labTest = await Test.findByPk(id);

        if (!labTest) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Test Doesn't Exist" });
        }
        await labTest.destroy();

        res.status(StatusCodes.OK).json({ message: 'Lab test deleted successfully' });
    } catch (error) {
        console.error('Error deleting lab test:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

const GetLabTests = async (req, res) => {
    try {
        const labtests = await Test.findAll({ where: { type: "lab" } });
        res.status(StatusCodes.OK).json({
            tests: labtests,
            message: "Successfully Fetched All Lab Tests",
            count: labtests.length
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};


const GetScans = async (req, res) => {
    try {
        const labtests = await Test.findAll({ where: { type: "scan" } });
        res.status(StatusCodes.OK).json({
            tests: labtests,
            message: "Successfully Fetched All Scans",
            count: labtests.length
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

module.exports = { createTest, getAllTests, updateTest, deleteTest, GetLabTests, GetScans };
