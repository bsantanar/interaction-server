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
      projects: Joi.array().items(Joi.string()).optional(),
  }),
  publication: Joi.object().keys({
    title: Joi.string().required(),
    year: Joi.number().required().min(1800).max(2200),
    author: Joi.string().required().min(1),
    editorial: Joi.string().optional().allow(''),
    category: Joi.array().items(Joi.string()).required(),
    description: Joi.string().optional().min(3),
    projectId: Joi.array().items(Joi.string()),
    doi: Joi.string().optional().uri().allow('')
  }),
  member: Joi.object().keys({
    fullName: Joi.string().required(),
    degree: Joi.string().min(2),
    projectsIds: Joi.array().items(Joi.string()).optional(),
    image: Joi.string().optional(),
    active: Joi.boolean().required(),
    contributionDate: Joi.date().required(),
    description: Joi.string().optional().allow(''),
    link: Joi.string().optional().allow(''),
    email: Joi.string().email().optional().allow(''),
    category: Joi.array().items(Joi.string()).required(),
  }),
  project: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required().min(2),
    link: Joi.string().uri().required(),
    yearInit: Joi.number().required().min(1800).max(2200),
    yearEnd: Joi.number().optional().min(1800).max(2200).allow(null),
    image: Joi.string().optional(),
    personalPage: Joi.boolean().optional().default(false)
  }),
  activity: Joi.object().keys({
    title: Joi.string().required(),
    date: Joi.date().required(),
    description: Joi.string().required(),
    category: Joi.array().items(Joi.string()).required(),
    projectId: Joi.array().items(Joi.string()).optional(),
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
    description: Joi.string().required(),
    version: Joi.number().optional(),
    tags: Joi.array().items(Joi.string()).required(),
    publications: Joi.array().items(Joi.string()).required(),
    link: Joi.string().optional().allow(''),
    permission: Joi.boolean().optional()
  }),
  category: Joi.object().keys({
    name: Joi.string().required(),
    section: Joi.string().valid(...CONSTANTS.CATEGORIES_SECTIONS),
    priority: Joi.number().min(1).default(1).optional()
  }),
  requestDataset: Joi.object().keys({
    fullName: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    datasetName: Joi.string().required(),
    datasetVersion: Joi.number().required()
  })
};

module.exports = schemas;