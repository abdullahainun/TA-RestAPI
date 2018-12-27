var mongoose = require('mongoose');

// Setup schema
var contactSchema = mongoose.Schema({
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
var Contact = module.exports = mongoose.model('dnslog', contactSchema);


module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}