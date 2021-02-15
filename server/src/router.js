const router = require('express').Router();
const controller = require('./controller');

router.post('/business', controller.business.post);

router.get('/service/:businessId', controller.service.get);
router.post('/service', controller.service.post);

router.post('/appt', controller.appt.post);
router.get('/appt/:businessId', controller.appt.get);
router.get('/dashboard/:businessId', controller.appt.getDash);

router.post('/create-payment-intent', controller.stripe.post);

module.exports = router;
