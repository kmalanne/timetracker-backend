const Joi = require('joi');

module.exports = {
  create: {
    body: {
      project: Joi.number().integer().max(999999999).required(),
      elapsed_time: Joi.number().integer().max(999999999).required(),
    },
  },

  delete: {
    params: {
      id: Joi.number().integer().max(999999999).required(),
    },
  },
};
