// Import contact model
Connlog = require('../models/connlogModel');

/*start query traffic*/
// Handle index actions
exports.index = function (req, res) {
    Connlog.get(function (err, connlogs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Conn logs retrieved successfully",
            data: connlogs
        });
    }, 20);
};

// get all count of connlog
exports.getAllCount = function (req, res) {
    Connlog.count({}, function (err, c) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Conn logs retrieved successfully",
            data: c
        });
    });
};

// get all malicious count of connlog
exports.getMaliciousCount = function (req, res) {
    Connlog.count({
        label: 'malicious'
    }, function (err, c) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "malicious count of Conn logs retrieved successfully",
            data: c
        });
    });
};

// get all normal count of connlog
exports.getNormalCount = function (req, res) {
    Connlog.count({
        label: 'normal'
    }, function (err, c) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "normal count of Conn logs retrieved successfully",
            data: c
        });
    });
};
/*end query traffic*/
/*start protokol*/
exports.getProtokol = function (req, res) {
    Connlog.aggregate([{
            "$group": {
                _id: "$proto",
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

/*end protokol*/
/*start top originator*/
exports.getTopOrigin = function (req, res) {
    Connlog.aggregate([{
            "$group": {
                _id: "$id_orig_h",
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

/*end top originator*/

/*start top resp*/
exports.getTopResp = function (req, res) {
    Connlog.aggregate([{
            "$group": {
                _id: "$id_resp_h",
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

/*end top resp*/

/*start top resp*/
exports.getTopLabel = function (req, res) {
    Connlog.aggregate([{
            "$group": {
                _id: "$label",
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

/*end top resp*/

// Handle create contact actions
exports.new = function (req, res) {
    var connlog = new Connlog();
    connlog.ts = req.body.ts ? req.body.ts : connlog.ts;
    connlog.uid = req.body.uid;
    connlog.id_orig_h = req.body.id_orig_h;
    connlog.id_orig_p = req.body.id_orig_p;
    connlog.id_resp_h = req.body.id_resp_h;
    connlog.id_resp_p = req.body.id_resp_p;
    connlog.proto = req.body.proto;
    connlog.service = req.body.service;
    connlog.duration = req.body.duration;
    connlog.orig_bytes = req.body.orig_bytes;
    connlog.resp_bytes = req.body.resp_bytes;
    connlog.conn_state = req.body.conn_state;
    connlog.local_orig = req.body.local_orig;
    connlog.local_resp = req.body.local_resp;
    connlog.missed_bytes = req.body.missed_bytes;
    connlog.history = req.body.history;
    connlog.orig_pkts = req.body.orig_pkts;
    connlog.orig_ip_bytes = req.body.orig_ip_bytes;
    connlog.resp_pkts = req.body.resp_pkts;
    connlog.resp_ip_bytes = req.body.resp_ip_bytes;
    connlog.PX = req.body.PX;
    connlog.NNP = req.body.NNP;
    connlog.NSP = req.body.NSP;
    connlog.PSP = req.body.PSP;
    connlog.IOPR = req.body.IOPR;
    connlog.Reconnect = req.body.Reconnect;
    connlog.FPS = req.body.FPS;
    connlog.TBT = req.body.TBT;
    connlog.APL = req.body.APL;
    connlog.PPS = req.body.PPS;
    connlog.label = req.body.label;

    // save the contact and check for errors
    connlog.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: 'New connlog created!',
            data: connlog
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    // find each dnslog with a uid, selecting the `name` and `occupation` fields
    Connlog.findOne({
        'uid': req.params.uid
    }, function (err, connlog) {
        if (err)
            res.send(err);
        res.json({
            message: 'connlog details loading..',
            data: connlog
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Connlog.remove({
        uid: req.params.uid
    }, function (err, connlog) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'connlog deleted'
        });
    });
};