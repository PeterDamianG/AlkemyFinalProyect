const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = require('./../middlewares/checkAdmin');
const router = express.Router();
const {
  getPublicData,
  editPublicData
} = require('../controllers/PublicDataController');

router.get('/', getPublicData);
router.put('/', [verifyToken, checkAdmin], editPublicData);

module.exports = router;
