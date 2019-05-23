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
var classificationController = require('./controllers/classificationController');

/** DNS logs*/
// router.route('/dnslogs')
//     .get(dnslogController.index);
router.route('/dnslog/:uid')
    .get(dnslogController.byuid)
    .delete(dnslogController.delete);
router.route('/dnslog/:start/:end/:jam')
    .get(dnslogController.bydaterange)
router.route('/dnslogtotal/:start/:end')
    .get(dnslogController.gettotal);
router.route('/dnslogorigh/:start/:end')
    .get(dnslogController.getTopOrigin);
router.route('/dnslogresph/:start/:end')
    .get(dnslogController.getTopResp);
router.route('/dnslogqueries/:start/:end')
    .get(dnslogController.getQuery);
router.route('/dnslogrcodes/:start/:end')
    .get(dnslogController.getRcode);

// dns log kurang modifikasi select by date range

/** connection log **/
// router.route('/connlogs')
//     .get(connlogController.index)
router.route('/connlogallcount/:start/:end')
    .get(connlogController.getAllCount);
router.route('/connlogprotokol/:start/:end')
    .get(connlogController.getProtokol);
router.route('/connlogtoporigin/:start/:end')
    .get(connlogController.getTopOrigin);
router.route('/connlogtopresp/:start/:end')
    .get(connlogController.getTopResp);
router.route('/connlogtotal/:start/:end')
    .get(connlogController.gettotal);
router.route('/connlog/:uid')
    .get(connlogController.view)
    .delete(connlogController.delete);

/** classification  **/
router.route('/classifications')
    .get(classificationController.index);
router.route('/klasifikasimalicious/:start/:end')
    .get(classificationController.malicious);
router.route('/klasifikasinormal/:start/:end')
    .get(classificationController.normal);
router.route('/classification/getmaliciouscount/:start/:end')
    .get(classificationController.getMaliciousCount);
router.route('/classification/getnormalcount/:start/:end')
    .get(classificationController.getNormalCount);
router.route('/classification/totalmalicious')
    .get(classificationController.totalMalicious);
router.route('/classification/totalnormal')
    .get(classificationController.totalNormal);    
router.route('/classification/testjoin')
    .get(classificationController.testJoin);
router.route('/classification/klasifikasicount/:start/:end')
    .get(classificationController.klasifikasicount);
router.route('/classification/gettopresp/:start/:end')
    .get(classificationController.getTopResp);
// Export API routes
module.exports = router;