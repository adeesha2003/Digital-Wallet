const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const commandRoutes = require("./routes/commandRoutes");
const queryRoutes = require("./routes/queryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// Connect to MongoDB before handling API requests
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
};


// Make sure MongoDB is connected before API routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});


// API Routes
app.use("/api/commands", commandRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Digital Wallet API is running"
    });
});


// Start server only when running locally
if (!process.env.VERCEL) {
    connectDB()
        .then(() => {
            app.listen(process.env.PORT || 5000, () => {
                console.log(
                    `Server running on port ${process.env.PORT || 5000}`
                );
            });
        })
        .catch((error) => {
            console.error(
                "MongoDB connection failed:",
                error.message
            );
        });
}


module.exports = app;