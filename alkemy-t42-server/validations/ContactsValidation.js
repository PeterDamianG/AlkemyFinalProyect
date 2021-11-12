const Joi = require('joi');
const log = require('../utils/logger');

const blueprintContact = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).max(2048).required()
});

const validateContact = (req,res,next) => {
    const result = blueprintContact.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Contact have body errors: [${result.error.message}]`);
        res.status(422).json({error: result.error.message});
    }
}

module.exports = validateContact