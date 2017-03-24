/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server').server;
const knex = require('../src/db/db');

const should = chai.should();

chai.use(chaiHttp);

describe('API', () => {
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
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });
    });

    describe('GET /projects/:id', () => {
      it('should return a single project', (done) => {
        chai.request(server)
          .get('/projects/1')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });

      it('should return bad request with invalid id', (done) => {
        chai.request(server)
          .get('/projects/scam')
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('POST /projects', () => {
      it('should add a project', (done) => {
        chai.request(server)
          .post('/projects')
          .send({
            id: 4,
            name: 'test_project',
            url: 'www.trolololo.ru',
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
          .send({
            name: 1,
            url: 2,
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('PUT /projects/:id', () => {
      it('should update a project', (done) => {
        chai.request(server)
          .put('/projects/1')
          .send({
            name: 'another_value',
            url: 'http://another_url.com',
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
          .send({
            name: 'invalid_request',
            url: 'invalid_request',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should return bad request with invalid body', (done) => {
        chai.request(server)
          .put('/projects/1')
          .send({
            name: 1,
            url: 2,
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('DELETE /projects/:id', () => {
      it('should delete a single project', (done) => {
        chai.request(server)
          .delete('/projects/1')
          .end((error, response) => {
            response.should.have.status(200);
            done();
          });
      });

      it('should return bad request with invalid id', (done) => {
        chai.request(server)
          .delete('/projects/"#€%€#')
          .end((error, response) => {
            response.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('TimeEntry', () => {
    describe('GET /timeEntries', () => {
      it('should return all time entries', (done) => {
        chai.request(server)
          .get('/timeEntries')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });
    });

    describe('POST /timeEntries', () => {
      it('should add a time entry', (done) => {
        chai.request(server)
          .post('/timeEntries')
          .send({
            id: 4,
            project: 1,
            user: 1,
            elapsed_time: 3000
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
          .send({
            project: 'asdf',
            user: 'herp',
            elapsed_time: 'derp'
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('DELETE /timeEntries/:id', () => {
      it('should delete a single time entry', (done) => {
        chai.request(server)
          .delete('/timeEntries/1')
          .end((error, response) => {
            response.should.have.status(200);
            done();
          });
      });

      it('should return bad request with invalid id', (done) => {
        chai.request(server)
          .delete('/timeEntries/"#€%€#')
          .end((error, response) => {
            response.should.have.status(400);
            done();
          });
      });
    });
  });
});
/* eslint-enable */
