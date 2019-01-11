var mongoose = require('mongoose');

// Setup schema
var intellogSchema = mongoose.Schema({
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
    seen_indicator: {
        type: String,
        required:true
    },
    seen_indicator_type: {
        type: String,
        required:true
    },
    seen_where: {
        type: String,
        required:true
    },
    seen_node: {
        type: String,
        required:true
    },
    matched: {
        type: String,
        required:true
    },
    sources: {
        type: String,
        required:true
    },
    fuid: {
        type: String,
        required:true
    },
    file_mime_type: {
        type: String,
        required:true
    },
    file_desc: {
        type: String,
        required:true
    }


});

// Export Contact model
var IntelLog = module.exports = mongoose.model('intellogs', intellogSchema);


module.exports.get = function (callback, limit) {
    IntelLog.find(callback).limit(limit);
}