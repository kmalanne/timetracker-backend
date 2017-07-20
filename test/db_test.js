/* eslint-disable */
const chai = require('chai');
const knex = require('../src/db/db');
const Project = require('../src/db/models/project');
const TimeEntry = require('../src/db/models/time_entry');
const User = require('../src/db/models/user');

const should = chai.should();

describe('DB', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done());
  });

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(() => done());
  });

  describe('Project', () => {
    it('should return all projects', async () => {
      const result = await Project.getProjects();
      result.should.be.a('array');
      result.length.should.equal(3);
      result[1].should.be.a('object');
      result[1].should.have.property('id');
      result[1].should.have.property('user');
      result[1].should.have.property('name');
      result[1].should.have.property('url');
    });

    it('should return a single project with id', async () => {
      const result = await Project.getProjectById(1);
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('id');
      result[0].id.should.equal(1);
      result[0].should.have.property('user');
      result[0].user.should.equal(1);
      result[0].should.have.property('name');
      result[0].name.should.equal('project_name');
      result[0].should.have.property('url');
      result[0].url.should.equal('http://www.url.com');
    });

    it('should add a project', async () => {
      const newProject = {
        id: 4,
        user: 1,
        name: 'test_project',
        url: 'http://test.fi',
      };

      const id = await Project.createProject(newProject);
      const result = await Project.getProjectById(id);
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('id');
      result[0].id.should.equal(4);
      result[0].should.have.property('user');
      result[0].user.should.equal(1);
      result[0].should.have.property('name');
      result[0].name.should.equal('test_project');
      result[0].should.have.property('url');
      result[0].url.should.equal('http://test.fi');
    });

    it('should update a project', async () => {
      const update = {
        name: 'new_name',
        url: 'http://new_url.se',
      };

      await Project.updateProject(1, update);
      const result = await Project.getProjectById(1);
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('id');
      result[0].id.should.equal(1);
      result[0].should.have.property('user');
      result[0].user.should.equal(1);
      result[0].should.have.property('name');
      result[0].name.should.equal('new_name');
      result[0].should.have.property('url');
      result[0].url.should.equal('http://new_url.se');
    });

    it('should delete a single project', async () => {
      await Project.deleteProject(1);
      const result = await Project.getProjects();
      result.should.be.a('array')
      result.length.should.equal(2);
    });
  });

  describe('User', () => {
    it('should return a single user with id', async () => {
      const result = await User.getUserById(1);
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('name');
      result[0].name.should.equal('Testy McTestface');
      result[0].should.have.property('email');
      result[0].email.should.equal('test@test.com');
    });

    it('should return a single user with email and user id', async () => {
      const result = await User.getUser({
        user_id: 'id12345',
        email: 'test@test.com',
      });
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('name');
      result[0].name.should.equal('Testy McTestface');
      result[0].should.have.property('email');
      result[0].email.should.equal('test@test.com');
      result[0].should.have.property('user_id');
      result[0].user_id.should.equal('id12345');
    });

    it('should add a user', async () => {
      const newUser = {
        id: 2,
        user_id: 'id54321',
        email: 'jorma@maansiirtofirma.fi',
        name: 'Jorma Teras',
      };

      const id = await User.createUser(newUser);
      const result = await User.getUserById(id);
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('name');
      result[0].name.should.equal('Jorma Teras');
      result[0].should.have.property('email');
      result[0].email.should.equal('jorma@maansiirtofirma.fi');
      result[0].should.have.property('user_id');
      result[0].user_id.should.equal('id54321');
    });
  });

  describe('TimeEntry', () => {
    it('should return all time entries', async () => {
      const result = await TimeEntry.getTimeEntries();
      result.should.be.a('array');
      result.length.should.equal(3);
      result[1].should.be.a('object');
      result[1].should.have.property('id');
      result[1].should.have.property('project');
      result[1].should.have.property('user');
      result[1].should.have.property('elapsed_time');
    });

    it('should return a single TimeEntry with id', async () => {
      const result = await TimeEntry.getTimeEntryById(1);
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('id');
      result[0].id.should.equal(1);
      result[0].should.have.property('project');
      result[0].should.have.property('user');
      result[0].should.have.property('elapsed_time');
    });

    it('should add a time entry', async () => {
      const newTimeEntry = {
        id: 4,
        project: 1,
        user: 1,
        elapsed_time: 3600
      };

      const id = await TimeEntry.createTimeEntry(newTimeEntry);
      const result = await TimeEntry.getTimeEntryById(id);
      result.should.be.a('array')
      result.length.should.equal(1);
      result[0].should.be.a('object');
      result[0].should.have.property('id');
      result[0].id.should.equal(4);
      result[0].should.have.property('project');
      result[0].should.have.property('user');
      result[0].should.have.property('elapsed_time');
    });

    it('should delete a single time entry', async () => {
      await TimeEntry.deleteTimeEntry(1)
      const result = await TimeEntry.getTimeEntries();
      result.should.be.a('array')
      result.length.should.equal(2);
    });
  });
});
/* eslint-enable */
