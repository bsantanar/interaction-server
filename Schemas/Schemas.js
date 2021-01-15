const Joi = require('joi');

const schemas = {
  update: Joi.object().keys({
    condition: Joi.object().required().min(1),
    data: Joi.object().required().min(1)
  }),
  user: Joi.object().keys({
      name: Joi.string().required().min(1),
      email: Joi.string().email().required().min(5),
      password: Joi.string().required().min(5)
  }),
  publication: Joi.object().keys({
    title: Joi.string().required(),
    year: Joi.number().required().min(1800).max(2200),
    author: Joi.string().required().min(1),
    description: Joi.string().optional().min(3)
  }),
  member: Joi.object().keys({
    name: Joi.string().required().min(2),
    lastname: Joi.string().required().min(2),
    description: Joi.string().min(5),
    degree: Joi.string().min(2)
  }),
  project: Joi.object().keys({
    projectName: Joi.string().required().min(2),
    description: Joi.string().required().min(2)
  })
};

module.exports = schemas;