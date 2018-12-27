// Import contact model
Dnslog = require('./dnslogModel');

// Handle index actions
exports.index = function (req, res) {
    Dnslog.get(function (err, dnslogs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "DNS logs retrieved successfully",
            data: dnslogs
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Dnslog.findById(req.params.uid, function (err, dnslog) {
        if (err)
            res.send(err);
        res.json({
            message: 'dnslog details loading..',
            data: dnslog
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Dnslog.remove({
        _id: req.params.uid
    }, function (err, contact) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};