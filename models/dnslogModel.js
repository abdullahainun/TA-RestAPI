var mongoose = require('mongoose');

// Setup schema
var dnslogSchema = mongoose.Schema({
    ts: {
        type: Date,
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
        type: Number,
        required: true
    },
    id_resp_h: {
        type: String,
        required: true
    },
    id_resp_p: {
        type: Number,
        required: true
    },
    proto: String,
    trans_id: Number,
    query: String,
    rcode: Number,
    rcode_name: String,
    AA: Boolean,
    TC: Boolean,
    RD: Boolean,
    RA: Boolean,
    Z: Number,
    answers: String,
    TTLs: Number,
    rejected: Boolean

});

// Export Contact model
var Dns = module.exports = mongoose.model('dns', dnslogSchema);


module.exports.get = function (callback, limit) {
    Dns.find(callback).limit(limit);
}