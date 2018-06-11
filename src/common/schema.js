const Joi = require('joi');

const Validate = function (input, schema) {
    const { error } = Joi.validate(input, schema);
    return error;
}
const loginSchema = Joi.object().keys({
    account: Joi.string().required(),
    password: Joi.string().required()
});
const changeCodeSchema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    mobile: Joi.string().required(),
    smsCode: Joi.string().required()
});



module.exports = {
    Validate,
    loginSchema,
    changeCodeSchema
};