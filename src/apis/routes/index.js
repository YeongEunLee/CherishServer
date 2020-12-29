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
router.get('/user/:id', (req, res) => {
  res.json(req.params.id);
});

module.exports = router;
