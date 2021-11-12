const express = require('express');
const router = express.Router();
const { createTestimonial, putTestimonial, getTestimonials, getTestimony, deleteTestimonial } = require('../controllers/TestimonialsController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/checkAdmin');
const validateTestimonial = require('../validations/TetimonialValidation');

router.get('/', verifyToken, getTestimonials);
router.get('/:id', verifyToken, getTestimony);
router.post('/', validateTestimonial, createTestimonial);
router.put('/:id', [verifyToken, checkAdmin], putTestimonial);
router.delete('/:id', [verifyToken, checkAdmin], deleteTestimonial);

module.exports = router;
