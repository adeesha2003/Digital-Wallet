const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (userName, password) => {

    // Check required fields
    if (!userName || !password) {
        throw new Error("Username and password are required");
    }

    // Find user by username
    const user = await User.findOne({
        userName: userName.trim()
    });

    if (!user) {
        throw new Error("Invalid username or password");
    }

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid username or password");
    }

    // Create JWT token after successful login
    const token = jwt.sign(
        {
            userId: user._id,
            userName: user.userName
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    // Return user details and token
    return {
        user: {
            id: user._id,
            userName: user.userName
        },
        token: token
    };
};

module.exports = {
    loginUser
};