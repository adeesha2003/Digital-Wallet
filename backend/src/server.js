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

app.use("/api/commands", commandRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Digital Wallet API is running"
    });
});

// Connect to MongoDB before handling requests
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
};

// Make sure database is connected before API requests
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