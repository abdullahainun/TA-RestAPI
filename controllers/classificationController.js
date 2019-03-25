// Import contact model
Classification = require('../models/classificationModel');

// Handle index actions
exports.index = function (req, res) {
    Classification.get(function (err, classification) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Classification logs retrieved successfully",
            data: classification
        });
    }, 100);
};
//

// Handle create contact actions
exports.new = function (req, res) {
    var classification = new Classification();

    classification.uid = req.body.uid ? req.body.uid : classification.uid;
    classification.orig_h = req.body.orig_h ? req.body.orig_h : classification.orig_h;
    classification.orig_p = req.body.orig_p ? req.body.orig_p : classification.orig_p;
    classification.resp_h = req.body.resp_h ? req.body.resp_h : classification.resp_h;
    classification.resp_p = req.body.resp_p;
    classification.label = req.body.label;

    // save the contact and check for errors
    classification.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: 'New classification created!',
            data: classification
        });
    });
}; 

/*start top query*/
exports.getQuery = function (req, res) {
    Classification.aggregate([{
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
    Classification.aggregate([{
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
    Classification.aggregate([{
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
    Classification.findOne({
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
    Classification.remove({
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