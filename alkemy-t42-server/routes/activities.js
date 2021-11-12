const express = require('express');
const router = express.Router();
const {
  getAllActivities,
  editActivity,
  getOneActivity,
  deleteActivity,
  createActivity
} = require('../controllers/ActivitiesController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/checkAdmin');
const validateActivity = require('../validations/ActivitiesValidation');

router.get('/', getAllActivities);
router.get('/:id', getOneActivity);
router.put('/:id', [verifyToken, checkAdmin, validateActivity], editActivity);
router.post('/', [verifyToken, checkAdmin, validateActivity], createActivity);
router.delete('/:id', [verifyToken, checkAdmin], deleteActivity);

module.exports = router;
