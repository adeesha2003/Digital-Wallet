const express = require("express");
const router = express.Router();

const { createWallet } = require("../commands/createWalletCommand");
const { depositMoney } = require("../commands/depositCommand");
const { withdrawMoney } = require("../commands/withdrawCommand");
const { transferMoney } = require("../commands/transferCommand");

const verifyToken = require("../middleware/authMiddleware");

// ======================================================
// CREATE WALLET
// ======================================================

router.post("/wallet", verifyToken, async (req, res) => {
    try {
        const { userName } = req.body;

        // Get the logged-in user's ID from the JWT token
        const userId = req.user.userId;

        const wallet = await createWallet(
            userId,
            userName
        );

        res.status(201).json({
            success: true,
            message: "Wallet created successfully",
            data: wallet
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


// ======================================================
// DEPOSIT MONEY
// ======================================================

router.post("/deposit", verifyToken, async (req, res) => {
    try {
        const { walletId, amount } = req.body;

        // Get the logged-in user's ID from the JWT token
        const userId = req.user.userId;

        // Deposit only to the logged-in user's wallet
        const result = await depositMoney(
            walletId,
            amount,
            userId
        );

        res.status(200).json({
            success: true,
            message: "Money deposited successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


// ======================================================
// WITHDRAW MONEY
// ======================================================

router.post("/withdraw", verifyToken, async (req, res) => {
    try {
        const { walletId, amount } = req.body;

        // Get the logged-in user's ID from the JWT token
        const userId = req.user.userId;

        // Withdraw only from the logged-in user's wallet
        const result = await withdrawMoney(
            walletId,
            amount,
            userId
        );

        res.status(200).json({
            success: true,
            message: "Money withdrawn successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


// ======================================================
// TRANSFER MONEY
// ======================================================

router.post("/transfer", verifyToken, async (req, res) => {
    try {
        const {
            fromWalletId,
            toWalletId,
            amount
        } = req.body;

        // Get the logged-in user's ID from the JWT token
        const userId = req.user.userId;

        // Transfer can only be made from the logged-in user's wallet
        // The receiver can be another user's wallet
        const result = await transferMoney(
            fromWalletId,
            toWalletId,
            amount,
            userId
        );

        res.status(200).json({
            success: true,
            message: "Money transferred successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
});


module.exports = router;