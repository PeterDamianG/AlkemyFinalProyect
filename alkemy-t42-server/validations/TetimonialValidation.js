const Joi = require('joi');
const log = require('../utils/logger');

const blueprintTestimonial = Joi.object({
    name: Joi.string().required().min(3).max(20).messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre no puede tener más de 20 caracteres'
    }),
    image: Joi.string().required().min(3).max(255).messages({
        'string.min': 'La imagen debe tener al menos 3 caracteres',
        'string.max': 'La imagen no puede tener más de 255 caracteres'
    }),
    content: Joi.string().required().min(50).max(300).messages({
        'string.min': 'El contenido debe tener al menos 50 caracteres',
        'string.max': 'El contenido no puede tener más de 300 caracteres'
    })
});

const validateTestimonial = (req, res, next) => {
    const result = blueprintTestimonial.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Testimonial have body errors: [${result.error.message}]`);
        res.status(422).json({error: result.error.message})
    }
};

module.exports = validateTestimonial;