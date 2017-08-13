const Joi = require('joi');

module.exports = {
  create: {
    body: {
      project: Joi.number().integer().max(999999999).required(),
      elapsed_time: Joi.number().integer().max(999999999).required(),
      start_time: Joi.date().iso(),
      stop_time: Joi.date().iso(),
    },
  },

  delete: {
    params: {
      id: Joi.number().integer().max(999999999).required(),
    },
  },

  get: {
    query: {
      page: Joi.number().integer().max(9999).required(),
      limit: Joi.number().integer().max(100).required(),
    },
  },
};
