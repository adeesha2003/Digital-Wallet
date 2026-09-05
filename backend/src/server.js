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

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });