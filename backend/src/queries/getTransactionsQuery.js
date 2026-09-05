const Event = require("../models/Event");

const getTransactions = async (walletId) => {

    const events = await Event.find({
        walletId: walletId
    }).sort({ createdAt: 1 });

    return events;
};

module.exports = {
    getTransactions
};