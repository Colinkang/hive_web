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
const basicInfoSchema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    username: Joi.string().required(),
    organizationId: Joi.number().required(),
    status: Joi.number().required(),
    firstTimeLogin: Joi.any(),
    code: Joi.string().required(),
});
const updatePasswordSchema = Joi.object().keys({
    userName: Joi.string().required(),
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
    mobile: Joi.string().required(),
    smsCode: Joi.string().required()
});


module.exports = {
    Validate,
    loginSchema,
    changeCodeSchema,
    basicInfoSchema,
    updatePasswordSchema
};