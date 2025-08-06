const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No video uploaded' });
  }

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'your_folder',
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Cloudinary upload failed', error: error.message });
        }
        return res.status(200).json({ url: result.secure_url });
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cloudinary video upload failed', error: error.message });
  }
});

module.exports = router;
