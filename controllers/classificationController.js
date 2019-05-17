// Import contact model
var moment = require('moment');
Classification = require("../models/classificationModel");

// Handle delete Classification
exports.index = function (req, res) {
    res.json({
        error: false,
        message: "Classification home list"
    });
};

// Handle index classification
exports.malicious = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00
    // var pageNo = parseInt(req.query.pageNo);
    // var size = parseInt(req.query.size);
    // if (pageNo < 0 || pageNo === 0) {
    //     response = {
    //         error: true,
    //         message: "invalid page number, should start with 1"
    //     };
    //     return res.json(response);
    // }
    // Find some documents
    Classification.aggregate(
        [{
                $match: {
                    label: "1.0",
                    ts: {
                        "$gte": new Date(startDate),
                        "$lte": new Date(endDate)
                    }
                }
            },
            {
                $lookup: {
                    from: "conns",
                    localField: "uid",
                    foreignField: "uid",
                    as: "conns"
                }
            },
            {
                $lookup: {
                    from: "dns",
                    localField: "uid",
                    foreignField: "uid",
                    as: "dns"
                }
            },
            {
                $project: {
                    _id: 0,
                    ts: "$ts",
                    uid: "$uid",
                    orig_h: "$orig_h",
                    orig_p: "$orig_p",
                    resp_h: "$resp_h",
                    resp_p: "$resp_p",
                    conns: "$conns",
                    dns: "$dns",
                    label: {
                        $cond: {
                            if: {
                                $gte: ["$label", "1.0"]
                            },
                            then: "malicious",
                            else: "normal"
                        }
                    }
                }
            }
            // {
            //     $limit: size * (pageNo - 1) + size
            // },
            // {
            //     $skip: size * (pageNo - 1)
            // }
        ],
        function (err, data) {
            // console.log(data)
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {
                    error: true,
                    message: "Error fetching data"
                };
            } else {
                response = {
                    error: false,
                    message: "Malicious classification logs retrieved successfully page " +
                        req.query.pageNo,
                    data: data
                };
            }
            res.json(response);
        }
    );
};
//
/*start top query*/

// Handle index classification
exports.normal = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00
    // var pageNo = parseInt(req.query.pageNo);
    // var size = parseInt(req.query.size);
    // if (pageNo < 0 || pageNo === 0) {
    //     response = {
    //         error: true,
    //         message: "invalid page number, should start with 1"
    //     };
    //     return res.json(response);
    // }
    // Find some documents
    Classification.aggregate(
        [{
                $match: {
                    label: "0.0",
                    ts: {
                        "$gte": new Date(startDate),
                        "$lte": new Date(endDate)
                    }
                }
            },
            {
                $lookup: {
                    from: "conns",
                    localField: "uid",
                    foreignField: "uid",
                    as: "conns"
                }
            },
            {
                $lookup: {
                    from: "dns",
                    localField: "uid",
                    foreignField: "uid",
                    as: "dns"
                }
            },
            {
                $project: {
                    _id: 0,
                    uid: "$ts",
                    uid: "$uid",
                    orig_h: "$orig_h",
                    orig_p: "$orig_p",
                    resp_h: "$resp_h",
                    resp_p: "$resp_p",
                    conns: "$conns",
                    dns: "$dns",
                    label: {
                        $cond: {
                            if: {
                                $gte: ["$label", "0.0"]
                            },
                            then: "normal",
                            else: "malicious"
                        }
                    }
                }
            }
            // {
            //     $limit: size * (pageNo - 1) + size
            // }, {
            //     $skip: size * (pageNo - 1)
            // }
        ],
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
                    message: "normal Classification logs retrieved successfully page ",
                    data: data
                };
            }
            res.json(response);
        }
    );
};
//

// Handle view Classification info
exports.view = function (req, res) {
    // find each dnslog with a uid, selecting the `name` and `occupation` fields
    Classification.findOne({
            uid: req.params.uid
        },
        function (err, dnslog) {
            if (err) res.send(err);
            res.json({
                error: false,
                message: "dnslog details loading..",
                data: dnslog
            });
        }
    );
};

// Handle delete Classification
exports.delete = function (req, res) {
    Classification.remove({
            uid: req.params.uid
        },
        function (err, contact) {
            if (err) res.send(err);

            res.json({
                error: false,
                message: "Classification deleted"
            });
        }
    );
};

// get all malicious count of connlog
exports.getMaliciousCount = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    var q = Classification.find({
        label: "1.0",
        ts: {
            '$gte': startDate,
            '$lte': endDate
        }
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
            message: "count of malicious traffic from " + startDate + " until " + endDate,
            data: data
        });
    });
};

// get all malicious
exports.totalMalicious = function (req, res) {
    var q = Classification.find({
        label: "1.0"
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
            message: "total malicious traffic from ",
            data: data
        });
    });
};

// get all normal count of connlog
exports.getNormalCount = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    var q = Classification.find({
        label: "0.0",
        ts: {
            '$gte': startDate,
            '$lte': endDate
        }
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
            message: "count of normal traffic.. from " + startDate + " until " + endDate,
            data: data
        });
    });
};
/*end query traffic*/

// get all malicious count of connlog
exports.totalNormal = function (req, res) {
    var q = Classification.find({
        label: "0.0"
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
            message: "total normal traffic from ",
            data: data
        });
    });
};


// get all normal count of connlog
exports.testJoin = function (req, res) {
    var q = Classification.aggregate([{
            $match: {
                uid: "CEYlbF3sSupYgosEBj"
            }
        },
        {
            $lookup: {
                from: "conns",
                localField: "uid",
                foreignField: "uid",
                as: "conns"
            }
        },
        {
            $lookup: {
                from: "dns",
                localField: "uid",
                foreignField: "uid",
                as: "dns"
            }
        }
    ]);

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
            message: "test join..",
            data: data
        });
    });
};
/*end query traffic*/

// klasifikasi count
exports.klasifikasicount = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    var q = Classification.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
            "$group": {
                _id: "$label",
                value: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                value: "$value",
                name: {
                    $cond: {
                        if: {
                            $gte: ["$_id", "1.0"]
                        },
                        then: "malicious",
                        else: "normal"
                    }
                },
                sum: 1
            }
        }
    ]);

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
            message: "jumlah klasifikasi traffic " + startDate + " until " + endDate,
            data: data
        });
    });
};

/*start top resp*/
exports.getTopResp = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Classification.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
            "$group": {
                _id: "$resp_h",
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
            message: "top responder of Conn logs retrieved successfully",
            data: result
        });
    });
};