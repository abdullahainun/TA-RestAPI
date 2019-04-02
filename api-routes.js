// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API its Working',
        message: 'Welcome To Bro API!',
    });
});

// Import controller
// var contactController = require('./contactController');
var dnslogController = require('./controllers/dnslogController');
var connlogController = require('./controllers/connlogController');
var intellogController = require('./controllers/intellogController');
var classificationController = require('./controllers/classificationController');

// Contact routes
// router.route('/contacts')
//     .get(contactController.index)
//     .post(contactController.new);

// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);

// DNS logs
router.route('/dnslogs')
    .get(dnslogController.index);
router.route('/dnslog/:uid')
    .get(dnslogController.byuid)
    .delete(dnslogController.delete);
router.route('/dnslog/:start/:end')
    .get(dnslogController.bydaterange)

router.route('/dnslogs/queries')
    .get(dnslogController.getQuery);
router.route('/dnslogs/rcodes')
    .get(dnslogController.getRcode);
router.route('/dnslogs/qclases')
    .get(dnslogController.getQclass);
// connection log
router.route('/connlogs')
    .get(connlogController.index)
    .post(connlogController.new);

router.route('/connlogs/getallcount')
    .get(connlogController.getAllCount);

router.route('/connlogs/getmaliciouscount')
    .get(connlogController.getMaliciousCount);
router.route('/connlogs/getnormalcount')
    .get(connlogController.getNormalCount);
//  top result field
router.route('/connlogs/getprotokol')
    .get(connlogController.getProtokol);
router.route('/connlogs/gettoporigin')
    .get(connlogController.getTopOrigin);
router.route('/connlogs/gettopresp')
    .get(connlogController.getTopResp);
router.route('/connlogs/gettoplabel')
    .get(connlogController.getTopLabel);

router.route('/connlog/:uid')
    .get(connlogController.view)
    .delete(connlogController.delete);

// Intel Logs
router.route('/intellogs')
    .get(intellogController.index);

router.route('/intellog/:uid')
    .get(intellogController.view)
    .delete(intellogController.delete);

// classification 
router.route('/classifications')
    .get(classificationController.index)
    .post(classificationController.new);
router.route('/classification/:uid')
    .get(classificationController.view)
    .delete(classificationController.delete);

// Export API routes
module.exports = router;