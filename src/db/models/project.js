const knex = require('../db');
const parseId = require('../utils/parseId');

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
    const rows = await knex.select('*')
      .from(table)
      .where('id', parseId(id));

    return rows;
  },

  async createProject(params, userId) {
    const user = await User.getUser(userId);

    const newProject = {
      name: params.name,
      url: params.url,
      user: user.id,
    };

    const project = await knex(table)
      .insert(newProject, 'id');

    return project;
  },

  async updateProject(id, params, userId) {
    const user = await User.getUser(userId);

    const updated = await knex(table)
      .where({
        id: parseId(id),
        user: user.id,
      })
      .update({
        name: params.name,
        url: params.url,
      });

    return updated;
  },

  async deleteProject(id, userId) {
    const user = await User.getUser(userId);

    await knex(table)
      .where({
        id: parseId(id),
        user: user.id,
      })
      .del();

    return id;
  },
};

module.exports = Project;
