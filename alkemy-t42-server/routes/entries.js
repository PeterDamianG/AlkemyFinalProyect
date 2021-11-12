const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/checkAdmin');
const { getNews, getNewsDetail, putNew, deleteNew, postNew } = require('../controllers/EntriesController');
const validateEntry = require('../validations/EntriesValidation');

router.get('/', getNews);
router.get('/:id', getNewsDetail);
router.post('/', [verifyToken, checkAdmin, validateEntry], postNew);
router.put('/:id', [verifyToken, checkAdmin, validateEntry], putNew);
router.delete('/:id', [verifyToken, checkAdmin], deleteNew );

module.exports = router;
