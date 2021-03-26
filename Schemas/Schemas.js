const Joi = require('joi');
const CONSTANTS = require('../Config/Constants');

const schemas = {
  delete: Joi.object().min(1),
  update: Joi.object().keys({
    condition: Joi.object().required(),
    data: Joi.object().required().min(1)
  }),
  user: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      userType: Joi.number().required(),
      projects: Joi.array().items(Joi.string()).required(),
  }),
  publication: Joi.object().keys({
    title: Joi.string().required(),
    year: Joi.number().required().min(1800).max(2200),
    author: Joi.string().required().min(1),
    editorial: Joi.string().optional().allow(''),
    category: Joi.string().required(),
    description: Joi.string().optional().min(3),
    projectId: Joi.array().items(Joi.string()).required(),
    doi: Joi.string().optional().uri().allow('')
  }),
  member: Joi.object().keys({
    fullName: Joi.string().required(),
    degree: Joi.string().min(2),
    projectsIds: Joi.array().items(Joi.string()).required(),
    image: Joi.string().optional(),
    active: Joi.boolean().required(),
    contributionDate: Joi.date().required(),
    description: Joi.string().optional().allow(''),
    link: Joi.string().optional().allow(''),
    email: Joi.string().email().required(),
    category: Joi.string().required()
  }),
  project: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required().min(2),
    link: Joi.string().uri().required(),
    image: Joi.string().optional()
  }),
  activity: Joi.object().keys({
    title: Joi.string().required(),
    date: Joi.date().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    projectId: Joi.string().required(),
    image: Joi.string().optional(),
    link: Joi.string().optional().empty('')
  }),
  resource: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    projectId: Joi.string().required(),
    url: Joi.string().required(),
    image: Joi.string().optional()
  }),
  tool: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
  }),
  dataset: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
  }),
  category: Joi.object().keys({
    name: Joi.string().required(),
    section: Joi.string().valid(...CONSTANTS.CATEGORIES_SECTIONS)
  })
};

module.exports = schemas;