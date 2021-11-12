const Joi = require('joi');
const log = require('../utils/logger');

const blueprintAuth = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const blueprintRegister = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const validateLogin = (req,res,next) => {
    const result = blueprintAuth.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Authentication have body errors: [${result.error.message}]`);
        res.status(422).json(result.error.message);
    }
}

const validateRegister = (req, res, next) => {
    const result = blueprintRegister.validate(req.body);
    if(!result.error){
        next();
    } else {
        log.warn(`Registration have body errors: [${result.error.message}]`);
        res.status(422).json(result.error.message);
    }
}

module.exports = {
    validateLogin,
    validateRegister
}