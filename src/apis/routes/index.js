const express = require('express');

const router = express.Router();

router.use('/cherish', require('./cherish'));

router.use('/water', require('./water'));

router.use('/login', require('./login'));

router.use('/postpone', require('./postpone'));

router.use('/user', require('./user'));

module.exports = router;
