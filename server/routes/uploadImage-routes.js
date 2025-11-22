const express = require('express');
const router = express.Router();
const uploadImage = require('../controllers/uploadImage-controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');


router.post("/upload", auth, upload.single("image"),  uploadImage);


module.exports = router;