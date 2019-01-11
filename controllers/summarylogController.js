// Import contact model
DnsLog = require('../models/dnslogModel');
ConnLog = require('../models/connlogModel');
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