const { Booking } = require('../../Models/Booking');
const { StatusCodes } = require('../enum');

const createBooking = async (req, res) => {
    try {
        const { name, phone, age, date, time, testId, paymentMethod, sampleCollection, status } = req.body;

        if (!name || !phone || !date || !time || !testId || !paymentMethod || !sampleCollection || !status) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "All required fields must be provided" });
        }

        const booking = await Booking.create({
            name,
            phone,
            age,
            date,
            time,
            testId,
            paymentMethod,
            sampleCollection,
            status
        });

        res.status(StatusCodes.CREATED).json({ "Booking": booking, message: "Booking Success" });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });
        } else {
            console.error('Error creating booking:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
        }
    }
};

const getAllBookings = async (req, res) => {
    try {
        const allBookings = await Booking.findAll();
        res.status(StatusCodes.OK).json({ "Booking": allBookings, message: "Successfully Fetched All Bookings", count: allBookings.length })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Status field is required" });
        }

        const booking = await Booking.findByPk(id);

        if (!booking) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Booking Doesn't Exist" });
        }

        booking.status = status;
        await booking.save();

        res.status(StatusCodes.OK).json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const ActiveBookings = async (req, res) => {
    try {
        const activeBookings = await Booking.findAll({ where: { status: "active" } });
        res.status(StatusCodes.OK).json({ "Active Bookings": activeBookings, message: "Successfully Fetched All Active Bookings", count: activeBookings.length })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
};

const CompletedBookings = async (req, res) => {
    try {
        const completedBookings = await Booking.findAll({ where: { status: "completed" } });
        res.status(StatusCodes.OK).json({ "Completed Bookings": completedBookings, message: "Successfully Fetched All Completed Bookings", count: completedBookings.length })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createBooking, getAllBookings, updateBookingStatus, ActiveBookings, CompletedBookings };
