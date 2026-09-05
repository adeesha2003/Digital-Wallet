const express = require("express");
const router = express.Router();

const { registerUser } = require("../commands/registerCommand");
const { loginUser } = require("../commands/loginCommand");
const verifyToken = require("../middleware/authMiddleware");

// Register
router.post("/register", async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await registerUser(userName, password);

        // Do not send password back to the client
        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: {
                id: user._id,
                userName: user.userName
            }
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        const result = await loginUser(userName, password);

        // Return user details and JWT token
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
});

// Test protected route
router.get("/verify", verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Token is valid",
        user: req.user
    });
});

module.exports = router;