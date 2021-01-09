const express = require('express');

const router = express.Router();

/**
 * @api {get} /user/:id API Docs 예시
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.use('/cherish', require('./cherish'));

router.use('/water', require('./water'));

router.use('/login', require('./login'));

router.use('/postpone', require('./postpone'));

router.use('/user', require('./user'));

module.exports = router;
