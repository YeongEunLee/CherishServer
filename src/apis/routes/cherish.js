const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const plantController = require('../../controller/plantController');

/**
 * @api {put} /cherish
 * @apiName modifyCherish
 * @apiGroup Cherish
 */
router.put('/', plantController.modifyCherish);

/**
 * @api {post} /cherish
 * @apiName createPlant
 * @apiGroup Cherish
 */
router.post('/', plantController.createPlant);

/**
 * @api {delete} /cherish
 * @apiName deleteCherish
 * @apiGroup Cherish
 */
router.delete('/:id', plantController.deleteCherish);

/**
 * @api {get} /cherish
 * @apiName getCherishInfo
 * @apiGroup Cherish
 */
router.get(
  '/',
  [check('CherishId', 'CherishId is required').not().isEmpty()],
  plantController.getCherishInfo
);

/**
 * @api {get} /cherish/:id
 * @apiName getCherishList
 * @apiGroup Cherish
 */
router.get('/:id', [check('id', 'id is required').not().isEmpty()], plantController.getCherishList);
module.exports = router;
