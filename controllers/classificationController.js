// Import contact model
Classification = require('../models/classificationModel');

// Handle delete Classification
exports.index = function (req, res) {
    res.json({
        error: false,
        message: "Classification home list",
    });
};

// Handle index classification
exports.bydaterange = function (req, res) {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = {
            error: true,
            message: "invalid page number, should start with 1"
        };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    Classification.aggregate(
        [{
            $project: {
                _id: 0,
                uid: "$uid",
                orig_h: "$orig_h",
                orig_p: "orig_p",
                resp_h: "$resp_h",
                resp_p: "$resp_p",
                label: {
                    $cond: {
                        if: {
                            $gte: ["$label", "0.0"]
                        },
                        then: "normal",
                        else: "malicious"
                    }
                },


            }
        }, {
            $limit: 10
        }],
        function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {
                    error: true,
                    message: "Error fetching data"
                };
            } else {
                response = {
                    error: false,
                    message: "Classification logs retrieved successfully page " + req.query.pageNo,
                    data: data
                };
            }
            res.json(response);
        });

};
//
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
                error: true,
                message: err,
            });
        }
        res.json({
            error: false,
            message: "normal query count retrieved successfully",
            data: result
        });
    });
};

/*end top query*/

// Handle view Classification info
exports.view = function (req, res) {
    // find each dnslog with a uid, selecting the `name` and `occupation` fields
    Classification.findOne({
        'uid': req.params.uid
    }, function (err, dnslog) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'dnslog details loading..',
            data: dnslog
        });
    });
};

// Handle delete Classification
exports.delete = function (req, res) {
    Classification.remove({
        uid: req.params.uid
    }, function (err, contact) {
        if (err)
            res.send(err);

        res.json({
            error: false,
            message: 'Classification deleted'
        });
    });
};

// get all malicious count of connlog
exports.getMaliciousCount = function (req, res) {
    var q = Classification.find({
        label: '1.0'
    }).count();

    q.exec(function (err, data) {
        // `posts` will be of length 20
        if (err) {
            res.json({
                error: true,
                message: err
            });
        }

        res.json({
            error: false,
            message: 'count of malicious traffic..',
            data: data
        })
    })
};

// get all normal count of connlog
exports.getNormalCount = function (req, res) {
    var q = Classification.find({
        label: '0.0'
    }).count();

    q.exec(function (err, data) {
        // `posts` will be of length 20
        if (err) {
            res.json({
                error: true,
                message: err
            });
        }

        res.json({
            error: false,
            message: 'count of normal traffic..',
            data: data
        })
    })
};
/*end query traffic*/