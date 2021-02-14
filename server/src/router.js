const router = require('express').Router();
const controller = require('./controller');

router.post('/business', controller.business.post);
router.get('/service/:businessId', controller.service.get);
router.post('/appt', controller.appt.post);

module.exports = router;
