const express = require('express');
const validate = require('express-validation');
const validations = require('./validations/projects');
const Project = require('../../db/models/project');

const router = express.Router();

router.get('/', (req, res, next) => {
  Project.getProjects()
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

router.get('/:id', validate(validations.get), (req, res, next) => {
  Project.getProjectById(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

router.post('/', validate(validations.create), (req, res, next) => {
  Project.createProject(req.body)
    .then(id => Project.getProjectById(id))
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

router.put('/:id', validate(validations.update), (req, res, next) => {
  Project.updateProject(req.params.id, req.body)
    .then(() => Project.getProjectById(req.params.id))
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

router.delete('/:id', validate(validations.delete), (req, res, next) => {
  Project.deleteProject(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

module.exports = router;
