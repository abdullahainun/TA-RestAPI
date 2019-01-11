// Import contact model
IntelLog = require('../models/intellogModel');

// Handle index actions
exports.index = function (req, res) {
    IntelLog.get(function (err, intellogs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Intel logs retrieved successfully",
            data: intellogs
        });
    }, 100);
};

// Handle view contact info
exports.view = function (req, res) {
    // find each dnslog with a uid, selecting the `name` and `occupation` fields
    IntelLog.findOne({
        'uid': req.params.uid
    }, function (err, intellog) {
        if (err)
            res.send(err);
        res.json({
            message: 'intellog details loading..',
            data: intellog
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    IntelLog.remove({
        uid: req.params.uid
    }, function (err, intellog) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Intel Log deleted'
        });
    });
};