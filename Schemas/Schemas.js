const Joi = require('joi');
const schemas = {
  update: Joi.object().keys({
    condition: Joi.object().required(),
    data: Joi.object().required()
  }),
  user: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
  })
};
module.exports = schemas;