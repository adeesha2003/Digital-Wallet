const express = require("express");
const router = express.Router();

const { getWallet } = require("../queries/getWalletQuery");
const { getTransactions } = require("../queries/getTransactionsQuery");
const { getMyWallet } = require("../queries/getMyWalletQuery");
const { getReceiver } = require("../queries/getReceiverQuery");

const verifyToken = require("../middleware/authMiddleware");


// ======================================================
// GET MY WALLET
// ======================================================

router.get("/my-wallet", verifyToken, async (req, res) => {

    try {

        // Get logged-in user's ID from JWT
        const userId = req.user.userId;

        const wallet = await getMyWallet(userId);

        res.status(200).json({
            success: true,
            message: "Wallet loaded successfully",
            data: wallet
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

});


// ======================================================
// GET WALLET
// ======================================================

router.get("/wallet/:walletId", verifyToken, async (req, res) => {

    try {

        const wallet = await getWallet(
            req.params.walletId
        );

        res.status(200).json({
            success: true,
            message: "Wallet found",
            data: wallet
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

});


// ======================================================
// GET TRANSACTIONS
// ======================================================

router.get("/transactions/:walletId", verifyToken, async (req, res) => {

    try {

        const transactions = await getTransactions(
            req.params.walletId
        );

        res.status(200).json({
            success: true,
            message: "Transactions loaded successfully",
            data: transactions
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

});


// ======================================================
// FIND RECEIVER
// ======================================================

router.get("/receiver/:walletId", verifyToken, async (req, res) => {

    try {

        const receiver = await getReceiver(
            req.params.walletId
        );

        res.status(200).json({
            success: true,
            message: "Receiver found",
            data: receiver
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;