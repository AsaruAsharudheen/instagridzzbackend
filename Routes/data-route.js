const express = require('express');

const {
  getDatas,
  postDatas,
  getDatasLatest,
  deleteProduct,
  getDatasById,
  updateDatas,
} = require('../Controllers/data-controller');

const router = express.Router();

router.get('/', getDatas);
router.get('/New', getDatasLatest);
router.post('/', postDatas);
router.delete('/:id', deleteProduct);
router.get('/:id', getDatasById);
router.patch('/:id', updateDatas);

module.exports = router;


