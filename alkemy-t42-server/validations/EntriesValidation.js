const Joi = require('joi');
const log = require('../utils/logger');

const blueprintEntry = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(20).max(2048).required(),
    image: Joi.string().required(),
    categoryId: Joi.number().required(),
    type: Joi.string().required()
});

const validateEntry = (req,res,next) => {
    const result = blueprintEntry.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Entry have body errors: [${result.error.message}]`);
        res.status(422).json({error: result.error.message});
    }
}

module.exports = validateEntry;