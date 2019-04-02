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
            message: "Semua data DNS logs  berhasil di dapatkan",
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
            message: "Top Query retrieved successfully",
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

// Handle view dns log by uid
exports.byuid = function (req, res) {
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


// Handle view dns log by date range
exports.bydaterange = function (req, res) {
    // find each dnslog with a uid, selecting the `name` and `occupation` fields
    Dnslog.findOne({
        'start': req.params.start,
        'end': req.params.end
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