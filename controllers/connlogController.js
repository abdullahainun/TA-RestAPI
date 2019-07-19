// Import contact model
var moment = require('moment');
Connlog = require('../models/connlogModel');

/*start query traffic*/
// Handle index actions
exports.index = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    // Find some documents
    Connlog.find({
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
                message: 'Conn Logs periode ' + startDate + ' until ' + endDate,
                data: data
            };
        }
        res.json(response);
    });
};

// get all count of connlog
exports.getAllCount = function (req, res) {
    var startDate = moment(req.params.start).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T23:59:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Connlog.count({
        ts: {
            '$gte': startDate,
            '$lte': endDate
        }
    }, function (err, c) {
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        }
        res.json({
            error: false,
            message: "top originator of dns logs logs from " + startDate + " until " + endDate + " retrieved successfully",
            data: c
        });
    });
};

/*start protokol*/
exports.getProtokol = function (req, res) {
    var startDate = moment(req.params.start + "T"+req.params.jam.substring(0,2)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T"+req.params.jam.substring(2,4)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Connlog.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
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
        },
        { $sort : { value : -1 } },
        { $limit : 10 }
    ], function (err, result) {
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        }
        res.json({
            error: false,
            message: "top protokol of Conn logs from " + startDate + " until " + endDate + "retrieved successfully",
            data: result
        });
    });
};

/*end protokol*/
/*start top originator*/
exports.getTopOrigin = function (req, res) {
    var startDate = moment(req.params.start + "T"+req.params.jam.substring(0,2)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T"+req.params.jam.substring(2,4)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00
    var detail = req.params.detail;
    
    queryDetailOrig = [{
        $match: {
                ts: {
                        "$gte": new Date(startDate),
                        "$lte": new Date(endDate)
                    }
                }
            }, {
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
            },
            { $sort : { value : -1 } }    
    ];
    querytopOrig = [{
        $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
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
        },
        { $sort : { value : -1 } },
        { $limit : 10 }        
    ];    
    if(req.params.detail == "true"){
        Connlog.aggregate(querytopOrig, function(err, result){
            if (err) {
                res.json({
                    error: true,
                    message: err,
                });
            }
            res.json({
                error: false,
                message: "top protokol of Conn logs from " + startDate + " until " + endDate + "retrieved successfully",
                data: result
            })
        });
    }
    if(req.params.detail == "false"){
        Connlog.aggregate(queryDetailOrig, function(err, result){
            if (err) {
                res.json({
                    error: true,
                    message: err,
                });
            }
            res.json({
                error: false,
                message: "top protokol of Conn logs from " + startDate + " until " + endDate + "retrieved successfully",
                data: result
            })
        });
    }
    
};

/*end top originator*/

/*start top resp*/
exports.getTopResp = function (req, res) {
    var startDate = moment(req.params.start + "T"+req.params.jam.substring(0,2)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T"+req.params.jam.substring(2,4)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00
    var queryDetailResp = [{
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
        },
        { $sort : { value : -1 } },
    ];
    var queryTopDetail = [{
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
        },
        { $sort : { value : -1 } },
        { $limit : 10 }
    ]

    if(req.params.detail == "true"){
        Connlog.aggregate(queryTopDetail, function(err, result){
            if (err) {
                res.json({
                    error: true,
                    message: err,
                });
            }
            res.json({
                error: false,
                message: "top protokol of Conn logs from " + startDate + " until " + endDate + "retrieved successfully",
                data: result
            })
        });
    }
    if(req.params.detail == "false"){
        Connlog.aggregate(queryDetailResp, function(err, result){
            if (err) {
                res.json({
                    error: true,
                    message: err,
                });
            }
            res.json({
                error: false,
                message: "top protokol of Conn logs from " + startDate + " until " + endDate + "retrieved successfully",
                data: result
            })
        });
    }    
};
/*end top resp*/

// count data
exports.gettotal = function (req, res) {
    var startDate = moment(req.params.start + "T"+req.params.jam.substring(0,2)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var endDate = moment(req.params.end + "T"+req.params.jam.substring(2,4)+":00:00").utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

    Connlog.aggregate([{
            $match: {
                ts: {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
            $group: {
                _id: null,
                total: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ], function (err, count) {
        if (err)
            res.send(err);

        res.json({
            error: false,
            message: 'Total baris data from ' + startDate + " until " + endDate,
            data: count
        });
    })
}


/** 
 * Additional
 * **/
// Handle view Classification info
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

// Handle delete Connection log data
exports.delete = function (req, res) {
    Connlog.remove({
        uid: req.params.uid
    }, function (err, connlog) {
        if (err)
            res.send(err);

        res.json({
            error: false,
            message: 'connlog deleted'
        });
    });
};