const router = require('express').Router();
const controller = require('./controller');

router.get('/business/:businessId', controller.business.get);
router.post('/business', controller.business.search);
router.post('/business/:businessId', controller.business.post);

router.get('/service/:businessId', controller.service.get);
router.delete('/service/:businessId/:_id', controller.service.delete);
router.post('/service', controller.service.post);

router.get('/appt/:businessId', controller.appt.get);
router.post('/appt', controller.appt.post);

router.get('/dashboard/:businessId', controller.appt.getDash);

router.post('/create-payment-intent', controller.stripe.post);

module.exports = router;
