const express = require('express');

const {
  getDatas,
  postDatas,
  getDatasLatest,
  deleteProduct,
  getDatasById,
  updateDatas,
  likeDatas,
  toggleLikeDatas,
} = require('../Controllers/data-controller');

const router = express.Router();

router.get('/', getDatas);
router.get('/New', getDatasLatest);
router.post('/', postDatas);
router.delete('/:id', deleteProduct);
router.get('/:id', getDatasById);
router.patch('/:id', updateDatas);
router.post('/Datas/:id/like', likeDatas);
// OR toggle like
router.post('/Datas/:id/toggle-like', toggleLikeDatas);

module.exports = router;
