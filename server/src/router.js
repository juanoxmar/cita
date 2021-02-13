const router = require('express').Router();
const controller = require('./controller');

router.get('/business', controller.business.get);
router.get('/service/:businessId', controller.service.get);

module.exports = router;
