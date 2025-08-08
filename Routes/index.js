const express = require('express');

const DatasRoutes = require('./data-route');
const imageRoutes = require('./image-route');
const adminRoutes = require('./admin-route');
const videoRoutes = require('./video-route');
const fundRoutes = require('./fund-routes');

const router = express.Router();

router.use('/Datas', DatasRoutes);
router.use('/upload', imageRoutes);
router.use('/admin', adminRoutes);
router.use('/uploadVideo', videoRoutes);
router.use('/funds', fundRoutes);

module.exports = router;
