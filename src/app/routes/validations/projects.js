const Joi = require('joi');

module.exports = {
  create: {
    body: {
      name: Joi.string(),
      url: Joi.string(),
    },
  },

  get: {
    params: {
      id: Joi.number().integer().max(999999999).required(),
    },
  },

  update: {
    params: {
      id: Joi.number().integer().max(999999999).required(),
    },
    body: {
      name: Joi.string(),
      url: Joi.string(),
    },
  },

  delete: {
    params: {
      id: Joi.number().integer().max(999999999).required(),
    },
  },
};
