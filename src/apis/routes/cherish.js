const express = require('express');

const router = express.Router();

const plantController = require('../../controller/plantController');
/**
 * @api {post} /cherish
 * @apiName createPlant
 * @apiGroup Cherish
 */

router.post('/', plantController.createPlant);



module.exports = router;
