const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../Models/User'); 
const dotenv = require('dotenv');
const { StatusCodes } = require('../enum');

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    try {
        const { userId, password } = req.body;

        let exist = await User.findOne({ where: { userId } });

        if (exist) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User Already Exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({ userId, password: hashedPassword });
        await user.save();

        return res.status(StatusCodes.CREATED).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const user = await User.findOne({ where: { userId } });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid user ID or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid user ID or password" });
        }

        const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });

        return res.status(StatusCodes.OK).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

module.exports = { createUser, loginUser };
