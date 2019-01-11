var mongoose = require("mongoose");

// Setup schema
var connlogSchema = mongoose.Schema({
    ts: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    id_orig_h: {
        type: String,
        required: true
    },
    id_orig_p: {
        type: String,
        required: true
    },
    id_resp_h: {
        type: String,
        required: true
    },
    id_resp_p: {
        type: String,
        required: true
    },
    proto: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    orig_bytes: {
        type: String,
        required: true
    },
    resp_bytes: {
        type: String,
        required: true
    },
    conn_state: {
        type: String,
        required: true
    },
    local_orig: {
        type: String,
        required: true
    },
    local_resp: {
        type: String,
        required: true
    },
    missed_bytes: {
        type: String,
        required: true
    },
    history: {
        type: String,
        required: true
    },
    orig_pkts: {
        type: String,
        required: true
    },
    orig_ip_bytes: {
        type: String,
        required: true
    },
    resp_pkts: {
        type: String,
        required: true
    },
    resp_ip_bytes: {
        type: String,
        required: true
    },
    PX: {
        type: String,
        required: true
    },
    NNP: {
        type: String,
        required: true
    },
    NSP: {
        type: String,
        required: true
    },
    PSP: {
        type: String,
        required: true
    },
    IOPR: {
        type: String,
        required: true
    },
    Reconnect: {
        type: String,
        required: true
    },
    FPS: {
        type: String,
        required: true
    },
    TBT: {
        type: String,
        required: true
    },
    APL: {
        type: String,
        required: true
    },
    PPS: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

// Export Contact model
var Connlog = (module.exports = mongoose.model("connlog", connlogSchema));

module.exports.get = function (callback, limit) {
    Connlog.find(callback).limit(limit);
};