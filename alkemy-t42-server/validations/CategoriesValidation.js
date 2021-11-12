const Joi = require('joi');
const log = require('../utils/logger');

const blueprintCategory = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.min' : 'The name must be at least 2 characters long' 
    }),
    description: Joi.string().min(10).max(2048).required().messages({
        'string.min' : 'Description must be at least 10 characters long',
        'string.max' : 'Description cannot be longer than 2048 characters'
    })
});

const validateCategory = (req,res,next) => {
    const result = blueprintCategory.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Category have body errors: [${result.error.message}]`);
        res.status(422).json({error: result.error.message});
    }
}

module.exports = validateCategory