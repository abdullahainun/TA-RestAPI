var mongoose = require('mongoose');

// Setup schema
var classificationSchema = mongoose.Schema({
    ts: {
        type: Date,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    orig_h: {
        type: String,
        required: true
    },
    orig_p: {
        type: Number,
        required: true
    },
    resp_h: {
        type: String,
        required: true
    },
    resp_p: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});


// Export Classification model
var Classification = module.exports = mongoose.model('classifications', classificationSchema);

module.exports.get = function (callback, limit) {
    Classification.find(callback).limit(limit);
}