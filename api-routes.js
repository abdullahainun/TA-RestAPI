// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Bro log Monitor, it make with loce !',
    });
});

// Import contact controller
// var contactController = require('./contactController');
var contactController = require('./dnslogController');

// Contact routes
// router.route('/contacts')
//     .get(contactController.index)
//     .post(contactController.new);

// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);

router.route('/dnslogController')
    .get(dnslogController.index);

router.route('/contacts/:contact_id')
    .get(dnslogController.view)
    .delete(dnslogController.delete);


// Export API routes
module.exports = router;