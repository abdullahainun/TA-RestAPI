// Import contact model
Dnslog = require('../models/dnslogModel');

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
    }, 100);
};
// 
/*start top query*/
exports.getQuery = function (req, res) {
    Dnslog.aggregate([{
            "$group": {
                _id: "$query",
                value: {
                    $sum: 1
                }
            },
        },
        {
            $project: {
                _id: 0,
                value: "$value",
                name: "$_id",
                sum: 1
            }
        }
    ], function (err, result) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "normal count of Conn logs retrieved successfully",
            data: result
        });
    });
};

/*end top query*/

/*start top rcode*/
exports.getRcode = function (req, res) {
    Dnslog.aggregate([{
            "$group": {
                _id: "$rcode_name",
                value: {
                    $sum: 1
                }
            },
        },
        {
            $project: {
                _id: 0,
                value: "$value",
                name: "$_id",
                sum: 1
            }
        }
    ], function (err, result) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "normal count of Conn logs retrieved successfully",
            data: result
        });
    });
};

/*end top rcode*/

/*start top qclass*/
exports.getQclass = function (req, res) {
    Dnslog.aggregate([{
            "$group": {
                _id: "$qclass_name",
                value: {
                    $sum: 1
                }
            },
        },
        {
            $project: {
                _id: 0,
                value: "$value",
                name: "$_id",
                sum: 1
            }
        }
    ], function (err, result) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "normal count of Conn logs retrieved successfully",
            data: result
        });
    });
};

/*end top qclass*/

// Handle view contact info
exports.view = function (req, res) {
    // find each dnslog with a uid, selecting the `name` and `occupation` fields
    Dnslog.findOne({
        'uid': req.params.uid
    }, function (err, dnslog) {
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
        uid: req.params.uid
    }, function (err, contact) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};