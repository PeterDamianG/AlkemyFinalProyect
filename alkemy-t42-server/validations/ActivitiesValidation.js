const Joi = require('joi');
const log = require('../utils/logger');

const blueprintActivity = Joi.object({
    name: Joi.string().min(4).max(30).required().messages({
        'string.min': 'The name must be at least 4 characters long',
        'string.max': 'The name cannot be longer than 20 characters'
    }),
    content: Joi.string().min(15).max(1000).required().messages({
        'string.min': 'The content must be at least 15 characters long',
        'string.max': 'The content cannot be longer than 1000 characters'
    }),
    image: Joi.string().optional()
})

const validateActivity = (req,res,next) => {
    const result = blueprintActivity.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Activity have body errors: [${result.error.message}]`);
        res.status(422).send(result.error.message);
    }
}

module.exports = validateActivity;