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
    description: Joi.string().optional().min(3),
    projectId: Joi.string().required()
  }),
  member: Joi.object().keys({
    fullName: Joi.string().required().min(2),
    degree: Joi.string().min(2),
    birthdate: Joi.date().required(),
    projectsIds: Joi.array().items(Joi.string()).required().min(1),
    image: Joi.string().optional()
  }),
  project: Joi.object().keys({
    name: Joi.string().required().min(2),
    description: Joi.string().required().min(2)
  }),
  activity: Joi.object().keys({
    title: Joi.string().required().min(5),
    date: Joi.date().required(),
    description: Joi.string().required(),
    projectId: Joi.string().required(),
    image: Joi.string().optional()
  }),
  resource: Joi.object().keys({
    title: Joi.string().required().min(5),
    description: Joi.string().required(),
    projectId: Joi.string().required(),
    url: Joi.string().required(),
    image: Joi.string().optional()
  })
};

module.exports = schemas;