const knex = require('../db.js');

const table = 'project';

function parseId(id) {
  return parseInt(id, 10);
}

// Project
const Project = {
  getProjects() {
    return knex.select('*')
      .from(table)
      .orderBy('id', 'asc')
      .then(rows => Promise.resolve(rows));
  },

  getProjectById(id) {
    return knex.select('*')
      .from(table)
      .where('id', parseId(id))
      .then(rows => Promise.resolve(rows));
  },

  createProject(project) {
    return knex(table)
      .insert(project, 'id')
      .then(rows => Promise.resolve(rows));
  },

  updateProject(id, updates) {
    return knex(table)
      .where('id', parseId(id))
      .update(updates)
      .then(rows => Promise.resolve(rows));
  },

  deleteProject(id) {
    return knex(table)
      .where('id', parseId(id))
      .del();
  },
};

module.exports = Project;
