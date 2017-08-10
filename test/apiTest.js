/* eslint-disable */
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../src/server').server;
const knex = require('../src/db/db');

const should = chai.should();

chai.use(chaiHttp);

describe('API', () => {
  let token = null;

  async function getUser() {
    const user = {
      sub: 'id12345',
    };
    return JSON.stringify(user);
  }

  function createTestToken(user) {
    const secret = process.env.AUTH0_CLIENT_SECRET || 'wolololo';
    token = `Bearer ${jwt.sign(user, secret)}`;
  }

  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => getUser())
      .then(user => createTestToken(user))
      .then(() => done());
  });

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(() => done());
  });

  describe('General', () => {
    describe('GET /scam', () => {
      it('should return page not found', (done) => {
        chai.request(server)
          .get('/scam')
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.html;
            done();
          });
      });
    });
  });

  describe('Projects', () => {
    describe('GET /projects', () => {
      it('should return all projects', (done) => {
        chai.request(server)
          .get('/projects')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('should not get projects without authorization', (done) => {
        chai.request(server)
          .get('/projects')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('GET /projects/:id', () => {
      it('should return a single project', (done) => {
        chai.request(server)
          .get('/projects/1')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('should return bad request with invalid id', (done) => {
        chai.request(server)
          .get('/projects/scam')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not get project without authorization', (done) => {
        chai.request(server)
          .get('/projects/1')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('POST /projects', () => {
      it('should add a project', (done) => {
        chai.request(server)
          .post('/projects')
          .set('Authorization', token)
          .send({
            params: {
              name: 'test_project',
              url: 'www.trolololo.ru',
            }
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('should return bad request with invalid body', (done) => {
        chai.request(server)
          .post('/projects')
          .set('Authorization', token)
          .send({
            params: {
              name: 1,
              url: 2,
            }
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not add projects without authorization', (done) => {
        chai.request(server)
          .post('/projects')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('PUT /projects/:id', () => {
      it('should update a project', (done) => {
        chai.request(server)
          .put('/projects/1001')
          .set('Authorization', token)
          .send({
            params: {
              name: 'another_value',
              url: 'http://another_url.com',
            }
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('should return bad request with invalid id', (done) => {
        chai.request(server)
          .put('/projects/scamelot')
          .set('Authorization', token)
          .send({
            params: {
              name: 'invalid_request',
              url: 'invalid_request',
            }
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should return bad request with invalid body', (done) => {
        chai.request(server)
          .put('/projects/1')
          .set('Authorization', token)
          .send({
            params: {
              name: 1,
              url: 2,
            }
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not update projects without authorization', (done) => {
        chai.request(server)
          .put('/projects/1')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('DELETE /projects/:id', () => {
      it('should delete a single project', (done) => {
        chai.request(server)
          .delete('/projects/1')
          .set('Authorization', token)
          .end((error, response) => {
            response.should.have.status(200);
            done();
          });
      });

      it('should return bad request with invalid id', (done) => {
        chai.request(server)
          .delete('/projects/"#€%€#')
          .set('Authorization', token)
          .end((error, response) => {
            response.should.have.status(400);
            done();
          });
      });

      it('should not delete projects without authorization', (done) => {
        chai.request(server)
          .delete('/projects/1')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  });

  describe('TimeEntry', () => {
    describe('GET /timeEntries', () => {
      it('should return all time entries', (done) => {
        chai.request(server)
          .get('/timeEntries/?page=1&limit=10')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('should not get time entries without authorization', (done) => {
        chai.request(server)
          .get('/timeEntries')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('POST /timeEntries', () => {
      it('should add a time entry', (done) => {
        chai.request(server)
          .post('/timeEntries')
          .set('Authorization', token)
          .send({
            params: {
              project: 1001,
              elapsed_time: 3000,
              start_time: new Date(),
              stop_time: new Date()
            }
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('should return bad request with invalid body', (done) => {
        chai.request(server)
          .post('/timeEntries')
          .set('Authorization', token)
          .send({
            params: {
              project: 'asdf',
              elapsed_time: 'derp',
              start_time: new Date(),
              stop_time: new Date()
            }
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not add time entry without authorization', (done) => {
        chai.request(server)
          .post('/timeEntries')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('DELETE /timeEntries/:id', () => {
      it('should delete a single time entry', (done) => {
        chai.request(server)
          .delete('/timeEntries/1')
          .set('Authorization', token)
          .end((error, response) => {
            response.should.have.status(200);
            done();
          });
      });

      it('should return bad request with invalid id', (done) => {
        chai.request(server)
          .delete('/timeEntries/"#€%€#')
          .set('Authorization', token)
          .end((error, response) => {
            response.should.have.status(400);
            done();
          });
      });

      it('should not delete time entry without authorization', (done) => {
        chai.request(server)
          .delete('/timeEntries/1')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  });
});
/* eslint-enable */
