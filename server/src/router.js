const router = require('express').Router();
const controller = require('./controller');

router.get('/business', controller.business.get);

module.exports = router;
