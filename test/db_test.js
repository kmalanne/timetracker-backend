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
    it('should return all projects', (done) => {
      Project.getProjects()
        .then(result => {
          result.should.be.a('array');
          result.length.should.equal(3);
          result[1].should.be.a('object');
          result[1].should.have.property('id');
          result[1].should.have.property('name');
          result[1].should.have.property('url');
          done();
        });
    });

    it('should return a single project with id', (done) => {
      Project.getProjectById(1)
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('id');
          result[0].id.should.equal(1);
          result[0].should.have.property('name');
          result[0].name.should.equal('project_name');
          result[0].should.have.property('url');
          result[0].url.should.equal('http://www.url.com');
          done();
        });
    });

    it('should add a project', (done) => {
      const newProject = {
        id: 4,
        name: 'test_project',
        url: 'http://test.fi',
      };

      Project.createProject(newProject)
        .then(id => Project.getProjectById(id))
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('id');
          result[0].id.should.equal(4);
          result[0].should.have.property('name');
          result[0].name.should.equal('test_project');
          result[0].should.have.property('url');
          result[0].url.should.equal('http://test.fi');
          done();
        });
    });

    it('should update a project', (done) => {
      const update = {
        name: 'new_name',
        url: 'http://new_url.se',
      };

      Project.updateProject(1, update)
        .then(() => Project.getProjectById(1))
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('id');
          result[0].id.should.equal(1);
          result[0].should.have.property('name');
          result[0].name.should.equal('new_name');
          result[0].should.have.property('url');
          result[0].url.should.equal('http://new_url.se');
          done();
        });
    });

    it('should delete a single project', (done) => {
      Project.deleteProject(1)
        .then(() => Project.getProjects())
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(2);
          done();
        });
    });
  });

  describe('User', () => {
    it('should return a single user with id', (done) => {
      User.getUserById(1)
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('name');
          result[0].name.should.equal('Testy McTestface');
          result[0].should.have.property('email');
          result[0].email.should.equal('test@test.com');
          done();
        });
    });

    it('should return a single user with email and user id', (done) => {
      User.getUser({
        user_id: 'id12345',
        email: 'test@test.com',
      })
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('name');
          result[0].name.should.equal('Testy McTestface');
          result[0].should.have.property('email');
          result[0].email.should.equal('test@test.com');
          result[0].should.have.property('user_id');
          result[0].user_id.should.equal('id12345');
          done();
        });
    });

    it('should add a user', (done) => {
      const newUser = {
        id: 2,
        user_id: 'id54321',
        email: 'jorma@maansiirtofirma.fi',
        name: 'Jorma Teras',
      };

      User.createUser(newUser)
        .then(id => User.getUserById(id))
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('name');
          result[0].name.should.equal('Jorma Teras');
          result[0].should.have.property('email');
          result[0].email.should.equal('jorma@maansiirtofirma.fi');
          result[0].should.have.property('user_id');
          result[0].user_id.should.equal('id54321');
          done();
        });
    });
  });

  describe('TimeEntry', () => {
    it('should return all time entries', (done) => {
      TimeEntry.getTimeEntries()
        .then(result => {
          result.should.be.a('array');
          result.length.should.equal(3);
          result[1].should.be.a('object');
          result[1].should.have.property('id');
          result[1].should.have.property('project');
          result[1].should.have.property('user');
          result[1].should.have.property('elapsed_time');
          done();
        });
    });

    it('should return a single TimeEntry with id', (done) => {
      TimeEntry.getTimeEntryById(1)
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('id');
          result[0].id.should.equal(1);
          result[0].should.have.property('project');
          result[0].should.have.property('user');
          result[0].should.have.property('elapsed_time');
          done();
        });
    });

    it('should add a time entry', (done) => {
      const newTimeEntry = {
        id: 4,
        project: 1,
        user: 1,
        elapsed_time: 3600
      };

      TimeEntry.createTimeEntry(newTimeEntry)
        .then(id => TimeEntry.getTimeEntryById(id))
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(1);
          result[0].should.be.a('object');
          result[0].should.have.property('id');
          result[0].id.should.equal(4);
          result[0].should.have.property('project');
          result[0].should.have.property('user');
          result[0].should.have.property('elapsed_time');
          done();
        });
    });

    it('should delete a single time entry', (done) => {
      TimeEntry.deleteTimeEntry(1)
        .then(() => TimeEntry.getTimeEntries())
        .then(result => {
          result.should.be.a('array')
          result.length.should.equal(2);
          done();
        });
    });
  });
});
/* eslint-enable */
