// Import contact model
var moment = require('moment');
Dnslog = require('../models/dnslogModel');

// Handle index actions
exports.index = function (req, res) {
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
    Dnslog.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = {
                error: true,
                message: "Error fetching data"
            };
        } else {
            response = {
                error: false,
                message: "DNS Log page " + req.query.pageNo,
                data: data
            };
        }
        res.json(response);
    });
};
//
/*start top originator*/
exports.getTopOrigin = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Connlog.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
            "$group": {
                _id: "$id_orig_h",
                count: {
                    $sum: 1
                }
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
            message: "top originator of dns logs logs from " + startDate + "until " + endDate + " retrieved successfully",
            data: result
        });
    });
};

/*end top originator*/

/*start top resp*/
exports.getTopResp = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Connlog.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
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
                error: true,
                message: err,
            });
        }
        res.json({
            error: false,
            message: "top originator of dns logs logs from " + startDate + "until " + endDate + " retrieved successfully",
            data: result
        });
    });
};

/*end top resp*/
/*start top query*/
exports.getQuery = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Dnslog.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
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
            message: "Top Query retrieved successfully from " + startDate + " until " + endDate,
            data: result
        });
    });
};

/*end top query*/

/*start top rcode*/
exports.getRcode = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Dnslog.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
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
                error: false,
                message: err,
            });
        }
        res.json({
            error: false,
            message: "top rcode_name of dns traffic retrieved successfully from " + startDate + "until" + endDate,
            data: result
        });
    });
};

/*end top rcode*/

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


// // Handle view dns log by date range
exports.bydaterange = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

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
    Dnslog.find({
        ts: {
            '$gte': startDate,
            '$lte': endDate
        }
    }, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = {
                error: true,
                message: "Error fetching data"
            };
        } else {
            response = {
                error: false,
                message: 'dnslog from ' + startDate + ' until ' + endDate + "DNS Log page " + req.query.pageNo,
                data: data
            };
        }
        res.json(response);
    });
};



// Handle delete dnslogs by uid
exports.delete = function (req, res) {
    Dnslog.remove({
        uid: req.params.uid
    }, function (err, contact) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'DNS Row was deleted'
        });
    });
};

// count dns row data
exports.gettotal = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    // Find some documents
    Dnslog.count({
        ts: {
            '$gte': startDate,
            '$lte': endDate
        }
    }, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = {
                error: true,
                message: "Error fetching data"
            };
        } else {
            response = {
                error: false,
                message: 'Total traffic DNS periode ' + startDate + ' until ' + endDate,
                data: data
            };
        }
        res.json(response);
    });
}