const knex = require('../db');
const parseNumber = require('../utils/parseNumber');

const User = require('./user');

const table = 'project';

// Project
const Project = {
  async getProjects(userId) {
    const user = await User.getUser(userId);

    const projects = await knex.select('*')
      .from(table)
      .where('user', user.id)
      .orderBy('id', 'asc');

    return projects;
  },

  async getProjectById(id) {
    const project = await knex.select('*')
      .from(table)
      .where('id', parseNumber(id));

    return project;
  },

  async createProject(options, userId) {
    const user = await User.getUser(userId);

    const { name, url } = options;
    const newProject = {
      name,
      url,
      user: user.id,
    };

    const inserted = await knex(table)
      .insert(newProject, 'id');

    return inserted;
  },

  async updateProject(id, options, userId) {
    const user = await User.getUser(userId);

    const { name, url } = options;

    const updatedId = await knex(table)
      .where({
        id: parseNumber(id),
        user: user.id,
      })
      .update({
        name,
        url,
      });

    return updatedId;
  },

  async deleteProject(id, userId) {
    const user = await User.getUser(userId);

    await knex(table)
      .where({
        id: parseNumber(id),
        user: user.id,
      })
      .del();

    return id;
  },
};

module.exports = Project;
