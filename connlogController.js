// Import contact model
Connlog = require('./connlogModel');

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
    });
};

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