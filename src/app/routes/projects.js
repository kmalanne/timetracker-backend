const express = require('express');
const validate = require('express-validation');
const validations = require('./validations/projects');
const Project = require('../../db/models/project');
const asyncRequest = require('../utils/asyncRequest');

const router = express.Router();

const getProjects = async (req, res, next) => {
  const result = await Project.getProjects();
  res.status(200).json(result);
};

const getProjectById = async (req, res, next) => {
  const result = await Project.getProjectById(req.params.id);
  res.status(200).json(result);
};

const createProject = async (req, res, next) => {
  const id = await Project.createProject(req.body);
  const result = await Project.getProjectById(id);
  res.status(200).json(result);
};

const updateProject = async (req, res, next) => {
  await Project.updateProject(req.params.id, req.body);
  const result = await Project.getProjectById(req.params.id);
  res.status(200).json(result);
};

const deleteProject = async (req, res, next) => {
  const result = await Project.deleteProject(req.params.id)
  res.status(200).json(result);
};

router.get('/', asyncRequest.bind(null, getProjects));
router.get('/:id', validate(validations.get), asyncRequest.bind(null, getProjectById));
router.post('/', validate(validations.create), asyncRequest.bind(null, createProject));
router.put('/:id', validate(validations.update), asyncRequest.bind(null, updateProject));
router.delete('/:id', validate(validations.delete), asyncRequest.bind(null, deleteProject));

module.exports = router;
