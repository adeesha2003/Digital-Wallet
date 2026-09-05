const Event = require("../models/Event");


// ======================================================
// SAVE EVENT
// ======================================================

const saveEvent = async (eventData) => {

    const event = new Event(eventData);

    return await event.save();
};


// ======================================================
// GET EVENTS FOR A WALLET
// ======================================================

const getEventsByWallet = async (walletId) => {

    return await Event.find({
        walletId: walletId
    }).sort({
        createdAt: 1
    });

};


module.exports = {
    saveEvent,
    getEventsByWallet
};