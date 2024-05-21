const express = require('express')
const router = express.Router();

const {createBooking,getAllBookings,updateBookingStatus, ActiveBookings,CompletedBookings} = require('../Controllers/Booking/Booking')

router.post('/',createBooking)
router.get('/',getAllBookings)
router.patch('/:id',updateBookingStatus)
router.get('/active',ActiveBookings)
router.get('/completed',CompletedBookings)


module.exports = router