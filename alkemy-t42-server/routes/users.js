const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = require('./../middlewares/checkAdmin');

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser
} = require('../controllers/UsersController');

router.get('/me', [verifyToken], getCurrentUser);
router.put('/me', [verifyToken], updateCurrentUser);
router.delete('/me', [verifyToken], deleteCurrentUser);

router.get('/', [verifyToken, checkAdmin], getAllUsers);
router.get('/:id', [verifyToken, checkAdmin], getUser);
router.put('/:id', [verifyToken, checkAdmin], updateUser);
router.delete('/:id', [verifyToken, checkAdmin], deleteUser);

module.exports = router;
