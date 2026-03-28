const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume, getResume } = require('../controllers/resumeController');
const auth = require('../middlewares/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', auth, upload.single('resume'), uploadResume);
router.get('/:id', auth, getResume);

module.exports = router;
