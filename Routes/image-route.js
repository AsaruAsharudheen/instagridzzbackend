const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const uniqid = require('uniqid');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.array('images', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No images uploaded' });
  }

  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'your_folder', // ✅ update folder name
            public_id: uniqid(),
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary error:', error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        stream.end(file.buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);

    res.status(200).json({ urls });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Cloudinary upload failed', error: error.message });
  }
});

module.exports = router;
