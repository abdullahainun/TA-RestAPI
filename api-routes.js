// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API its Working',
        message: 'Welcome To Bro API!',
    });
});

// Import contact controller
// var contactController = require('./contactController');
var dnslogController = require('./dnslogController');
var connlogController = require('./connlogController');

// Contact routes
// router.route('/contacts')
//     .get(contactController.index)
//     .post(contactController.new);

// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);

router.route('/dnslogs')
    .get(dnslogController.index);

router.route('/dnslog/:uid')
    .get(dnslogController.view)
    .delete(dnslogController.delete);

// connection log
router.route('/connlogs')
    .get(connlogController.index)
    .post(connlogController.new);

router.route('/connlog/:uid')
    .get(connlogController.view)
    .delete(connlogController.delete);

// Export API routes
module.exports = router;