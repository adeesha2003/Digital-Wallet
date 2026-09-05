const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (userName, password) => {

    // Check required fields
    if (!userName || !password) {
        throw new Error("Username and password are required");
    }

    // Check whether username already exists
    const existingUser = await User.findOne({
        userName: userName.trim()
    });

    if (existingUser) {
        throw new Error("Username already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
        userName: userName.trim(),
        password: hashedPassword
    });

    return user;
};

module.exports = {
    registerUser
};