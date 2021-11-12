const Joi = require('joi');
const log = require('../utils/logger');

const blueprintMember = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    image: Joi.string().required()
});

const validateMember = (req,res,next) => {
    const result = blueprintMember.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Member have body errors: [${result.error.message}]`);
        res.status(422).json({error: result.error.message});
    }
};

module.exports = validateMember;