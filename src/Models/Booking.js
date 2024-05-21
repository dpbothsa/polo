const { DataTypes } = require('sequelize');
const sequelize = require('../config/DatabaseConnection');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Name is required'
            },
            notEmpty: {
                msg: 'Name cannot be empty'
            }
        }
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Phone number is required'
            },
            isInt: {
                msg: 'Phone number must be an integer'
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Date is required'
            },
            isDate: {
                msg: 'Must be a valid date'
            }
        }
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Time is required'
            }
        }
    },
    testId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Test ID is required'
            },
            isInt: {
                msg: 'Test ID must be an integer'
            }
        }
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Payment Method is required'
            },
            notEmpty: {
                msg: 'Payment Method cannot be empty'
            }
        }
    },
    sampleCollection: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Sample Collection method is required'
            },
            notEmpty: {
                msg: 'Sample Collection method cannot be empty'
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Status is required'
            },
            notEmpty: {
                msg: 'status cannot be empty'
            }
        }
    }
}, {
    tableName: 'Bookings',
    timestamps: true
});


sequelize
    .sync()
    .then(() => {
        console.log('Booking Model synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing models:', err);
    });


module.exports = { Booking };
