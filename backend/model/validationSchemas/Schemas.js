const Joi = require('@hapi/joi')

const  registerValidation =  (objToValidade) => {
   
   const schema = Joi.object({
        name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
        email: Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(objToValidade);
}

const loginValidation =  (objToValidade) => {
   
    const schema = Joi.object({
         email: Joi.string()
                 .min(6)
                 .required()
                 .email(),
         password: Joi.string()
                 .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
     });
 
     return schema.validate(objToValidade);
 }

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;