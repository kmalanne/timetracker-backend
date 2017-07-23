const knex = require('../db');
const parseId = require('../utils/parseId');

const table = 'project';

// Project
const Project = {
  async getProjects() {
    const rows = await knex.select('*')
      .from(table)
      .orderBy('id', 'asc');

    return rows;
  },

  async getProjectById(id) {
    const rows = await knex.select('*')
      .from(table)
      .where('id', parseId(id));

    return rows;
  },

  async createProject(project) {
    const rows = await knex(table)
      .insert(project, 'id');

    return rows;
  },

  async updateProject(id, updates) {
    const rows = await knex(table)
      .where('id', parseId(id))
      .update(updates);

    return rows;
  },

  async deleteProject(id) {
    return knex(table)
      .where('id', parseId(id))
      .del();
  },
};

module.exports = Project;
