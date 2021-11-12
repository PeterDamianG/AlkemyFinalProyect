const express = require('express');
const router = express.Router();

const upload = require('../middlewares/manageFiles');
const {postImage, getImage, deleteImage} = require('../controllers/ImagesController');

const verifyToken = require('../middlewares/verifyToken');

//METER VERIFY TOKEN ANTES DE SUBIR A BITBUCKET
router.post('/', verifyToken, upload,  postImage);
router.get('/:id', verifyToken, getImage);
router.delete('/:id', verifyToken, deleteImage);

module.exports = router;